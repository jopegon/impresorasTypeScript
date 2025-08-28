import { DatosOidIniciales } from "./DatosOidIniciales";

export class DatosInicialesGeneric28BW5e extends DatosOidIniciales {


    // Datos erroneos puestos a posta, es impresora b/n sino la detecta color

    oidTonerLevelMagenta: string = '1.3.6.1.2.1.43.11.1.1.9.1.3.1.1.1.1.1.1.1.1.1.asdfa1.1.1.1';
    oidFullCapacityMagenta: string = '1.3.6.1.2.1.43.11.1.1.8.1.3.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1';

    oidTonerLevelCyan: string = '1.3.6.1.2.1.43.11.1.1.9.1.4.1.1.1.1.1.1.1.1.1.1';
    oidFullCapacityCyan: string = '1.3.6.1.2.1.43.11.1.1.8.1.4.1.1.1.1.1.1.1.1.1.1.1.1';

    oidTonerLevelAmarillo: string = '1.3.6.1.2.1.43.11.1.1.9.1.2.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1';
    oidFullCapacityAmarillo: string = '1.3.6.1.2.1.43.11.1.1.8.1.2.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1';

}

