import { Impresora } from "../clases/Impresora";
import { IpModel } from "../models/IpModel";
import { RegistroInterface } from "../models/RegistroInterface";
import { RegistroModel } from "../models/RegistroService";
import { ConsultaImpresora } from "../services/ConsultaImpresora";


const consultaIP = async (ip: string) => {

    const captura = new ConsultaImpresora(new Impresora(ip, ''));
    const printer = await captura.obtenerDatosImpresora();
    return printerToInterfaceRegistro(printer);

}


const registraTodasIpsConectadas = () => {
    let listaImpresorasVacias: Impresora[];
    listaImpresorasVacias = IpModel.findAllPrinters() ?? [];
    for (let impresoraVacia of listaImpresorasVacias){
        let captura: ConsultaImpresora = new ConsultaImpresora(impresoraVacia);
        captura.setTimeout(5000);
        captura.setRetries(3);
        captura.obtenerDatosImpresora().then((printer: Impresora) => {
            
            let resultado = printerToInterfaceRegistro(printer);

            if (resultado.conectada) {
                RegistroModel.insertUpdateRegistro(resultado);
            }
        });        
    }
};


const registraTodasIps = () => {
    let listaImpresorasVacias: Impresora[];
    listaImpresorasVacias = IpModel.findAllPrinters() ?? [];

    for (let impresoraVacia of listaImpresorasVacias){
        let captura = new ConsultaImpresora(impresoraVacia);
        captura.setTimeout(5000);
        captura.setRetries(3);
        captura.obtenerDatosImpresora().then((printer: Impresora) => {
            let resultado = printerToInterfaceRegistro(printer);
            RegistroModel.insertUpdateRegistro(resultado);
        });
    };
};

const printerToInterfaceRegistro = (printer: Impresora) => {
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


export { registraTodasIpsConectadas, registraTodasIps, consultaIP }