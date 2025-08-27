import { DatosInicialesB430 } from "./DatosInicialesB430";
import { DatosIniciales } from "./DatosIniciales";
import { DatosInicialesEpsonM4000 } from "./DatosInicialesEpsonM4000";
import { DatosIniciales5020i } from "./DatosIniciales5020i";
import { DatosInicialesC405 } from "./DatosInicialesC405";
import { DatosIniciales1606dn } from "./DatosIniciales1606dn";
import { DatosInicialesC8800 } from "./DatosInicialesC8800";
import { DatosInicialesGeneric28BW5e } from "./DatosInicialesGeneric28BW5e";



export class ConstructorDatosIniciales {

    //MapaObjetos = new Map();
    //MapaObjetos.set('B430', new DatosInicialesB430());   // un string como clave


    MapaObjetos = new Map<string, DatosIniciales>([
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

        /*
        this.MapaObjetos.set("B430", new DatosInicialesB430());   // un string como clave
        this.MapaObjetos.set("EPSON AL-M4000", new DatosInicialesEpsonM4000());   // un string como clave
        this.MapaObjetos.set("KONICA MINOLTA bizhub 5020i", new DatosIniciales5020i());
        this.MapaObjetos.set("Xerox VersaLink C405 DN Multifunction Printer", new DatosInicialesC405());
 */


        if (this.MapaObjetos.has(modelo.toString())) {
            //console.log(`Sí encuentro al modelo --${modelo}--`)
            return this.MapaObjetos.get(modelo.toString());
        }
        else {
            //console.log(`No encuentro al modelo --${modelo}--`)
            return new DatosIniciales();
        }

    }

}