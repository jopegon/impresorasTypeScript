import { OidIniciales } from "../OidIniciales";
import { InterfaceOperaciones } from "./InterfaceOperaciones";
import { OperacionesGenericas } from "./OperacionesGenericas";

export class operacionesBizhub extends OperacionesGenericas {
    datosIniciales: OidIniciales = new OidIniciales();

    getNivel(nivelActual:number, nivelLleno:number): number {

        let listaNumeros = nivelActual.toString().split(",");
        let numero:number =Number(listaNumeros[0]);
        return numero;
        
    }

}