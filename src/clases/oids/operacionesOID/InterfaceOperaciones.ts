import { OidIniciales } from "../OidIniciales";

export interface InterfaceOperaciones {
    datosIniciales: OidIniciales;
    getNivel(nivelActual:number, nivelLleno:number): number;
  }