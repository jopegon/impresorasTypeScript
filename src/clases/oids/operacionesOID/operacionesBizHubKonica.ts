import { DatosIniciales } from "../DatosIniciales";
import { InterfaceOperaciones } from "./interfaceOperaciones";
import { OperacionesGenericas } from "./operacionesGenericas";

export class operacionesBizhub extends OperacionesGenericas {
    datosIniciales: DatosIniciales = new DatosIniciales();

    getNivel(nivelActual:number, nivelLleno:number): number {

        let listaNumeros = nivelActual.toString().split(",");
        let numero:number =Number(listaNumeros[0]);
        return numero;
        
    }

}