import { Recolector } from "./recolector/Recolector";
import { Server } from "./server/server";


console.log(`Iniciando aplicación impresoras`);
console.log(``);

const servidor = new Server(3000);

servidor.listen();

const recolector = new Recolector();

recolector.recolecta();





