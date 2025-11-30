import { Router} from 'express';
import { ControlerChart } from '../controllers/ControllerChart';



const routerChart = Router();


routerChart.get('/:numRegistros', ControlerChart.showChart);
routerChart.get('/', ControlerChart.showChart);
routerChart.get('/chartIp/:ip/:numRegistros',ControlerChart.showchartIp);
routerChart.get('/chartIp/:ip/',ControlerChart.showchartIp);


export default routerChart;