/*
*   Esta clase va a ejecutar en bucle la consulta de nivel de 
    impresoras 
*/

import cron from "node-cron";
import { registraTodasIps, registraTodasIpsConectadas } from "./rutinasCaptura";


export class Recolector {

    constructor() {
    }




    public recolecta() {
        try {
            this.inicioDia();
            this.cadaHora();
            this.finalDia();
            console.log(`✅ Recolector en funcionamiento`);

        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error('❌ Error al iniciar el recolector', error.message);
            } else {
                console.error('❌ Error desconocido:', JSON.stringify(error, null, 2));
            }
        }

    }

    /*
    *  Rutina que se ejecuta cada hora en punto, excepto a las  00:00, 
    *  solamente se realiza la escritura si la impresora está conectada
    */
    private cadaHora() {
        cron.schedule("0 1-23 * * *", () => {
            console.log(`Ejecuto rutina cadaHora a las ${new Date().toLocaleTimeString()}`);
            registraTodasIpsConectadas();
        });
    }

    /*
    *   Rutina que se ejecuta al comenzar el día (00:00) para asegurar un registro de 
    *   cada impresora aunque no esté conectada y no aporte datos (solo realiza insert)
    */
    private inicioDia() {
        cron.schedule("0 0 * * *", () => {
            console.log(`Ejecuto rutina InicioDía --> ${new Date().toLocaleTimeString()}`);
            console.log(`Con la fecha -> ${new Date()}`);
            // Aquí colocas el código de la rutina
            registraTodasIps();
        });
    }

    /*
    *  Rutina que se ejecuta al finalizar el día a las 23:59
    */
    private finalDia() {
        cron.schedule("59 23 * * *", () => {
            console.log(`Finalizo el día ${new Date().toLocaleTimeString()}`);
            registraTodasIpsConectadas();
            // Aquí colocas el código de la rutina
        });
    }


}