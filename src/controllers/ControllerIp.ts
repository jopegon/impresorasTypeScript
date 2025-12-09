import { Request, Response } from 'express';
import { IpRepository } from '../repositories/IpRepository';
import { IpInterface } from '../models/IpInterface';
import { getAddressWithPort } from '../server/server';

export class ClassControllerIp {


  public static allIps = async (req: Request, res: Response): Promise<void> => {

    try {
      // Consultar todas las impresoras
      const listaIps: IpInterface[] = IpRepository.findAllIPs();

      // Verificar si hay registros en la tabla
      if (listaIps.length === 0) {
        res.status(404).json({ message: 'No se encontraron impresoras registradas.' });
        return;
      }
      res.render('listadoIps', {
        title: 'Listado de direcciones IP',
        ips: listaIps,
        ipSeverPort: getAddressWithPort(),
      });

    } catch (error) {
      console.error('Error al consultar impresoras:', error);
      res.status(500).json({ error: 'Error interno del servidor al consultar impresoras.' });
    }
  };

  public static addIp = async (req: Request, res: Response): Promise<void> => {

    const { direccionIp, localizacionIp, observacionesIp } = req.body;

    try {
      const newIp: IpInterface = {
        id: 9000, // El ID se asignará automáticamente en el repositorio
        ip: direccionIp,
        localizacion: localizacionIp,
        observaciones: observacionesIp,
      };

      IpRepository.add(newIp);

      //res.status(201).json({ message: 'Impresora agregada correctamente.', ip: newIp });
      res.redirect(302, '/ips/listaIps');
    } catch (error) {
      console.error('Error al agregar la impresora:', error);
      res.status(500).json({ error: 'Error interno del servidor al agregar la impresora.' });
    }
  };  

  public static updateIp = async (req: Request, res: Response): Promise<void> => {

    const {  idIp, direccionIp, localizacionIp, observacionesIp } = req.body;

    try {
      const ipToUpdate: IpInterface | undefined  = IpRepository.findByIpId(idIp);

      if (!ipToUpdate) {
        res.status(404).json({ message: 'Impresora no encontrada.' });
        return;
      }

      ipToUpdate.ip = direccionIp;
      ipToUpdate.localizacion = localizacionIp;
      ipToUpdate.observaciones = observacionesIp;

      IpRepository.update(ipToUpdate);

      //res.json({ message: 'Impresora actualizada correctamente.', ip: ipToUpdate });
      res.redirect(302, '/ips/listaIps');
    } catch (error) {
      console.error('Error al actualizar la impresora:', error);
      res.status(500).json({ error: 'Error interno del servidor al actualizar la impresora.' });
    }
  }

  public static deleteIp = async (req: Request, res: Response): Promise<void> => {



    const id:number = Number.parseInt(req.params.id, 10);
    try {

      const ipToDelete: IpInterface | undefined = IpRepository.findByIpId(id);

      if (!ipToDelete) {
        res.status(404).json({ message: 'Impresora no encontrada.' });
        return;
      }

      IpRepository.delete(id);

      //res.json({ message: 'Impresora eliminada correctamente.' });
      //res.redirect(302, '/ips/listaIps');
      res.status(200).json({ message: 'Impresora eliminada correctamente.' });
    } catch (error) {
      console.error('Error al eliminar la impresora:', error);
      res.status(500).json({ error: 'Error interno del servidor al eliminar la impresora.' });
    }
  }
}
