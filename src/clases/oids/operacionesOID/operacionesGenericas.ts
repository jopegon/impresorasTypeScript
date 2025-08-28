import { DatosOidIniciales } from "../DatosOidIniciales";
import { InterfaceOperaciones } from "./interfaceOperaciones";

export class OperacionesGenericas implements InterfaceOperaciones {
    datosIniciales: DatosOidIniciales = new DatosOidIniciales();

    getNivel(nivelActual:number, nivelLleno:number): number {
        let valor =0
        valor= Math.trunc((nivelActual/nivelLleno)*100);
        if (valor<0){
            valor=0
        }
        return valor;
        
    }



}