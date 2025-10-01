import { Router, Request, Response } from 'express';
import { ControlerChart } from '../controler/controlerChart';



const routerChart = Router();


routerChart.get('/', ControlerChart.showChart);
routerChart.get('/chartIp/:ip',ControlerChart.showchartIp);


export default routerChart;