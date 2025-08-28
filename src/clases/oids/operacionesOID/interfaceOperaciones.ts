import { DatosOidIniciales } from "../DatosOidIniciales";

export interface InterfaceOperaciones {
    datosIniciales: DatosOidIniciales;
    getNivel(nivelActual:number, nivelLleno:number): number;
  }