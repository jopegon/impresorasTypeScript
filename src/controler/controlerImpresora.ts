import path from "node:path";
import { Impresora } from "../models/Impresora";
import { CadenaHtml } from "./CadenaHtmlTabla";
import { CadenasVistaImpresoras } from "./CadenasVistaImpresoras";
import { ConsultaImpresora } from "../services/ConsultaImpresora";
import { Request, RequestHandler, Response } from 'express';
import { IpModel } from "../models/IpModel";


export const saluda = async (req: Request, res: Response) => {
    try {
        res.status(200).write("Hello !!!!");
    } catch (error) {
        console.error('Error al consultar impresoras:', error);
        res.status(500).json({ error: 'Error interno del servidor al consultar impresoras.' });
    }
    finally {
        res.end();
    }
};

export const leeDB = async (req: Request, res: Response) => {

    try {
        let impresoras: Impresora[] = [];
        let promesas: Promise<void>[] = [];

        impresoras = IpModel.findAllPrinters() || [];

        promesas = impresoras.map((impresora: Impresora) => {
            const pp = new ConsultaImpresora(impresora);

            return pp.obtenerDatosImpresora()
                .then((resultado: Impresora) => {
                    res.write(resultado.toString());
                })
                .catch((error: Impresora) => {
                    res.write(`No conecta ${error.getIp()} \n`);
                });
        });

        await Promise.all(promesas);
        res.end(); // Termina la respuesta después de completar todas las operaciones
    } catch (error) {
        console.error('Error al consultar impresoras desde DB:', error);
        res.status(500).json({ error: 'Error interno del servidor al consultar impresoras desde DB.' });
    }
};

/*
* Muestra la información de las impresoras en formato HTML
* @param request - Objeto de solicitud HTTP
* @param response - Objeto de respuesta HTTP        
* 
* Es el punto de entrada para la ruta que muestra la información de las impresoras.
*/
export const muestraInfo = async (request: Request, response: Response) => {
    let pp: ConsultaImpresora = new ConsultaImpresora();

    let promesas: Promise<void>[] = [];

    const cadenasHtml: CadenasVistaImpresoras = new CadenasVistaImpresoras();
    response.write(cadenasHtml.getEncabezado());

    //promesas = leer.getListaImpresoras().map(async (impresora: Impresora) => {

    promesas = IpModel.findAllPrinters().map(async (impresora: Impresora) => {

        pp = new ConsultaImpresora(impresora);

        return pp.obtenerDatosImpresora().then((impExito) => {

            if (impExito.getConectada()) {
                response.write(cadenasHtml.getImpresora(impExito));
            } else {
                response.write(cadenasHtml.getImpresoraNoConecta(impExito));
            }

        })
            .catch((impError) => {
                response.write(`No conecta ${cadenasHtml.getImpresoraNoConecta(impError)}`);
            });

    });

    await Promise.all(promesas);

    response.write(cadenasHtml.getFinal());
    response.end(); // Termina la respuesta después de completar todas las operaciones
};

export const paginaInicio: RequestHandler = (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../../public/views", "/indexF.html"));
};


export const lista = async (request: Request, response: Response) => {

    let pp: ConsultaImpresora = new ConsultaImpresora();

    let promesas: Promise<void>[] = [];

    const cadenasHtml: CadenaHtml = new CadenaHtml();



    response.write(cadenasHtml.getEncabezado());


    promesas = IpModel.findAllPrinters().map(async (impresora: Impresora) => {

        //promesas = leer.getListaImpresoras().map(async (impresora: Impresora) => {

        pp = new ConsultaImpresora(impresora);

        return pp.obtenerDatosImpresora().then((impExito: Impresora) => {

            if (impExito.getConectada() && (impExito.getNegro() <= 10)) {

                response.write(`  <tr class="table-danger"> <td>`);

            }
            else if (impExito.getColor() && (impExito.getAmarillo() <= 10 || impExito.getCyan() <= 10 || impExito.getMagenta() <= 10)) {
                response.write(` <tr class="table-danger"> <td>`);
            }
            else {
                response.write(`  <tr> <td>`);
            }


            response.write(`  ${impresora.getModelo()}</td>  <td> <a href="http://${impresora.getIp()}" target="_blank">${impresora.getIp()}</a></td> <td> ${impresora.getNumeroDeSerie()} </td>  <td>${impresora.getLocalizacion()}</td>
        <td>${impresora.getConectadaSiNo()}</td>
    <td>${impresora.getNegro()} %</td>`);
            if (impresora.getColor()) {
                response.write(`    <td>${impresora.getCyan()} %</td> <td>${impresora.getAmarillo()} %</td> <td>${impresora.getMagenta()} %</td>  </tr>  `);
            } else {
                response.write('<td></td> <td></td> <td></td>  </tr> ');
            }

            response.write('');
        })
            .catch((impError) => {
                response.write(`No conecta ${impError.toString()}`);
            });

    });

    await Promise.all(promesas);

    response.write(`<script>
document.addEventListener("DOMContentLoaded", function() {
  var input = document.getElementById("myInput");
  var tableRows = document.querySelectorAll("#tabla tr");

  input.addEventListener("keyup", function() {
    var value = input.value.toLowerCase();

    tableRows.forEach(function(row) {
      var rowText = row.textContent.toLowerCase();
      if (rowText.indexOf(value) > -1) {
        row.style.display = "";
      } else {
        row.style.display = "none";
      }
    });
  });
});
</script>`);
    response.write(`</table>   <a class="m-2 **ms-auto** **d-block**" target="_blank" rel="noopener noreferrer" href="http://10.41.81.26:3500/records/help">help</a> </body> </html>`);
    response.end(); // Termina la respuesta después de completar todas las operaciones  
};


export const contador = async (request: Request, response: Response) => {
    response.render('contador', {});
}


export const contadores = async (request: Request, response: Response) => {

    const numeroGraficos: number = 3;
    response.render('contadores', { numeroGraficos: numeroGraficos });
}