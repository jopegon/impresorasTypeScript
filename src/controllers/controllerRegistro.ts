import { Request, Response } from 'express';

import { RegistroRepository } from '../repositories/RegistroRepository';
import {  isValidIp } from '../utilities/utilities';
import { getAddressWithPort } from '../server/server';


export const getRecordsIp = async (req: Request, res: Response) => {

  try {
    const ip = req.params.ip;
    // Validar que printerId sea un número válido
    // Validar que printerId sea un número válido

    const records = RegistroRepository.getRecordsByIp(ip) || [];
    // Verificar si se encontró el registro
    if (records.length === 0) {
      res.status(404).json({ error: `No se han encontrado registros para la ip ${ip}` });
      return;
    }

    // Responder con los datos de la impresora
    res.status(200).json(records);
  } catch (error) {
    res.status(500).send(`Error al consultar ip ${error}`);
  }
}



export const betweenDatesRecords = async (req: Request, res: Response) => {

  try {
    const date1 = req.params.date1;
    const date2 = req.params.date2;

    const records = RegistroRepository.getBetweenDatesRecords( date1, date2) || [];

    // Verificar si se encontró el registro
    if (records.length === 0) {
      res.status(404).json({ error: `No se han encontrado registros para el intervarlo ${date1} - ${date2}` });
      return;
    }

    // Responder con los datos de la impresora
    res.status(200).json(records);
  } catch (error) {
    res.status(500).send(`Error al consultar registros ${error}`);
  }

}

export const betweenDatesIpRecords = async (req: Request, res: Response) => {

  try {
    const date1 = req.params.date1;
    const date2 = req.params.date2;
    const ip = req.params.ip;

    const records = RegistroRepository.getBetweenDatesRecordsByIp(ip, date1, date2) || [];

    // Verificar si se encontró el registro
    if (records.length === 0) {
      res.status(404).json({ error: `No se han encontrado registros para el intervarlo ${date1} - ${date2}` });
      return;
    }

    // Responder con los datos de la impresora
    res.status(200).json(records);
  } catch (error) {
    res.status(500).send(`Error al consultar registros ${error}`);
  }

}


export const lastNRecordsOfIp = async (req: Request, res: Response) => {

  try {
    const ip = req.params.ip;
    const nums = req.params.nums;

    const records = RegistroRepository.getLastNRecordsByIp(ip, parseInt(nums, 10)) || [];
    // Verificar si se encontró el registro
    if (records.length === 0) {
      res.status(404).json({ error: `No se han encontrado registros para la ip ${ip}` });
      return;
    }

    // Responder con los datos de la impresora
    res.status(200).json(records);
  } catch (error) {
    res.status(500).send(`Error al consultar registros ${error}`);
  }
}

export const help = async (req: Request, res: Response) => {
  try {
    const mensajeHelp = `   
    <!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <title>Nivel tóner</title>   

    <link rel="icon" href="/img/favicon.ico" type="image/x-icon">

    <link rel="stylesheet" href="/bootstrapCss/bootstrap.min.css" />

    <link rel="stylesheet" href="/bootStrapIcons/bootstrap-icons.css" />

    <script src="/bootStrapJs/bootstrap.js"></script> 
    
    <link rel="stylesheet" href="/css/vistaImpresoras.css" />
   
  </head>

  <body>
    <div class="container py-4">
  
        <a href="${getAddressWithPort()}/records/allRecords" target="_blank" rel="noopener noreferrer"> ${getAddressWithPort()}/records/allRecords</a> <br/>

        ${getAddressWithPort()}/records/getRecordsIp/:ip <br/>

        ${getAddressWithPort()}/records/betweenDates/:date1/:date2   formato fecha YYYY-MM-DD <br/>

        ${getAddressWithPort()}/records/betweenDatesIp/:date1/:date2/:ip <br/>

        ${getAddressWithPort()}/records/lastNRecordsOfIp/:ip/:nums <br/>
    
        ${getAddressWithPort()}/records/contadorIp/:ip

        ${getAddressWithPort()}/records/consultaIp/:ip <br/>
    
        <a href="${getAddressWithPort()}/ips/listaIps" target="_blank" rel="noopener noreferrer"> CRUD de ips</a> <br/> 

        <a href="${getAddressWithPort()}/lista" target="_blank" rel="noopener noreferrer"> listado con niveles y paginas impresas <br/> 
        
        <a href="${getAddressWithPort()}/chart" target="_blank" rel="noopener noreferrer">  Gráfico <br/>
        
        <a href="${getAddressWithPort()}" target="_blank" rel="noopener noreferrer">  Volver <br/>
        
      </div>
        </body>
</html>
        
        
        
        
        `;
       
    

    // Establecer el Content-Type a text/plain
    res.setHeader('Content-Type', 'text/html');
    res.status(200).write(mensajeHelp);
    res.end();
  } catch (error) {
    console.error('Error al consultar impresoras:', error);
    res.status(500).json({ error: 'Error interno del servidor al consultar impresoras.' });
  }
};




export const getIp = async (req: Request, res: Response) => {

  try {
    const ip = req.params.ip;

    // Validar que printerId sea un número válido
    // Validar que printerId sea un número válido
    if (!isValidIp(ip) ) {
      res.status(400).json({ error: 'IP proporcionada no es válida' });
    }
    const printer = RegistroRepository.getRecordsByIp(ip);

    // Verificar si se encontró el registro
    if (!printer) {
      res.status(404).json({ });
    }

    // Responder con los datos de la impresora
    res.status(200).json(printer);
  } catch (error) {
    res.status(500).send(`Error al consultar ip ${error}`);
  }
}

export const allRecords = async (req: Request, res: Response): Promise<void> => {
  try {
    // Consultar todas las impresoras
    const printers = RegistroRepository.findAll();

    // Verificar si hay registros en la tabla
    if (printers.length === 0) {
      res.status(404).json({ message: 'No se encontraron impresoras registradas.' });
      return;
    }

    // Devolver la lista de impresoras
    res.status(200).json(printers);
  } catch (error) {
    console.error('Error al consultar impresoras:', error);
    res.status(500).json({ error: 'Error interno del servidor al consultar impresoras.' });
  }
};