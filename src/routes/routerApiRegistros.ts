import { Router } from 'express';
import { getIp } from '../controler/controlerRegistro';


    const routerRegistro = Router();
 
    /*
    routerIP.get('/allIps', allIp);
    routerIP.get('/getIp/:id', getIp);
    routerIP.post('/addIp',addIp);
    routerIP.delete('/deleteIp/:id', deleteIp);
    routerIP.put('/updateIp/:id',updateIp);
*/
    routerRegistro.get('/getRegistrosIp/:ip', getIp);

export default routerRegistro;