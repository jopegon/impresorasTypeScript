import { DatosOidIniciales } from './clases/oids/DatosOidIniciales';
import { ConstructorDatosIniciales } from './clases/oids/ConstructorDatosIniciales';
import snmp from 'net-snmp';
import { ConstructorOperacionesOID } from './clases/oids/operacionesOID/ConstructorOperacionesOid';


export class ConsultaImpresora {

  constructor(impresora) {
    this.clientOptions = {
      port: 161,
      retries: 3,
      timeout: 250,
      version: snmp.Version2,
      community: 'public'
    };
    this.impresora = impresora;
    this.oidsIniciales = new DatosOidIniciales();
    this.constructorDatosIniciales = new ConstructorDatosIniciales();
    this.operaciones = null;
    this.session = null;
  }

  saluda() {
    console.log(`hola soy impresora ${this.impresora.getIp()}`);
  }

  /*
  * Filtra los varbinds para obtener el valor del OID especificado
  */
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
  async etapaIdentificacion() {

    try {
      const varbinds = await this.snmpGet(this.oidsIniciales.getOidsModelo());
      this.impresora.setConectada(true);
      this.impresora.setModelo(this.getVarbinds(varbinds, this.oidsIniciales.getOidModelo()));

      // Adapto las propiedades de oids a cada impresora 
      this.oidsIniciales = new ConstructorDatosIniciales().datosInicialesDe(this.impresora.getModelo());

      this.operaciones = new ConstructorOperacionesOID().operacionesModelo(this.impresora.getModelo());

    } catch (error) {
      this.impresora.setConectada(false);
    }
  }


  getImpresora() {
    return this.impresora;
  }

  async etapaDatosNegro() {

    let nivelNegroActual;
    let nivelNegroLleno;

    try {
      const varbinds = await this.snmpGet(this.oidsIniciales.getOidsBN());

      nivelNegroActual = this.getVarbinds(varbinds, this.oidsIniciales.getOidTonerLevelNegro());
      nivelNegroLleno = this.getVarbinds(varbinds, this.oidsIniciales.getOidFullCapacityNegro());

      this.impresora.setNegro(this.operaciones.getNivel(nivelNegroActual, nivelNegroLleno));
    } catch (error) {
      // Do nothing
    }

  }



  async etapaDatosNumeroDeSerie() {
    try {
      const varbinds = await this.snmpGet(this.oidsIniciales.getOidsNumeroDeSerie());
      this.impresora.setNumeroDeSerie(this.getVarbinds(varbinds, this.oidsIniciales.getOidNumeroDeSerie().toString()));
    } catch (error) {
      // Do nothing
    }
  }



  async etapaDatosColor() {

    try {
      const varbinds = await this.snmpGet(this.oidsIniciales.getOidsColor());

      this.impresora.setColor(true);

      let nivelActual;
      let nivelLleno;

      nivelActual = this.getVarbinds(varbinds, this.oidsIniciales.getOidTonerLevelCyan());
      nivelLleno = this.getVarbinds(varbinds, this.oidsIniciales.getOidFullCapacityCyan());

      this.impresora.setCyan(this.operaciones.getNivel(nivelActual, nivelLleno));

      nivelActual = this.getVarbinds(varbinds, this.oidsIniciales.getOidTonerLevelAmarillo());
      nivelLleno = this.getVarbinds(varbinds, this.oidsIniciales.getOidFullCapacityAmarillo());

      this.impresora.setAmarillo(this.operaciones.getNivel(nivelActual, nivelLleno));

      nivelActual = this.getVarbinds(varbinds, this.oidsIniciales.getOidTonerLevelMagenta());
      nivelLleno = this.getVarbinds(varbinds, this.oidsIniciales.getOidFullCapacityMagenta());

      this.impresora.setMagenta(this.operaciones.getNivel(nivelActual, nivelLleno));

    } catch (error) {
      // Do nothing
    }

  }


  async obtenerDatosImpresora() {
    try {
      this.session = snmp.createSession(this.impresora.getIp(), this.clientOptions.community, this.clientOptions);

      /*
       Esta etapa es imprecindible para saber el modelo de impresora
       una vez sabemos el modelo de impresora, podemos adaptar las siguientes etapas
       a las particularidades de cada modelo    
       */
      await this.etapaIdentificacion(); // Ejecuta la etapa de identificación

      await this.etapaDatosNegro(); // Ejecuta la etapa de datos negro

      /*
        hay que tratar de unir etapa datos negro y etapa dato numero de serie
        , sino lo he hecho anteriormete ver porque
      */


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
