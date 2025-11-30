import { Router} from 'express';

import { contador, contadores, leeDB, lista, muestraInfo, paginaInicio, saluda } from '../controllers/controllerImpresora';


const routerImpresoras = Router();


routerImpresoras.get('/leeDB', leeDB);
routerImpresoras.get('', muestraInfo);
routerImpresoras.get('/lista', lista);
routerImpresoras.get('/contador', contador);
routerImpresoras.get('/saluda', saluda);
routerImpresoras.get('/file.htm', paginaInicio);
routerImpresoras.get('/contadores', contadores);

export default routerImpresoras;
