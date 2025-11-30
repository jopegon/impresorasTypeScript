
import { Request, Response } from 'express';
import { ChartService } from '../services/ChartService';
import { IpRepository } from '../repositories/IpRepository';
import { RegistroRepository } from '../repositories/RegistroRepository';




export class ControlerChart {

  static showChart(req: Request, res: Response) {

    const nRegistros:string = req.params.numRegistros || '7';

    let numRegistros:number = Number.parseInt(nRegistros, 10);

    try {
      const datasets = ChartService.getDataForChart(numRegistros);

      let sizeDatasets = datasets.length;

      res.render('contadores', {
        title: 'Gráfico de Contadores por IP',
        datasetsJSON: JSON.stringify(datasets),  // Solo la versión stringificada
        numeroGraficos: (sizeDatasets / 8)
      });
    } catch (error) {
      console.error('Error al cargar datos del gráfico:', error);
      res.status(500).send('Error al cargar los datos');
    }
  }


  static showchartIp(req: Request, res: Response) {
    try {
      const ip = req.params.ip;

      const nRegistros:string = req.params.numRegistros || '7';

      const numRegistros:number = Number.parseInt(nRegistros, 10);

      const ipData = IpRepository.findByIp(ip);

      const lastRecord = RegistroRepository.getLastRecordConectedByIp(ip);

      const datasets = ChartService.getDataForIPChart(ip, numRegistros);

      const datasetToner = ChartService.getDataPorcentajeForIPChart(ip, numRegistros);



      let impresionesTotales: number = 0;
      let numeroRegistros: number = 0;
      let impresionMedia: number = 0;

      if (datasets.length > 0 && datasets[0].data && Array.isArray(datasets[0].data)) {
        numeroRegistros = datasets[0].data.length;
      }

      impresionesTotales = datasets[0].data.reduce((acumulado: number, actual: { x: string, y: number }) => acumulado + actual.y, 0);

      impresionMedia = impresionesTotales / numeroRegistros;

      const disponibility = RegistroRepository.getDisponibilityRangeByIp(ip, numRegistros);

      res.render('chart', {
        title: `Última conexión ${lastRecord?.fecha} ${lastRecord?.hora}`,
        ipData: ipData,
        lastRecord: lastRecord,
        disponibility: disponibility,
        impresionMedia: impresionMedia.toFixed(2),
        datasetsJSON: JSON.stringify(datasets),  // Solo la versión stringificada
        datasetPorcentajeToner: JSON.stringify(datasetToner)

      });
    } catch (error) {
      console.error('Error al cargar datos del gráfico:', error);
      res.status(500).send('Error al cargar los datos');
    }
  }

}

// Ejemplo de ruta en tu archivo de rutas (routes.ts o app.ts)
// import express from 'express';
// const router = express.Router();
// router.get('/chart', ChartController.showChart);
// export default router;