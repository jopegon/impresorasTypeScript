import { OidIniciales } from "../OidIniciales";
import { InterfaceOperaciones } from "./InterfaceOperaciones";

export class OperacionesGenericas implements InterfaceOperaciones {
    datosIniciales: OidIniciales = new OidIniciales();

    getNivel(nivelActual:number, nivelLleno:number): number {
        let  valor:number = 0;
        valor= Math.trunc((nivelActual/nivelLleno)*100);
        if (valor<0){
            valor=0
        }
        return valor;
        
    }



}