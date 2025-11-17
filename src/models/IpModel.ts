import { Impresora } from "../clases/Impresora";
import db from "../config/db";
import { InterfaceIp } from "./IpInterface";



export class IpModel {

  static create(ip: string, localizacion: string, observaciones?: string) {
    const stmt = db.prepare(`
      INSERT INTO ips (ip, localizacion, observaciones)
      VALUES (?, ?, ?)
    `);
    const result = stmt.run(ip, localizacion, observaciones || null);
    return { id: result.lastInsertRowid as number, ip, localizacion, observaciones };
  }


  static findAllPrinters(): Impresora[] {
    let resultadoConsulta: InterfaceIp[] = [];
    let impresoras: Impresora[] = [];
    resultadoConsulta = db.prepare("SELECT * FROM ips").all() as InterfaceIp[];

    for (let resultado of resultadoConsulta){
      impresoras.push(new Impresora(resultado.ip, resultado.localizacion));
    }

    return impresoras;
  }

  static findAllIPs(): InterfaceIp[] {
    let listadoIps: InterfaceIp[] = [];
    listadoIps = db.prepare("SELECT * FROM ips").all() as InterfaceIp[];
    return listadoIps;
  }

  static fingAllIpsDateNumber(n:number): InterfaceIp[] {
    let listadoIps: InterfaceIp[] = [];
    listadoIps = db.prepare("SELECT * FROM registros WHERE fecha BETWEEN DATE('now', ?' days') AND DATE('now') ORDER BY fecha DESC ;").all(n) as InterfaceIp[];
    return listadoIps;
  }

  static findByIp(ip: string): InterfaceIp | undefined {
    return db.prepare("SELECT * FROM ips WHERE ip = ?").get(ip) as InterfaceIp | undefined;
  }

  static delete(id: number) {
    return db.prepare("DELETE FROM ips WHERE id = ?").run(id);
  }
}

