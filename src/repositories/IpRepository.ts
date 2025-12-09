import { Impresora } from "../clases/Impresora";
import db from "../config/db";
import { IpInterface } from "../models/IpInterface";



export class IpRepository {

  static add(ip: IpInterface) {
    const stmt = db.prepare(`
      INSERT INTO ips (ip, localizacion, observaciones)
      VALUES (?, ?, ?)
    `);
    const result = stmt.run(ip.ip, ip.localizacion, ip.observaciones || null);
    return { id: result.lastInsertRowid as number};
  }


  static findAllPrinters(): Impresora[] {
    let resultadoConsulta: IpInterface[] = [];
    let impresoras: Impresora[] = [];
    resultadoConsulta = db.prepare("SELECT * FROM ips").all() as IpInterface[];

    for (let resultado of resultadoConsulta) {
      impresoras.push(new Impresora(resultado.ip, resultado.localizacion));
    }

    return impresoras;
  }

  static findAllIPs(): IpInterface[] {
    let listadoIps: IpInterface[] = [];
    listadoIps = db.prepare("SELECT * FROM ips").all() as IpInterface[];
    return listadoIps;
  }

  static fingAllIpsDateNumber(n: number): IpInterface[] {
    let listadoIps: IpInterface[] = [];
    listadoIps = db.prepare("SELECT * FROM registros WHERE fecha BETWEEN DATE('now', ?' days') AND DATE('now') ORDER BY fecha DESC ;").all(n) as IpInterface[];
    return listadoIps;
  }

  static findByIp(ip: string): IpInterface | undefined {
    return db.prepare("SELECT * FROM ips WHERE ip = ?").get(ip) as IpInterface | undefined;
  }

  static findByIpId(id: number): IpInterface | undefined {
    return db.prepare("SELECT * FROM ips WHERE id = ?").get(id) as IpInterface | undefined;
  }



  static delete(id: number) {
    try {
      const info=db.prepare("DELETE FROM ips WHERE id = ?").run(Number(id));
      return info;
    } catch (error) {
      console.error("Error en DB durante la eliminación:", error);
      throw error; // En caso de error, devuelve false
    }
  }

  static update({ id, ip, localizacion, observaciones }: IpInterface) {
    const stmt = db.prepare(`
      UPDATE ips
      SET ip = ?, localizacion = ?, observaciones = ?
      WHERE id = ?
    `);
    return stmt.run(ip, localizacion, observaciones || null, id);
  }

}

