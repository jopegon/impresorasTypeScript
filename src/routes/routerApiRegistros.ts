import { Router } from 'express';
import { allRecords, betweenDatesIpRecords, betweenDatesRecords, getIp, getRecordId, getRecordsIp, help, lastNRecordsOfIp } from '../controler/controlerRegistro';


    const routerRegistro = Router();
 

    routerRegistro.get('/allRecords', allRecords);
    routerRegistro.get('/getRecordId/:id', getRecordId);
    routerRegistro.get('/getRecordsIp/:ip', getRecordsIp);
    routerRegistro.get('/betweenDates/:date1/:date2', betweenDatesRecords) 
    routerRegistro.get('/betweenDatesIp/:date1/:date2/:ip', betweenDatesIpRecords) 
    routerRegistro.get('/lastNRecordsOfIp/:ip/:nums', lastNRecordsOfIp) 

    routerRegistro.get('/help', help);
    /*
    routerIP.get('/allIps', allIp);
    routerIP.get('/getIp/:id', getIp);
    routerIP.post('/addIp',addIp);
    routerIP.delete('/deleteIp/:id', deleteIp);
    routerIP.put('/updateIp/:id',updateIp);
*/
    routerRegistro.get('/getRegistrosIp/:ip', getIp);

export default routerRegistro;