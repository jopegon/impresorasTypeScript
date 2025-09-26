import { Server } from "./server/server";

const servidor = new Server(3600);

servidor.listen();