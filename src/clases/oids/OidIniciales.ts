export class OidIniciales {   

    /*
    Esta clase contiene los OIDs iniciales para obtener la información básica de una impresora a través de SNMP.

    También incluye métodos para obtener y establecer estos OIDs, así como para agruparlos según su 
    necesidad (por ejemplo, OIDs para el número de serie, modelo, niveles de tóner)
    */

    oidModelo: string = '1.3.6.1.2.1.25.3.2.1.3.1';
    oidLocalizacion: string = '1.3.6.1.2.1.1.6.0';
    oidNumeroDeSerie: string = '1.3.6.1.2.1.43.5.1.1.17.1';

    oidTonerLevelNegro: string = '1.3.6.1.2.1.43.11.1.1.9.1.1';
    oidFullCapacityNegro: string = '1.3.6.1.2.1.43.11.1.1.8.1.1';

    oidTonerLevelCyan: string = '1.3.6.1.2.1.43.11.1.1.9.1.2';
    oidFullCapacityCyan: string = '1.3.6.1.2.1.43.11.1.1.8.1.2';

    oidTonerLevelMagenta: string = '1.3.6.1.2.1.43.11.1.1.9.1.3';
    oidFullCapacityMagenta: string = '1.3.6.1.2.1.43.11.1.1.8.1.3';

    oidTonerLevelAmarillo: string = '1.3.6.1.2.1.43.11.1.1.9.1.4';
    oidFullCapacityAmarillo: string = '1.3.6.1.2.1.43.11.1.1.8.1.4';


    getOidsNumeroDeSerie() {
        return [this.oidNumeroDeSerie];
    }


    getOidsModelo() {
        return [this.oidModelo];
    }

    getOidsBN() {
        return [this.oidTonerLevelNegro, this.oidFullCapacityNegro];
    }

    getOidsColor() {
        return [
            this.oidTonerLevelCyan,
            this.oidFullCapacityCyan,
            this.oidTonerLevelMagenta,
            this.oidFullCapacityMagenta,
            this.oidTonerLevelAmarillo,
            this.oidFullCapacityAmarillo
        ];
    }

    getOidFullCapacityAmarillo() {
        return this.oidFullCapacityAmarillo;
    }

    setOidFullCapacityAmarillo(value: string) {
        this.oidFullCapacityAmarillo = value;
    }

    getOidModelo() {
        return this.oidModelo;
    }

    getOidTonerLevelAmarillo() {
        return this.oidTonerLevelAmarillo;
    }

    setOidTonerLevelAmarillo(value: string) {
        this.oidTonerLevelAmarillo = value;
    }

    getOidFullCapacityMagenta() {
        return this.oidFullCapacityMagenta;
    }

    setOidFullCapacityMagenta(value: string) {
        this.oidFullCapacityMagenta = value;
    }

    getOidTonerLevelMagenta() {
        return this.oidTonerLevelMagenta;
    }

    setOidTonerLevelMagenta(value: string) {
        this.oidTonerLevelMagenta = value;
    }

    getOidTonerLevelCyan() {
        return this.oidTonerLevelCyan;
    }

    setOidTonerLevelCyan(value: string) {
        this.oidTonerLevelCyan = value;
    }

    getOidFullCapacityCyan() {
        return this.oidFullCapacityCyan;
    }

    setOidFullCapacityCyan(value: string) {
        this.oidFullCapacityCyan = value;
    }

    getOidLocalizacion() {
        return this.oidLocalizacion;
    }

    setOidLocalizacion(value: string) {
        this.oidLocalizacion = value;
    }

    getOidTonerLevelNegro() {
        return this.oidTonerLevelNegro;
    }

    setOidTonerLevelNegro(value: string) {
        this.oidTonerLevelNegro = value;
    }

    getOidNumeroDeSerie() {
        return this.oidNumeroDeSerie;
    }

    setOidNumeroDeSerie(oidNumeroDeSerie: string) {
        this.oidNumeroDeSerie = oidNumeroDeSerie;
    }

    getOidFullCapacityNegro() {
        return this.oidFullCapacityNegro;
    }

    setOidFullCapacityNegro(value: string) {
        this.oidFullCapacityNegro = value;
    }

}
