
import { Request, Response } from 'express';
import { RegistroService } from '../services/RegistroService';
import { ChartService } from '../services/ChartService';


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
      console.log('IP recibida:', ip);
      const datasets = ChartService.getDataForIPChart(ip);
      
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

}

// Ejemplo de ruta en tu archivo de rutas (routes.ts o app.ts)
// import express from 'express';
// const router = express.Router();
// router.get('/chart', ChartController.showChart);
// export default router;