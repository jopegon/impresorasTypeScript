import express, { Application } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import routerImpresoras from "../routes/routerImpresoras";
import path from "path";
import routerRegistro from "../routes/routerApiRegistros";
import os from "os";
import routerChart from "../routes/routerChart";


export const getLocalIP = (): string | undefined => {
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
    return undefined;
};

export class Server {

    private app: Application;
    private port: number;

    /*  lo dejo en comentarios por si en el futuro quiero configurar CORS de forma más específica
        private corsOptions = {
            // Permitir orígenes específicos
            origin: [
                'http://localhost:3000',
                'http://localhost:4200',  // Angular dev server
                'http://localhost:5173',  // Vite dev server
                'http://localhost:8080',  // Otros frontends
                'https://midominio.com',  // Producción
            ],
    
            // Métodos HTTP permitidos
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    
            // Headers permitidos
            allowedHeaders: [
                'Origin',
                'X-Requested-With',
                'Content-Type',
                'Accept',
                'Authorization',
                'Cache-Control'
            ],
    
            // Permitir envío de cookies
            credentials: true,
    
            // Cache de preflight requests
            optionsSuccessStatus: 200,
            preflightContinue: false
        };
    
    */

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

        console.log(__dirname)
        this.app.use("/bootstrapCss", express.static(path.join(process.cwd(), "./node_modules/bootstrap/dist/css/")));
        this.app.use("/bootStrapJs", express.static(path.join(process.cwd(), "./node_modules/bootstrap/dist/js/")));
        this.app.use("/bootStrapIcons", express.static(path.join(process.cwd(), "./node_modules/bootstrap-icons/font/")));

        this.app.use("/chartJs", express.static(path.join(process.cwd(), "./node_modules/chart.js/dist")));
        this.app.use("/chartJsAdapter", express.static(path.join(process.cwd(), "./node_modules/chartjs-adapter-date-fns/dist")));


        // Printing current directory
        console.log("Current working directory: ", process.cwd());

        this.app.set('views', path.join(process.cwd(), './dist/public//views'));

        this.app.set('view engine', 'ejs');
    }


    private midlewares() {

        // Parseo body
        this.app.use(bodyParser.json());
        this.app.use(express.json());

        // Cors
        this.app.use(cors());
    }

    private routes() {
        this.app.use('', routerImpresoras);
        this.app.use('/records', routerRegistro);
        this.app.use('/chart', routerChart);
        //this.app.use('/ips', routesIp);
        //this.app.use('/id', routesJwt)
        //this.app.use('/api/users', routesUser);
    }


    public getPort():number{
        return this.port;
    }


    public listen() {
        try {
            this.app.listen(this.port, () => {
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