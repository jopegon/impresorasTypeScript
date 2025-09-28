import { Impresora } from "../clases/Impresora";

import fs from 'fs';


export class LeeJSON {

    rutaArchivo :string='';
    rawdata: Buffer = Buffer.alloc(0);   // Contiene texto en crudo del archivo JSON leido
    arrayImpresoras : Impresora[]=[]; // Array con datos del JSON cargado


    constructor() {
        this.rutaArchivo = 'impresoras.json'; 
    }

    //  Devuelve un array con datos iniciales de las impresoras almacenados en JSON
    // datos de JSON son ip y localización
    cargaArchivo(){
        try{
            // Carga el archivo JSON
            this.rawdata = fs.readFileSync(this.rutaArchivo);
            // Parsea el JSON y lo mete en un array
            this.arrayImpresoras = JSON.parse(this.rawdata.toString());             
        }catch(error){
            throw error;
        }
    }

    getListaImpresoras() {
        this.cargaArchivo();
        let listaImpresoras : Impresora []=[];
        this.arrayImpresoras.forEach( (impresora : Impresora) => {
            listaImpresoras.push(new Impresora(impresora.ip, impresora.localizacion));
            //console.log(`  ${impresora.ip}     ${impresora.localizacion}  `);
        });
        return listaImpresoras;
    }

    getRutaArchivo(){
        return this.rutaArchivo;
    }

    leeImpresoras() {
        this.cargaArchivo();
        this.arrayImpresoras.forEach( (impresora) => {
            console.log(`  ${impresora.ip}     ${impresora.localizacion}  `);
        });
    }
}