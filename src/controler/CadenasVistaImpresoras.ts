import { puerto } from "..";
import { Impresora } from "../clases/Impresora";
import { getLocalIP } from "../server/server";


export class CadenasVistaImpresoras {

  claseDivImpresoraIndividual!: string;

  constructor() {
    this.claseDivImpresoraIndividual = "d-flex flex-column align-items-center justify-content-center m-3 card";
  }

  getFondo(impresora: Impresora): string {

    let cadena: string = "";


    if (impresora.getNegro() <= 10) {
      cadena = 'fondoRojo'
    }
    else {
      cadena = 'fondoBlanco'
    }
    if (!impresora.getConectada()) {
      cadena = 'fondoGris'
    }

    // Necesario porque sino los indicador colores son 0 en bn, no funciona correctamente
    if (impresora.getColor()) {
      if (impresora.getMagenta() <= 10 || impresora.getCyan() <= 10 || impresora.getAmarillo() <= 10) {
        cadena = 'fondoRojo'
      }
    }
    return cadena;
  }


  getBarrasPorcentajeColor(impresora: Impresora): string {
    let cadena: string = '';
    if (impresora.getColor()) {
      cadena = `
    
      <div title="Magenta ${impresora.getMagenta()} %" class="progress m-2 text-center" style="width: 70px; position: relative">
        <div  class="progress-bar overflow-visible" style="width: ${impresora.getMagenta()}%; z-index: 1; background-color: red"></div>
        <p class="position-absolute top-50 start-50 translate-middle" style="z-index: 2">
          ${impresora.getMagenta()} %
        </p>
      </div>
      <div title="Amarillo ${impresora.getAmarillo()} %" class="progress m-2 text-center" style="width: 70px; position: relative">
        <div  class="progress-bar overflow-visible" style="width: ${impresora.getAmarillo()}%; z-index: 1; background-color: yellow"
        ></div>
        <p class="position-absolute top-50 start-50 translate-middle" style="z-index: 2">
          ${impresora.getAmarillo()} %
        </p>
      </div>

      <div title="Cyan ${impresora.getCyan()} %" class="progress m-2 text-center" style="width: 70px; position: relative">
        <div  class="progress-bar overflow-visible" style="width:  ${impresora.getCyan()}%; z-index: 1; background-color: cyan">
        </div>
        <p class="position-absolute top-50 start-50 translate-middle" style="z-index: 2">
           ${impresora.getCyan()} %
        </p>
      </div>`;
    }

    return cadena;
  }


  getBarraPorcentajeNegro(impresora: Impresora): string {
    let cadena: string = "";

    cadena = `
    <div title="Negro ${impresora.getNegro()} %" class="progress m-2 text-center" style="width: 70px; position: relative">
      <div  class="progress-bar overflow-visible" style="width: ${impresora.getNegro()}%; z-index: 1; background-color: black"></div>
        <p class="position-absolute top-50 start-50 translate-middle text-primary" style="z-index: 2">
          ${impresora.getNegro()} %
        </p>
    </div>
    `

    return cadena;
  }


  getImpresoraNoConecta(impresora: Impresora): string {
    return `
    <div class="${this.claseDivImpresoraIndividual} ${this.getFondo(impresora)}">
      <a class="text-center" href="http://${impresora.getIp()}" target="_blank">${impresora.getIp()}</a>
      <p class="text-center m-2">Sin conexión</p>
      <p class="text-center">${impresora.getLocalizacion()}</p>
      <a class="text-center" href="http://${getLocalIP()}:${puerto}/chart/chartIp/${impresora.getIp()}/30" target="_blank"><i class="bi bi-graph-up"></i></a>
      
    </div>
    `;
  }

  getImpresora(impresora: Impresora): string {

    let cadena: string;


    cadena = `
      <div class="${this.claseDivImpresoraIndividual} ${this.getFondo(impresora)} impresoraColor${impresora.getColor()}">
        <img class="mt-2" src="/img/${impresora.getModelo()}.png" alt="${impresora.getModelo()}" width="150" height="150"/>
        <a class="text-center" href="http://${impresora.getIp()}" target="_blank">${impresora.getIp()}</a>
        <a class="text-center" href="http://${getLocalIP()}:${puerto}/chart/chartIp/${impresora.getIp()}" target="_blank">grafico}</a>
        <p class="text-center IdentificadorModelo">${impresora.getModelo()}</p>
        <p class="text-center">${impresora.getLocalizacion()}</p>
        <p class="text-center">Número de serie: ${impresora.getNumeroDeSerie()}</p>
        <div class="d-flex justify-content-center bg-highlight">

          ${this.getBarraPorcentajeNegro(impresora)}
          ${this.getBarrasPorcentajeColor(impresora)}

        </div>
      </div>
      `;


    return cadena;
  }


  getEncabezado(): string {
    return `<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <title>Nivel tóner</title>   

    <link rel="stylesheet" href="/bootstrapCss/bootstrap.min.css" />

    <link rel="stylesheet" href="/bootStrapIcons/bootstrap-icons.css" />

    <script src="/bootStrapJs/bootstrap.js"></script> 
    
    <link rel="stylesheet" href="/css/vistaImpresoras.css" />
   
  </head>

  <body>
    <div class="d-flex flex-wrap d-none sticky-top fondoGris justify-content-center" id="panelSelectores">
      <p class="m-2"> Localización </p>
      <select id="selectorIp" class="m-2">
          <option value=""></option>
          <option value="10.41.8">Delicias</option>
          <option value="10.40.113.">Parquesol</option>  
          <option value="10.41.97.">Jefatura</option>
          <option value="10.41.65.">Medina</option>
          <option value="10.41.113.">Fray Luis de Granada</option>
          <option value="10.63.32.">Unidad adscrita</option>
          <option value="10.40.65.">Brigada móvil</option>
          <option value="10.41.66.">Guías Caninos</option>
      </select>

      <p class="m-2"> Modelo </p>
      <select id="selectorModelo" class="m-2">
      </select>


      <p class="m-2"> Estado </p>
      <select id="selectorEstado" class="m-2">
          <option value="card"></option>
          <option value="fondoRojo">Toner bajo</option>
          <option value="fondoGris">Sin conexión</option>  
          <option value="fondoBlanco">Ok</option>
      </select>

      <p class="m-2"> Color </p>
      <select id="selectorColor" class="m-2">
          <option value="card"></option>
          <option value="impresoraColortrue">Color</option>
          <option value="impresoraColorfalse">B/N</option>
      </select>

      <a  target="_blank" href="http://${getLocalIP()}:${puerto}/records/help">__</a>
       <p class="m-2" id="elementosListados"></p>

       


    </div>

    <div class="d-flex flex-wrap bd-highlight p-1 justify-content-center">
    ` ;
  }


  getFinal(): string {
    return `    

    </div>

    <script src="/jss/script.js"></script>
  </body>
</html>
`;
  }

}


