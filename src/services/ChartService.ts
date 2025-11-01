import { InterfaceIp } from "../models/IpModel";
import { RegistroInterface } from "../models/RegistroModel";
import { IpService } from "./IpService";
import { RegistroService } from "./RegistroService";

export class ChartService {


  /**  Devuelve datasets con el número de impresiones diarias para una ip dada,
   * formatted for charting, using the most recent 'numRegistros' records.
   * Each dataset contains date and impression count values.
   */
  static getDataForIPChart(ip: string, numRegistros: number): Array<{
    label: string;
    data: Array<{ x: string, y: number }>;
  }> {

    const datosPorIP = new Array<{ label: string, data: Array<{ x: string, y: number }> }>();

    const ipData = IpService.findByIp(ip);
   
    let ipLabel=`${ip} ${ipData?.localizacion}`

    if (ipData) {

      datosPorIP.push({ label: ipLabel, data: [] });

      // Los registros ya estan ordenados por fecha descendente
      let registros = RegistroService.findByIp(ip, numRegistros);

      if (!registros) {
        return [];
      }

      // Invierto el orden para tenerlos de más antiguo a más reciente
      registros = registros.reverse();


      // Relleno los contadores 0 con el último contador conocido
      //  tanto hacia adelante como hacia atrás
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


      // Calculo los contadores diarios a partir de los contadores acumulados
      for (let i = registros.length - 1; i >= 1; i--) {

        // No sería necesario comprobar que el anterior sea mayor que 0 por los fors anteriores
        if (registros[i].contador > 0 && registros[i - 1].contador > 0) {

          registros[i].contador = registros[i].contador - registros[i - 1].contador;
          if (registros[i].contador < 0) {
            registros[i].contador = 0;
          }
        }
      }

      registros.shift() // Elimino el primer registro que no tiene valor real


      registros.forEach((registro: RegistroInterface) => {

        datosPorIP[0].data.push({
          x: registro.fecha,
          y: registro.contador
        });
      });

      //console.log('Estructura:', JSON.stringify(datasets[0]));

      return datosPorIP;

    }
    else {
      return [];
    }
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

    const ipData = IpService.findByIp(ip);

    if (ipData) {
      porcentajeTonerPorIP.push({ label: 'negro', data: [] });
      porcentajeTonerPorIP.push({ label: 'cyan', data: [] });
      porcentajeTonerPorIP.push({ label: 'rojo', data: [] });
      porcentajeTonerPorIP.push({ label: 'amarillo', data: [] });

      // Los registros ya estan ordenados por fecha descendente
      let registros = RegistroService.findByIp(ip, numRegistros);

      if (!registros) {
        return [];
      }

      // Invierto el orden para tenerlos de más antiguo a más reciente
      registros = registros.reverse();

      registros.shift();  // Para que tenga el mismo número de días que grafico de contador impresiones

      registros.forEach((registro: RegistroInterface) => {
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
      });
    }




    return porcentajeTonerPorIP;
  }


  // Método para obtener datos agrupados por IP para el gráfico
  static getDataForChart(numeroDeRegistros:number): Array<{label: string; data: Array<{ x: string, y: number }>}> {
    const listaIps :InterfaceIp[] = IpService.findAllIPs();

    // Agrupar por IP
    const datosPorIP = Array<{label: string; data: Array<{ x: string, y: number }>}> ();

    listaIps.forEach((ip) => {
      datosPorIP.push(ChartService.getDataForIPChart(ip.ip, numeroDeRegistros)[0]);
    });

    return datosPorIP;
  }


}