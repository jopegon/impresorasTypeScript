import { OidIniciales } from "../OidIniciales";
import { OperacionesGenericas } from "./OperacionesGenericas";

export class OperacionesBizhub extends OperacionesGenericas {
    datosIniciales: OidIniciales = new OidIniciales();

    getNivel(nivelActual:number, nivelLleno:number): number {

        const listaNumeros:string[] = nivelActual.toString().split(",");
        const numero:number =Number(listaNumeros[0]);
        return numero;
        
    }

}