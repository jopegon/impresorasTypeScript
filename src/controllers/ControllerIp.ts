import { Request, Response } from 'express';
import db from '../config/db';
import { IpRepository } from '../repositories/IpRepository';
import { InterfaceIp } from '../models/IpInterface';

export class ClassControllerIp {


  public static allIps = async (req: Request, res: Response): Promise<void> => {

    try {
      // Consultar todas las impresoras
      const listaIps: InterfaceIp[] = IpRepository.findAllIPs();

      // Verificar si hay registros en la tabla
      if (listaIps.length === 0) {
        res.status(404).json({ message: 'No se encontraron impresoras registradas.' });
        return;
      }
      res.render('listadoIps', {
        title: 'Listado de direcciones IP',
        ips: listaIps
      });

    } catch (error) {
      console.error('Error al consultar impresoras:', error);
      res.status(500).json({ error: 'Error interno del servidor al consultar impresoras.' });
    }
  };

}
