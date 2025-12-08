import { Router } from 'express';
import { ClassControllerIp } from '../controllers/ControllerIp';


    const routerIps = Router();

    routerIps.get('/listaIps', ClassControllerIp.allIps);
    //routerIp.get('/getIp/:id', getIp);
    //routerIp.post('/addIp',addIp);
    routerIps.delete('/deleteIp/:id', ClassControllerIp.deleteIp);
    routerIps.post('/updateIp',ClassControllerIp.updateIp);


export default routerIps