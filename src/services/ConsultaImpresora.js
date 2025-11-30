import { OidIniciales } from '../clases/oids/OidIniciales';
import { ConstructorOids } from '../clases/oids/ConstructorOids';
import snmp from 'net-snmp';
import { ConstructorOperacionesOID } from '../clases/oids/operacionesOID/ConstructorOperacionesOid';


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
    this.oidsIniciales = new OidIniciales();
    this.constructorDatosIniciales = new ConstructorOids();
    this.operaciones = null;
    this.session = null;
  }

  setTimeout(timeout) {
    this.clientOptions.timeout = timeout;
  }

  getTimeout() {
    return this.clientOptions.timeout;
  }

  setRetries(retries) {
    this.clientOptions.retries = retries;
  }

  getRetries() {
    return this.clientOptions.retries;
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

  async snmpGet(oids) {
    return await new Promise((resolve, reject) => {
      this.session.get(oids, (error, varbinds) => {
        if (error) {
          //reject(error);
          reject(error instanceof Error ? error : new Error(String(error)));
        } else {
          resolve(varbinds);
        }
      })
    })
  }

  /*
  * Obtener el modelo de impresora, para que pueda utilizarse 
  * por ConstructorDatosIniciales y ConstructorOperacionesOID
  * para adaptar las siguientes etapas a cada modelo de impresora
  */
  async etapaObtenerModelo() {

    const varbinds = await this.snmpGet(this.oidsIniciales.getOidsModelo());
    this.impresora.setConectada(true);
    this.impresora.setModelo(this.getVarbinds(varbinds, this.oidsIniciales.getOidModelo()));

    // Adapto las propiedades de oids a cada impresora 
    this.oidsIniciales = new ConstructorOids().OidsInicialesDe(this.impresora.getModelo());

    this.operaciones = new ConstructorOperacionesOID().operacionesModelo(this.impresora.getModelo());
  }


  getImpresora() {
    return this.impresora;
  }

  async etapaNivelesNegro() {

    const varbinds = await this.snmpGet(this.oidsIniciales.getOidsBN());

    this.impresora.setNegro(await this.obtenerNivel(varbinds, this.oidsIniciales.getOidTonerLevelNegro(), this.oidsIniciales.getOidFullCapacityNegro()));

  }

  async etapaContador() {

    const varbinds = await this.snmpGet(this.oidsIniciales.getOidsContadorImpresiones());
    this.impresora.setContador(this.getVarbinds(varbinds, this.oidsIniciales.getOidContadorImpresiones())[0]);

  }

  async etapaNumeroDeSerie() {

    const varbinds = await this.snmpGet(this.oidsIniciales.getOidsNumeroDeSerie());
    this.impresora.setNumeroDeSerie(this.getVarbinds(varbinds, this.oidsIniciales.getOidNumeroDeSerie().toString()));

  }


  async etapaNivelesColor() {


    const varbinds = await this.snmpGet(this.oidsIniciales.getOidsColor());

    this.impresora.setColor(true);

    this.impresora.setCyan(await this.obtenerNivel(varbinds, this.oidsIniciales.getOidTonerLevelCyan(),
      this.oidsIniciales.getOidFullCapacityCyan()));

    this.impresora.setAmarillo(await this.obtenerNivel(varbinds, this.oidsIniciales.getOidTonerLevelAmarillo(),
      this.oidsIniciales.getOidFullCapacityAmarillo()));

    this.impresora.setMagenta(await this.obtenerNivel(varbinds, this.oidsIniciales.getOidTonerLevelMagenta(),
      this.oidsIniciales.getOidFullCapacityMagenta()));


  }

  /*
  *  Mejora realizada implantar en entorno real
  */
  async obtenerNivel(varbinds, oidActual, oidLleno) {

    const actual = this.getVarbinds(varbinds, oidActual);

    const lleno = this.getVarbinds(varbinds, oidLleno);

    return this.operaciones.getNivel(actual, lleno);
  }


  async obtenerDatosImpresora() {
    try {
      this.session = snmp.createSession(this.impresora.getIp(), this.clientOptions.community, this.clientOptions);

      /*
       Esta etapa es imprecindible para saber el modelo de impresora
       una vez sabemos el modelo de impresora, podemos adaptar las siguientes etapas
       a las particularidades de cada modelo    
       */

      await this.etapaObtenerModelo(); // Ejecuta la etapa de identificación

      await this.etapaContador();

      await this.etapaNivelesNegro(); // Ejecuta la etapa de datos negro

      /*
        hay que tratar de unir etapa datos negro y etapa dato numero de serie
        , sino lo he hecho anteriormete ver porque
      */

      await this.etapaNumeroDeSerie();

      await this.etapaNivelesColor(); // Ejecuta la etapa de datos color

    } catch (error) {
      //console.warn('No se pudo conectar con la impresora etapa ObtenerDatosImpresora:', error.message);
      /*
      * Es la manera de detectar impresora desconectada 
        por defecto la clase impresora el valor conectada 
        es siempre false, sólo se modifica si la etapa de 
        obtener modelo impresora se realiza con éxito
      */
    }
    finally {
      if (this.session) {
        this.session.close();
      }
    }

    return this.impresora;
  }

}