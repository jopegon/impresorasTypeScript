import express, { Application } from "express";
import cors from "cors";
import routerImpresoras from "../routes/routerImpresoras";
import path from "node:path";
import routerRegistro from "../routes/routerApiRegistros";
import os from "node:os";
import routerChart from "../routes/routerChart";
import routerIps from "../routes/routerIps";
import favicon from 'serve-favicon';


export const getLocalIP = (): string  => {
    const interfaces = os.networkInterfaces();

    for (const name of Object.keys(interfaces)) {
        const iface = interfaces[name];

        if (!iface) continue;

        for (const alias of iface) {
            // Ignorar direcciones internas (ej. 127.0.0.1) y solo IPv4
            if (alias.family === "IPv4" && !alias.internal) {
                return alias.address;
            }
        }
    }
    return 'undefined';
};


let DEFAULT_PORT:number = 0;
let DEFAULT_IP: string='';


export const getAddressWithPort = (): string => {
    return `http://${DEFAULT_IP}:${DEFAULT_PORT}`;
};

export class Server {

    private readonly app: Application;
    private readonly port: number;
    private readonly ip: string | undefined;

    constructor(port: number) {
        this.app = express();
        this.port = port; 
        this.midlewares();
        this.routes();
        this.seteos();
    }

    private seteos() {

        this.app.use(express.static('public'))

        this.app.use('/img', express.static(path.join(process.cwd(), './dist/public/img')));
        this.app.use('/css', express.static(path.join(process.cwd(), './dist/public/css')));
        this.app.use('/jss', express.static(path.join(process.cwd(), './dist/public/js')));

        console.log(__dirname);

        this.app.use("/bootstrapCss", express.static(path.join(process.cwd(), "./node_modules/bootstrap/dist/css/")));
        this.app.use("/bootStrapJs", express.static(path.join(process.cwd(), "./node_modules/bootstrap/dist/js/")));
        this.app.use("/bootStrapIcons", express.static(path.join(process.cwd(), "./node_modules/bootstrap-icons/font/")));

        this.app.use("/chartJs", express.static(path.join(process.cwd(), "./node_modules/chart.js/dist")));
        this.app.use("/chartJsAdapter", express.static(path.join(process.cwd(), "./node_modules/chartjs-adapter-date-fns/dist")));

        this.app.use(favicon(path.join(process.cwd(), './dist/public/img/favicon.ico')));


        // Printing current directory
        console.log("Current working directory: ", process.cwd());

        this.app.set('views', path.join(process.cwd(), './dist/public/views'));

        this.app.set('view engine', 'ejs');
    }


    private midlewares() {
        // Cors
        this.app.use(cors());

        // Parseo body
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));

    }

    private routes() {
        this.app.use('', routerImpresoras);
        this.app.use('/records', routerRegistro);
        this.app.use('/chart', routerChart);
        this.app.use('/ips', routerIps);
        //this.app.use('/id', routesJwt)
        //this.app.use('/api/users', routesUser);
    }


    public getPort(): number {
        return this.port;
    }


    public listen() {
        try {
            this.app.listen(this.port, () => {
                DEFAULT_PORT=this.port;
                DEFAULT_IP=getLocalIP();
                console.log(`✅ Servidor HTTP en http://${getLocalIP()}:${this.port}`);
            })
        }
        catch (error: unknown) {
            if (error instanceof Error) {
                console.error('❌ Error al iniciar el servidor HTTP:', error.message);
            } else {
                console.error('❌ Error desconocido:', JSON.stringify(error, null, 2));
            }
        }
    }

}