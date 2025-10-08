import { Recolector } from "./recolector/Recolector";
import { Server } from "./server/server";


console.log(`Iniciando aplicación impresoras`);
console.log(``);

export const puerto=3050;

const servidor = new Server(puerto);

servidor.listen();

const recolector = new Recolector();

recolector.recolecta();





