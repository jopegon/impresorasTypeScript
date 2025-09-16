import { OidsB430 } from "./OidsB430";
import { OidIniciales } from "./OidIniciales";
import { OidsEpsonM4000 } from "./OidsEpsonM4000";
import { Oids5020i } from "./Oids5020i";
import { OidsC405 } from "./OidsC405";
import { Oids1606dn } from "./Oids1606dn";
import { OidsC8800 } from "./OidsC8800";
import { Oids28BW5e } from "./Oids28BW5e";



export class ConstructorOids {

    /*
    Esta clase se encarga de obtener el objeto de datos iniciales
    con las particularidades de cada modelo de impresora
    */

    MapaObjetos = new Map<string, OidIniciales>([
        ["B430", new OidsB430()],
        ["EPSON AL-M4000", new OidsEpsonM4000()],
        ["KONICA MINOLTA bizhub 5020i", new Oids5020i()],
        ["Xerox VersaLink C405 DN Multifunction Printer", new OidsC405()],
        ["HP LaserJet Professional P1606dn", new Oids1606dn()],
        ["C8800", new OidsC8800()],
        ["Generic 28BW-5e", new Oids28BW5e()],
    ]);



    OidsInicialesDe(modelo: string) {

        //console.log(`Dentro de datos iniciales ${modelo}`)
        // Si está dentro del mapa de objetos devuelve el Objeto determinado
        // sino el objeto necesitado es el generico y lo devuelve    


        if (this.MapaObjetos.has(modelo.toString())) {
            //console.log(`Sí encuentro al modelo --${modelo}--`)
            return this.MapaObjetos.get(modelo.toString());
        }
        else {
            //console.log(`No encuentro al modelo --${modelo}--`)
            return new OidIniciales();
        }

    }

}