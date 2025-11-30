import { Impresora } from "../clases/Impresora";
import { ConsultaImpresora } from "./ConsultaImpresora";
import { RegistroInterface } from "../models/RegistroInterface";
import { IpRepository } from "../repositories/IpRepository";
import { RegistroRepository } from "../repositories/RegistroRepository";


export class CapturaService {
    /*
    * Registra en la base de datos las impresoras que están en la tabla ips
    * Si grabarSoloConectadas es true solo graba las que se han podido conectar
    * Si grabarSoloConectadas es false graba todas las impresoras, aunque no se hayan podido conectar
    */
    static registrarIps(grabarSoloConectadas: boolean) {
        let listaImpresoras: Impresora[];
        listaImpresoras = IpRepository.findAllPrinters() ?? [];
        for (let impresora of listaImpresoras){
            let captura = new ConsultaImpresora(impresora);
            captura.setTimeout(2000)

            captura.obtenerDatosImpresora().then((printer: Impresora) => {
                let resultado: RegistroInterface;
                resultado = this.printerToInterfaceRegistro(printer);

                if (grabarSoloConectadas) {
                    if (resultado.conectada) {
                        RegistroRepository.insertUpdateRegistro(resultado);
                    }
                }

            });
        };
    };


    static printerToInterfaceRegistro (printer: Impresora): RegistroInterface  {
        const now = new Date();
        now.setMinutes(now.getMinutes() - now.getTimezoneOffset()); // Ajusta la diferencia de zona horaria
        //resultado.fecha = now.toISOString().split("T")[0]; 
        //resultado.hora = new Date().toLocaleTimeString() ;
        const resultado: RegistroInterface = {
            id: 0,
            fecha: now.toISOString().split("T")[0],
            hora: new Date().toLocaleTimeString(),
            ip: printer.getIp(),
            conectada: printer.getConectada(),
            numSerie: printer.getNumeroDeSerie().toString(),
            modelo: printer.getModelo().toString(),
            contador: printer.getContador(),
            negro: printer.getNegro(),
            color: printer.getColor(),
            cyan: printer.getCyan(),
            amarillo: printer.getAmarillo(),
            rojo: printer.getMagenta()
        }
        return resultado;

    }


}