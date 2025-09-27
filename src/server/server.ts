import express, { Application } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import routerImpresoras from "../routes/routerImpresoras";
import path from "path";
import routerRegistro from "../routes/routerApiRegistros";

export class Server {

    private app: Application;
    private port: number;

    constructor(port: number) {
        this.app = express();
        this.port = port;
        this.midlewares();
        this.routes();

        this.app.use(express.static('public'))
        
        //app.use('/js', express.static(path.join(__dirname, './node_modules/bootstrap/dist/js')));
        this.app.use('/img', express.static(path.join(__dirname, '../../public/img')));
        this.app.use('/css', express.static(path.join(__dirname, '../../public/css')));
        this.app.use('/jss', express.static(path.join(__dirname, '../../public/js')));
        
        console.log(__dirname)
        this.app.use("/bootstrapCss",  express.static(path.join(process.cwd(), "./node_modules/bootstrap/dist/css/")));
        this.app.use("/bootStrapJs",  express.static(path.join(process.cwd(), "./node_modules/bootstrap/dist/js/")));
        
        // Printing current directory
        console.log("Current working directory: ", process.cwd());
        
        this.app.set('views', path.join(__dirname, '../../public/views'));
        
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
        this.app.use('/api', routerRegistro);
        //this.app.use('/ips', routesIp);
        //this.app.use('/id', routesJwt)
        //this.app.use('/api/users', routesUser);
    }




    public listen() {
        try {
            this.app.listen(this.port, () => {
                console.log(`✅ Servidor pruebas HTTP en http://localhost:${this.port}`);
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