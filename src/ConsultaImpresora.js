import { DatosIniciales } from './clases/oids/DatosIniciales';
import { ConstructorDatosIniciales } from './clases/oids/ConstructorDatosIniciales';
import snmp from 'net-snmp';
import { ConstructorOperacionesOID } from './clases/oids/operacionesOID/ConstructorOperacionesOid';


export class ConsultaImpresora {

  clientOptions = {
    port: 161,
    retries: 3,
    timeout: 250,
    version: snmp.Version2,
    community: 'public'
  };

  datosIniciales;
  session;
  impresora;
  constructorDatosIniciales;

  constructor(impresora) {
    this.impresora = impresora;
    this.datosIniciales = new DatosIniciales();
    this.constructorDatosIniciales = new ConstructorDatosIniciales();
  }

  saluda() {
    console.log(`hoal soy impresora ${this.impresora.getIp()}`);
  }

  getVarbinds = (varbinds, oid) => {
    return varbinds.filter((p) => p.oid === oid).map((p) => p.value)
  }

  snmpGet(oids) {
    return new Promise((resolve, reject) => {
      this.session.get(oids, (error, varbinds) => {
        if (error) {
          reject(error);
        } else {
          resolve(varbinds);
        }
      })
    })
  }

  /*
  * Obtener el modelo de impresora
  */
  async etapaIdentifiacion() {

    try {
      const varbinds = await this.snmpGet(this.datosIniciales.getOidsModelo());
      this.impresora.setConectada(true);
      this.impresora.setModelo(this.getVarbinds(varbinds, this.datosIniciales.getOidModelo()));

      // Adapto las propiedades de oids a cada impresora 
      this.datosIniciales = new ConstructorDatosIniciales().datosInicialesDe(this.impresora.getModelo());

    } catch (error) {
      this.impresora.setConectada(false);
    }
  }


  getImpresora() {
    return this.impresora;
  }

  async etapaDatosNegro() {

    /*
    * hay que tratar en datos (clase DatosIniciales) las peculiaridades del modelo de impresora
    */

    let nivelNegroActual;
    let nivelNegroLleno;

    try {
      const varbinds = await this.snmpGet(this.datosIniciales.getOidsBN());
      nivelNegroActual = this.getVarbinds(varbinds, this.datosIniciales.getOidTonerLevelNegro());
      nivelNegroLleno = this.getVarbinds(varbinds, this.datosIniciales.getOidFullCapacityNegro());

      let operaciones = new ConstructorOperacionesOID().operacionesModelo(this.impresora.getModelo());
      nivelNegroActual = operaciones.getNivel(nivelNegroActual, nivelNegroLleno);
      this.impresora.setNegro(nivelNegroActual);
    } catch (error) {
      // Do nothing
    }

  }



  async etapaDatosNumeroDeSerie() {
    try {
      const varbinds = await this.snmpGet(this.datosIniciales.getOidsNumeroDeSerie());
      this.impresora.setNumeroDeSerie(this.getVarbinds(varbinds, this.datosIniciales.getOidNumeroDeSerie().toString()));
    } catch (error) {
      // Do nothing
    }
  }



  async etapaDatosColor() {


    try {
      const varbinds = await this.snmpGet(this.datosIniciales.getOidsColor());

      this.impresora.setColor(true);

      let operaciones = new ConstructorOperacionesOID().operacionesModelo(this.impresora.getModelo());

      let nivelActual;
      let nivelLleno;

      nivelActual = this.getVarbinds(varbinds, this.datosIniciales.getOidTonerLevelCyan());
      nivelLleno = this.getVarbinds(varbinds, this.datosIniciales.getOidFullCapacityCyan());

      this.impresora.setCyan(operaciones.getNivel(nivelActual, nivelLleno));

      nivelActual = this.getVarbinds(varbinds, this.datosIniciales.getOidTonerLevelAmarillo());
      nivelLleno = this.getVarbinds(varbinds, this.datosIniciales.getOidFullCapacityAmarillo());

      this.impresora.setAmarillo(operaciones.getNivel(nivelActual, nivelLleno));

      nivelActual = this.getVarbinds(varbinds, this.datosIniciales.getOidTonerLevelMagenta());
      nivelLleno = this.getVarbinds(varbinds, this.datosIniciales.getOidFullCapacityMagenta());

      this.impresora.setMagenta(operaciones.getNivel(nivelActual, nivelLleno));

    } catch (error) {
      // Do nothing
    }

  }


  async obtenerDatosImpresora() {
    try {
      this.session = snmp.createSession(this.impresora.getIp(), this.clientOptions.community, this.clientOptions);

      await this.etapaIdentifiacion(); // Ejecuta la etapa de identificación

      await this.etapaDatosNegro(); // Ejecuta la etapa de datos negro

      await this.etapaDatosNumeroDeSerie();

      await this.etapaDatosColor(); // Ejecuta la etapa de datos color

    } catch (error) {
      // No hacer nada
    }
    finally {
      this.session.close();
    }

    return this.impresora;
  }

}
