import { Impresora } from "../clases/Impresora";
import { IpModel } from "../models/IpModel";
import { RegistroModel } from "../models/RegistroService";
import { CapturaService } from "../services/CapturaService";
import { ConsultaImpresora } from "../services/ConsultaImpresora";


const consultaIP = async (ip: string) => {

    const captura = new ConsultaImpresora(new Impresora(ip, ''));
    const printer = await captura.obtenerDatosImpresora();
    return CapturaService.printerToInterfaceRegistro(printer);

}


const registraTodasIpsConectadas = () => {
    let listaImpresorasVacias: Impresora[];
    listaImpresorasVacias = IpModel.findAllPrinters() ?? [];
    for (let impresoraVacia of listaImpresorasVacias){
        let captura: ConsultaImpresora = new ConsultaImpresora(impresoraVacia);
        captura.setTimeout(5000);
        captura.setRetries(3);
        captura.obtenerDatosImpresora().then((printer: Impresora) => {
            
            let resultado = CapturaService.printerToInterfaceRegistro(printer);

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
            let resultado = CapturaService.printerToInterfaceRegistro(printer);
            RegistroModel.insertUpdateRegistro(resultado);
        });
    };
};



export { registraTodasIpsConectadas, registraTodasIps, consultaIP }