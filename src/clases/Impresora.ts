export class Impresora {

  modelo: string = "";
  ip: string = "";
  numeroDeSerie: string="";
  localizacion: string = "";
  observaciones: string = "";

  negro: number = 0;

  magenta: number = 0;
  cyan: number = 0;
  amarillo: number = 0;

  color: boolean = false;
  conectada: boolean = false;
  contador: number=0;

  constructor(ip: string, localizacion: string) {
    this.ip = ip;
    this.localizacion = localizacion;
  }

  getConectadaSiNo(){
    let siNo="";
    if (this.conectada)
      siNo="Sí"
    else
      siNo="No"

    return siNo;
  }

  getColor() {
    return this.color;
  }

  setColor(color: boolean) {

    this.color = color;

  }

  getModelo():string {
    return this.modelo;
  }

  setModelo(modelo: string) {
    this.modelo = modelo;
  }

  getModeloPng() {
    const search = ' ';
    const replaceWith = '_';
    const model = this.getModelo().toString();
    let result = model.split(search).join(replaceWith);
    return "/img/" + result + ".png";
  }


  getModeloJpg() {
    const search = ' ';
    const replaceWith = '_';
    const model = this.getModelo().toString();
    let result = model.split(search).join(replaceWith);
    return "/img/" + result + ".jpg";
  }

  getIp(): string {
    return this.ip;
  }

  setIp(ip: string) {
    this.ip = ip;
  }

  getNumeroDeSerie(): string{
    return this.numeroDeSerie;
  }

  setNumeroDeSerie(numeroDeSerie: string){
    this.numeroDeSerie=numeroDeSerie;
  }
  


  getLocalizacion(): string {
    return this.localizacion;
  }

  setLocalizacion(localizacion: string) {
    this.localizacion = localizacion;
  }

  getObservaciones() {
    return this.observaciones;
  }

  setObservaciones(observaciones: string) {
    this.observaciones = observaciones;
  }

  getNegro() {
    return this.negro;
  }

  setNegro(negro: number) {
    this.negro = negro;
  }


  getMagenta() {
    return this.magenta;
  }

  setMagenta(magenta: number) {
    this.magenta = magenta;
  }

  getCyan() {
    return this.cyan;
  }

  setCyan(cyan: number) {
    this.cyan = cyan;
  }

  getAmarillo() {
    return this.amarillo;
  }

  setAmarillo(amarillo: number) {
    this.amarillo = amarillo;
  }

  getAmarilloFull() {
    return this.amarillo;
  }


  getConectada() {
    return this.conectada;
  }

  setConectada(conectada: boolean) {
    this.conectada = conectada;
  }

  setContador(contador:number){
    this.contador=contador;
  }

  getContador(){
    return this.contador;
  }
 
  toString(): string {
    let cadena:string;
    cadena=`Modelo: ${this.modelo} s/n ${this.numeroDeSerie} IP: ${this.ip} Localización: ${this.localizacion} Contador ${this.contador} Observaciones: ${this.observaciones} Tinta Negra: ${this.getNegro()} %  Color: ${this.color} Conectada: ${this.conectada} `;
    if (this.getColor()){
      cadena+= `Tinta Magenta: ${this.getMagenta()} Tinta Cyan: ${this.getCyan()} Tinta Amarilla: ${this.getAmarillo()}`;
    }
    return cadena+` \n`;
  }

  toStringColor(): string {
    return `Modelo: ${this.modelo} IP: ${this.ip} Localización: ${this.localizacion} Observaciones: ${this.observaciones} Tinta Negra: ${this.negro} Tinta Magenta: ${this.magenta} Tinta Cyan: ${this.cyan} Tinta Amarilla: ${this.amarillo} Color: ${this.color} Conectada: ${this.conectada}`;
  }
}

