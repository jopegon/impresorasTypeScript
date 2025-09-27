import { Request, Response } from 'express';
import db from '../config/db';


// Función auxiliar para validar el formato de una IP
const isValidIp = (ip: string): boolean => {
  const ipRegex =
    /^(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}$/;
  return ipRegex.test(ip);
};


export const getIp = async (req: Request, res: Response) => {

  try {
    const ip = req.params.ip;

    // Validar que printerId sea un número válido
    // Validar que printerId sea un número válido
    if (!isValidIp(ip) ) {
      res.status(400).json({ error: 'IP proporcionada no es válida' });
    }
    const printer = db.prepare('SELECT * FROM registros WHERE ip = ? ORDER BY fecha DESC LIMIT 90').all(ip);

    // Verificar si se encontró el registro
    if (!printer) {
      res.status(404).json({ });
    }

    // Responder con los datos de la impresora
    res.status(200).json(printer);
  } catch (error) {
    res.status(500).send('Error al consultar ip');
  }
}