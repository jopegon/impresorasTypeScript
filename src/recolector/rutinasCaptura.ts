import { Impresora } from "../clases/Impresora";
import { InterfaceIp } from "../models/IpModel";
import { RegistroInterface } from "../models/RegistroModel";
import { ConsultaImpresora } from "../services/ConsultaImpresora";
import { IpService } from "../services/IpService";
import { RegistroService } from "../services/RegistroService";



const consultaIP = async (ip: string) => {

  const captura = new ConsultaImpresora(new Impresora(ip, ''));
  const printer = await captura.obtenerDatosImpresora();
  return printerToInterfaceRegistro(printer);

}


const registraTodasIpsConectadas = () => {
    let listaImpresorasVacias: Impresora[];
    listaImpresorasVacias = IpService.findAllPrinters() ?? [];
    listaImpresorasVacias.forEach((impresoraVacia) => {
        let captura = new ConsultaImpresora(impresoraVacia);
        //listaPromesas.push(captura.obtenerDatos()); 
        captura.obtenerDatosImpresora().then((printer: Impresora) => {
            let resultado = printerToInterfaceRegistro(printer);
            //console.log(`Conectada=${resultado.conectada}  ${resultado.modelo}  ${resultado.negro}`);

            //console.log(`${resultado.fecha}  y ${resultado.hora}`);
            if (resultado.conectada) {
                RegistroService.insertUpdateRegistro(resultado);
            }
        });
    });
};


const registraTodasIps = () => {
    let listaImpresorasVacias: Impresora[];
    listaImpresorasVacias = IpService.findAllPrinters() ?? [];
    listaImpresorasVacias.forEach((impresoraVacia) => {
        let captura = new ConsultaImpresora(impresoraVacia);
        //listaPromesas.push(captura.obtenerDatos()); 
        captura.obtenerDatosImpresora().then((printer: Impresora) => {
            let resultado = printerToInterfaceRegistro(printer);
            //console.log(`Conectada=${resultado.conectada}  ${resultado.modelo}  ${resultado.negro}`);
            RegistroService.insertUpdateRegistro(resultado);
        });
    });
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