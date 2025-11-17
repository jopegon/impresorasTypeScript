import { InterfaceIp } from "../models/IpInterface";
import { IpModel } from "../models/IpModel";
import { RegistroInterface } from "../models/RegistroInterface";
import { RegistroService as RegistroService } from "../models/RegistroService";


export class ChartService {

  /**
   * Este método normaliza los registros de contadores, en el caso de que haya registros sin valor (0),
   * se rellenan con el último valor conocido, recorrendo la lista de registros dos veces, una de
   * izquierda a derecha y otra de derecha a izquierda.
   * @param registros 
   * @returns registros contadores sin valor se rellenan con el último conocido
   */
  private static rellenoContadoresConUltimoValorConocido(registros: RegistroInterface[]): RegistroInterface[] {

    for (let i = 0; i < registros.length - 1; i++) {
      if (registros[i].contador > 0 && registros[i + 1].contador === 0) {
        registros[i + 1].contador = registros[i].contador;
      }
    }
    for (let i = registros.length - 1; i > 0; i--) {
      if (registros[i].contador > 0 && registros[i - 1].contador === 0) {
        registros[i - 1].contador = registros[i].contador;
      }
    }
    return registros;
  }

    /**
   * Calcula las impresiones diarias realizadas.
   * 
   * @param registros 
   * @returns registros contadores contiene el número de impresiones diarias
   */
  private static calculaImpresiones(registros: RegistroInterface[]): RegistroInterface[] {
    // Calculo los contadores diarios a partir de los contadores acumulados
    for (let i = registros.length - 1; i >= 1; i--) {

      // No sería necesario comprobar que el anterior sea mayor que 0 por los fors anteriores
      if (registros[i].contador > 0 && registros[i - 1].contador > 0) {

        // Si el número de serie es el mismo, calculo la diferencia sino pongo a 0
        if (registros[i].numSerie === registros[i - 1].numSerie) {

          registros[i].contador = registros[i].contador - registros[i - 1].contador;

          // Aseguro que no haya valores negativos
          if (registros[i].contador < 0) {
            registros[i].contador = 0;
          }
        } else {
          registros[i].contador = 0;
        }
      }
    }
    return registros
  }

  /**  Devuelve datasets con el número de impresiones diarias para una ip dada,
   * formatted for charting, using the most recent 'numRegistros' records.
   * Each dataset contains date and impression count values.
   */
  static getDataForIPChart(ip: string, numRegistros: number): Array<{label: string;data: Array<{ x: string, y: number }>}> {

    let datosPorIP:Array<{ label: string, data: Array <{ x: string, y: number }> }> = new Array<{ label: string, data: Array<{ x: string, y: number }> }>();

    const ipData = IpModel.findByIp(ip);

    let ipLabel = `${ip} ${ipData?.localizacion}`;

    if (ipData) {

      datosPorIP.push({ label: ipLabel, data: [] });

      // Los registros ya estan ordenados por fecha descendente
      //let registros: RegistroInterface[] | undefined = RegistroService.findByIp(ip, numRegistros);

      let registros: RegistroInterface[] | undefined = RegistroService.findByIpNdays(ip, numRegistros);
      
      if (!registros) {
        return datosPorIP;
      }
      // Invierto el orden para tenerlos de más antiguo a más reciente
      registros = registros.reverse();

      /* Normalizo los contadores rellenando los ceros con el último valor conocido
      *  Esto es necesario para que el cálculo de impresiones diarias sea correcto
      * en el caso de que haya días sin registros
      */
      registros = this.rellenoContadoresConUltimoValorConocido(registros);

      registros = this.calculaImpresiones(registros);

      registros.shift() // Elimino el primer registro que no tiene valor real



      for (let registro of registros) {
        datosPorIP[0].data.push({
          x: registro.fecha,
          y: registro.contador
        });
      };

    }
    return datosPorIP;
  }


  /**
   * Devuelve datasets con el porcentaje de tóner (black, cyan, magenta, yellow) para una ip dada,
   * formatted for charting, using the most recent 'numRegistros' records.
   * Each dataset contains date and toner percentage values.
   */
  static getDataPorcentajeForIPChart(ip: string, numRegistros: number): Array<{
    label: string;
    data: Array<{ x: string, y: number }>;
  }> {

    const porcentajeTonerPorIP = new Array<{
      label: string, data: Array<{
        x: string,
        y: number
      }>
    }>;

    const ipData = IpModel.findByIp(ip);

    if (ipData) {
      porcentajeTonerPorIP.push(
        { label: 'negro', data: [] },
        { label: 'cyan', data: [] },
        { label: 'rojo', data: [] },
        { label: 'amarillo', data: [] }
      );

      // Los registros ya estan ordenados por fecha descendente
      let registros = RegistroService.findByIpNdays(ip, numRegistros);

      if (!registros) {
        return [];
      }

      // Invierto el orden para tenerlos de más antiguo a más reciente
      registros = registros.reverse();

      registros.shift();  // Para que tenga el mismo número de días que grafico de contador impresiones

      for (let registro of registros) {
        porcentajeTonerPorIP[0].data.push({
          x: registro.fecha,
          y: registro.negro
        });
        porcentajeTonerPorIP[1].data.push({
          x: registro.fecha,
          y: registro.cyan
        });
        porcentajeTonerPorIP[2].data.push({
          x: registro.fecha,
          y: registro.rojo
        });
        porcentajeTonerPorIP[3].data.push({
          x: registro.fecha,
          y: registro.amarillo
        });
      };
    }

    return porcentajeTonerPorIP;
  }


  // Método para obtener datos agrupados por IP para el gráfico
  static getDataForChart(numeroDeRegistros: number): Array<{ label: string; data: Array<{ x: string, y: number }> }> {
    const listaIps: InterfaceIp[] = IpModel.findAllIPs();

    // Agrupar por IP
    const datosPorIP:Array<{ label: string; data: Array<{ x: string, y: number }> }> = new Array<{ label: string; data: Array<{ x: string, y: number }> }>();

    for (let ip of listaIps) {
      datosPorIP.push(ChartService.getDataForIPChart(ip.ip, numeroDeRegistros)[0]);
    };

    return datosPorIP;
  }

}