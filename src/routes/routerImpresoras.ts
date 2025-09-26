import { Router, Request, Response } from 'express';


const routerImpresoras = Router();

export const saluda = async (req: Request, res: Response) => {
    try {
        res.status(200).send("Hello !!!!");
    } catch (error) {
        console.error('Error al consultar impresoras:', error);
        res.status(500).json({ error: 'Error interno del servidor al consultar impresoras.' });
    }
};

routerImpresoras.get('/', saluda);

export default routerImpresoras;