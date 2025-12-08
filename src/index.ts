import { Recolector } from "./recolector/Recolector";
import { Server } from "./server/server";


console.log(`Iniciando aplicación impresoras`);
console.log(``);

export const port=3050;

const server = new Server(port);

server.listen();

const recolector = new Recolector();

recolector.recolecta();





