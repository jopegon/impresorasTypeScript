import { DatosIniciales } from "../DatosIniciales";

export interface InterfaceOperaciones {
    datosIniciales: DatosIniciales;
    getNivel(nivelActual:number, nivelLleno:number): number;
  }