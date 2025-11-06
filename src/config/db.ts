import Database from 'better-sqlite3';

const db = new Database('database.db');

// Crear la tabla de usuarios si no existe
db.prepare(`
CREATE TABLE IF NOT EXISTS registros (
  id INTEGER PRIMARY KEY,
  fecha TEXT NOT NULL,
  hora TEXT,
  ip TEXT NOT NULL,
  conectada INTEGER,
  numSerie TEXT,
  modelo TEXT,
  contador INTEGER,
  color INTEGER,
  negro INTEGER,
  cyan INTEGER,
  amarillo INTEGER,
  rojo INTEGER,
  UNIQUE(fecha, ip)
);`).run();

db.prepare(`CREATE TABLE IF NOT EXISTS ips ( 
  id INTEGER PRIMARY KEY AUTOINCREMENT,  
  ip TEXT NOT NULL UNIQUE, 
  localizacion TEXT NOT NULL,  
  observaciones TEXT);`).run();



db.prepare(`CREATE TABLE IF NOT EXISTS users ( 
  id INTEGER PRIMARY KEY AUTOINCREMENT,  
  user TEXT NOT NULL UNIQUE, 
  password TEXT NOT NULL,  
  observaciones TEXT);`).run();
export default db;