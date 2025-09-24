import { Impresora } from "../models/Impresora";
import db from "../config/db";
import { InterfaceIp } from "../models/IpModel";



export class IpService {
  static create(ip: string, localizacion: string, observaciones?: string) {
    const stmt = db.prepare(`
      INSERT INTO ips (ip, localizacion, observaciones)
      VALUES (?, ?, ?)
    `);
    const result = stmt.run(ip, localizacion, observaciones || null);
    return { id: result.lastInsertRowid as number, ip, localizacion, observaciones };
  }

  static findAll(): InterfaceIp[] {
    return db.prepare("SELECT * FROM ips").all() as InterfaceIp[];
  }

  static findAllPrinters(): Impresora[] {
    let resultadoConsulta: InterfaceIp[] = [];
    let impresoras: Impresora[] = [];
    resultadoConsulta=db.prepare("SELECT * FROM ips").all() as InterfaceIp[];
    resultadoConsulta.map((resultado:InterfaceIp) => {
      impresoras.push(new Impresora(resultado.ip, resultado.localizacion));
    });
    
    return impresoras;
  }

  static findByIp(ip: string): InterfaceIp | undefined {
    return db.prepare("SELECT * FROM ips WHERE ip = ?").get(ip) as InterfaceIp | undefined;
  }

  static delete(id: number) {
    return db.prepare("DELETE FROM ips WHERE id = ?").run(id);
  }
}
  
