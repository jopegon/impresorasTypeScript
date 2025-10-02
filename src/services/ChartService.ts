import { RegistroInterface } from "../models/RegistroModel";
import { IpService } from "./IpService";
import { RegistroService } from "./RegistroService";

export class ChartService {


  static getDataForIPChart(ip: string) {

    const datosPorIP = new Map<string, Array<{ fecha: string, contador: number }>>();

    const ipData = IpService.findByIp(ip);

    if (ipData) {

      datosPorIP.set(ip, []);

      // Los registros ya estan ordenados por fecha descendente
      let registros = RegistroService.findByIp(ip);
  
      for (let i = registros.length-1; i >= 1; i--) {


      
        if (registros[i].numSerie == registros[i-1].numSerie ) {
          registros[i].contador= registros[i].contador - registros[i-1].contador;
          if (registros[i].contador < 0) {
            registros[i].contador=0;
          }
        }
        else {
          registros[i].contador=0;
        }        
      }
      registros[0].contador=0 // Elimino el último registro que no tiene con qué comparar
      

      registros.forEach((registro: RegistroInterface) => {
        
        datosPorIP.get(ip)?.push({
          fecha: registro.fecha,
          contador: registro.contador
        });
      });



      // Convertir Map a array de objetos
      const datasets: Array<{
        label: string;
        data: Array<{ x: string, y: number }>;
      }> = [];

      datosPorIP.forEach((datos, ip) => {
        datasets.push({
          label: `${ip} - ${ipData.localizacion}`,
          data: datos.map(d => ({
            x: d.fecha,
            y: d.contador
          }))
        });
      });

      //console.log('Datasets generados:', datasets.length);
      //console.log('Estructura:', JSON.stringify(datasets[0]));

      return datasets;

    }




    return [];

  }

  // Método para obtener datos agrupados por IP para el gráfico
  static getDataForChart() {
    const registros = RegistroService.findAllRecords();

    //console.log('Total de registros:', registros.length);

    // Agrupar por IP
    const datosPorIP = new Map<string, Array<{ fecha: string, contador: number }>>();

    registros.forEach((registro) => {
      if (!datosPorIP.has(registro.ip)) {
        datosPorIP.set(registro.ip, []);
      }

      datosPorIP.get(registro.ip)?.push({
        fecha: registro.fecha,
        contador: registro.contador
      });
    });

    // Ordenar los datos por fecha dentro de cada IP
    datosPorIP.forEach((datos) => {
      datos.sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime());
    });

    // Convertir Map a array de objetos
    const datasets: Array<{
      label: string;
      data: Array<{ x: string, y: number }>;
    }> = [];

    datosPorIP.forEach((datos, ip) => {
      datasets.push({
        label: ip,
        data: datos.map(d => ({
          x: d.fecha,
          y: d.contador
        }))
      });
    });

    //console.log('Datasets generados:', datasets.length);
    //console.log('Estructura:', JSON.stringify(datasets[0]));

    return datasets;
  }
}