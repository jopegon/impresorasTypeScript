import { Router } from 'express';
import { ClassControllerIp } from '../controllers/ControllerIp';


    const routerIps = Router();

    routerIps.get('/listaIps', ClassControllerIp.allIps);
    //routerIp.get('/getIp/:id', getIp);
    //routerIp.post('/addIp',addIp);
    //routerIp.delete('/deleteIp/:id', deleteIp);
    //routerIp.put('/updateIp/:id',updateIp);


export default routerIps