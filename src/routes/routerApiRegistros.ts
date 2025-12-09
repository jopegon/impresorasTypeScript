import { Router } from 'express';
import { allRecords, betweenDatesIpRecords, betweenDatesRecords, getIp, getRecordsIp, help, lastNRecordsOfIp } from '../controllers/controllerRegistro';


    const routerRegistro = Router();
 

    routerRegistro.get('/allRecords', allRecords);
    routerRegistro.get('/getRecordsIp/:ip', getRecordsIp);
    routerRegistro.get('/betweenDates/:date1/:date2', betweenDatesRecords) 
    routerRegistro.get('/betweenDatesIp/:date1/:date2/:ip', betweenDatesIpRecords) 
    routerRegistro.get('/lastNRecordsOfIp/:ip/:nums', lastNRecordsOfIp) 

    routerRegistro.get('/getRegistrosIp/:ip', getIp);

export default routerRegistro;