import { DatosInicialesB430 } from "./DatosInicialesB430";
import { DatosOidIniciales } from "./DatosOidIniciales";
import { DatosInicialesEpsonM4000 } from "./DatosInicialesEpsonM4000";
import { DatosIniciales5020i } from "./DatosIniciales5020i";
import { DatosInicialesC405 } from "./DatosInicialesC405";
import { DatosIniciales1606dn } from "./DatosIniciales1606dn";
import { DatosInicialesC8800 } from "./DatosInicialesC8800";
import { DatosInicialesGeneric28BW5e } from "./DatosInicialesGeneric28BW5e";



export class ConstructorDatosIniciales {

    /*
    Esta clase se encarga de obtener el objeto de datos iniciales
    con las particularidades de cada modelo de impresora
    */

    MapaObjetos = new Map<string, DatosOidIniciales>([
        ["B430", new DatosInicialesB430()],
        ["EPSON AL-M4000", new DatosInicialesEpsonM4000()],
        ["KONICA MINOLTA bizhub 5020i", new DatosIniciales5020i()],
        ["Xerox VersaLink C405 DN Multifunction Printer", new DatosInicialesC405()],
        ["HP LaserJet Professional P1606dn", new DatosIniciales1606dn()],
        ["C8800", new DatosInicialesC8800()],
        ["Generic 28BW-5e", new DatosInicialesGeneric28BW5e()],
    ]);



    datosInicialesDe(modelo: string) {

        //console.log(`Dentro de datos iniciales ${modelo}`)
        // Si está dentro del mapa de objetos devuelve el Objeto determinado
        // sino el objeto necesitado es el generico y lo devuelve    


        if (this.MapaObjetos.has(modelo.toString())) {
            //console.log(`Sí encuentro al modelo --${modelo}--`)
            return this.MapaObjetos.get(modelo.toString());
        }
        else {
            //console.log(`No encuentro al modelo --${modelo}--`)
            return new DatosOidIniciales();
        }

    }

}