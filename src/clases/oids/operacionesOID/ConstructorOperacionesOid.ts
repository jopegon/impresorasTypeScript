import { OperacionesBizhub } from "./OperacionesBizHubKonica";
import { OperacionesGenericas } from "./OperacionesGenericas";


export class ConstructorOperacionesOID {

    MapaObjetos:Map<String, OperacionesGenericas> = new Map();
    
    operacionesModelo(modelo: string): OperacionesGenericas {

        // console.log(`Dentro de datos iniciales ${modelo}`)
        // Si está dentro del mapa de objetos devuelve el Objeto determinado
        // sino el objeto necesitado es el generico y lo devuelve    
        
        this.MapaObjetos.set("KONICA MINOLTA bizhub 5020i", new OperacionesBizhub());
         

        //console.log(`modelo --${modelo}--`)
    
        if (this.MapaObjetos.has(modelo.toString())) {
            //console.log(`Sí encuentro al modelo --${modelo}--`)
            return this.MapaObjetos.get(modelo.toString())!;
        }
        else {
            //console.log(`No encuentro al modelo --${modelo}--`)
            return new OperacionesGenericas();
        }

    }

}