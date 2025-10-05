
import { Request, Response } from 'express';
import { ChartService } from '../services/ChartService';
import { IpService } from '../services/IpService';
import { RegistroService } from '../services/RegistroService';


export class ControlerChart {
  static showChart(req: Request, res: Response) {
    try {
      const datasets = ChartService.getDataForChart();
      
      //console.log('Enviando datasets al template:', datasets);
      //console.log('Es array?', Array.isArray(datasets));
      
      res.render('chart', {
        title: 'Gráfico de Contadores por IP',
        datasetsJSON: JSON.stringify(datasets)  // Solo la versión stringificada
      });
    } catch (error) {
      console.error('Error al cargar datos del gráfico:', error);
      res.status(500).send('Error al cargar los datos');
    }
  }


  static showchartIp (req: Request, res: Response) {
    try {
      const ip = req.params.ip;

      const ipData = IpService.findByIp(ip);
      
      const lastRecord = RegistroService.getLastRecordConectedByIp(ip) ;

      //constPrinter = IpService.getPrintersByIp(ip);

      const datasets = ChartService.getDataForIPChart(ip);

      let impresionesTotales:number=0;
      let numeroRegistros:number=0;
      let impresionMedia:number=0;
      if (datasets.length > 0 && datasets[0].data && Array.isArray(datasets[0].data)) {
        numeroRegistros = datasets[0].data.length;
      }

      impresionesTotales = datasets[0].data.reduce((acumulado:number, actual:{x:string, y:number}) => acumulado + actual.y, 0);

      impresionMedia = impresionesTotales / numeroRegistros; 


      const disponibility = RegistroService.getDisponibilityByIp(ip);
      
      //console.log('Enviando datasets al template:', datasets[0].data);
      //console.log('Es array?', Array.isArray(datasets));
      
      res.render('chart', {
        title: `Datos a fecha ${lastRecord?.fecha } ${lastRecord?.hora}`,
        ipData: ipData,
        lastRecord: lastRecord,
        disponibility: disponibility,
        impresionMedia: impresionMedia.toFixed(2),
        datasetsJSON: JSON.stringify(datasets)  // Solo la versión stringificada
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