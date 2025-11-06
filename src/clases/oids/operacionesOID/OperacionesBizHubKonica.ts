import { OidIniciales } from "../OidIniciales";
import { OperacionesGenericas } from "./OperacionesGenericas";

export class OperacionesBizhub extends OperacionesGenericas {
    datosIniciales: OidIniciales = new OidIniciales();

    getNivel(nivelActual:number, nivelLleno:number): number {

        let listaNumeros = nivelActual.toString().split(",");
        let numero:number =Number(listaNumeros[0]);
        return numero;
        
    }

}