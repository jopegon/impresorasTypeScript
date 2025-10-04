import db from "../config/db";

import { RegistroInterface } from "../models/RegistroModel";


export class RegistroService {
  static create(ip: string, localizacion: string, observaciones?: string) {
    const stmt = db.prepare(`
      INSERT INTO ips (ip, localizacion, observaciones)
      VALUES (?, ?, ?)
    `);
    const result = stmt.run(ip, localizacion, observaciones || null);
    return { id: result.lastInsertRowid as number, ip, localizacion, observaciones };
  }


  static insertUpdateRegistro = (regImp: RegistroInterface) => {
    //console.log(`----------------------------`)
    //console.log(regImp);
    try {
      const result = db.prepare(`
INSERT INTO registros (fecha, hora, ip, conectada, numSerie, modelo, contador, color, negro, cyan, amarillo, rojo)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  ON CONFLICT(fecha, ip) DO UPDATE SET 
      fecha = excluded.fecha,
      hora = excluded.hora,
      conectada = excluded.conectada,
      numSerie = excluded.numSerie,
      modelo = excluded.modelo,
      contador = excluded.contador,
      color = excluded.color,
      negro = excluded.negro,
      cyan = excluded.cyan,
      amarillo = excluded.amarillo,
      rojo = excluded.rojo;
    `).run(
        regImp.fecha,
        regImp.hora,
        regImp.ip,
        regImp.conectada,
        regImp.numSerie,
        regImp.modelo,
        regImp.contador,
        regImp.color,
        regImp.negro,
        regImp.cyan,
        regImp.amarillo,
        regImp.rojo
      );
      return {
        changes: result.changes, // Cantidad de filas afectadas
        lastInsertRowid: result.lastInsertRowid, // Último ID insertado
      };

    } catch (error) {
      throw new Error(`Error en insertUpdateRegistro: ${error}`);
    }
  };


  static findAll(): RegistroInterface[] {
    return db.prepare("SELECT * FROM registros").all() as RegistroInterface[];
  }

  static findAllRecords(): RegistroInterface[] {
    let resultadoConsulta: RegistroInterface[] = [];
    let registros: RegistroInterface[] = [];
    resultadoConsulta = db.prepare("SELECT * FROM registros").all() as RegistroInterface[];
    resultadoConsulta.map((resultado: RegistroInterface) => {
      registros.push(resultado);
    });

    return registros;
  }

  static findByIp(ip: string): RegistroInterface[] | [] {
    return db.prepare("SELECT * FROM registros WHERE ip = ? ORDER  BY fecha ASC").all(ip) as RegistroInterface[] | []
  }

  static getLastRecordConectedByIp(ip: string): RegistroInterface | [] {
    return db.prepare("SELECT * FROM registros WHERE ip = ? AND conectada = 1 ORDER BY fecha DESC, hora DESC LIMIT 1").get(ip) as RegistroInterface | []
  }

  static delete(id: number) {
    return db.prepare("DELETE FROM registros WHERE id = ?").run(id);
  }

}



