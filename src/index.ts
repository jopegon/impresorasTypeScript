import express, { Request, Response } from "express";


import path from "path";
import { LeeJSON } from "./models/LeeJSON";
import { Impresora } from "./clases/Impresora";
import { ConsultaImpresora } from "./ConsultaImpresora";

import { CadenasVistaImpresoras } from "./clases/CadenasVistaImpresoras";
import { CadenaHtml } from "./clases/CadenaHtmlTabla";
import { IpService } from "./services/IpService";

const app = express();

const PORT = 3000;

app.use(express.static('public'))

app.use('/js', express.static(path.join(__dirname, './node_modules/bootstrap/dist/js')));
app.use('/img', express.static(path.join(__dirname, './public/img')));
app.use('/css', express.static(path.join(__dirname, './public/css')));
app.use('/jss', express.static(path.join(__dirname, './public/js')));

app.use("/bootstrapCss",  express.static(path.join(process.cwd(), "./node_modules/bootstrap/dist/css/")));
app.use("/bootStrapJs",  express.static(path.join(process.cwd(), "./node_modules/bootstrap/dist/js/")));
// Printing current directory
//console.log("Current working directory: ", process.cwd());


app.use("/bootstrapCss",  express.static(path.join(process.cwd(), "./node_modules/bootstrap/dist/css/")));
app.use("/bootStrapJs",  express.static(path.join(process.cwd(), "./node_modules/bootstrap/dist/js/")));

app.set('views', path.join(__dirname, '../public/views'));

app.set('view engine', 'ejs');

app.get('/hola', (req, res) => {

  res.sendFile(path.join(app.get('views'), '/indexF.html'));

});


app.get("/test", (request: Request, response: Response) => {
  response.status(200).send("Hello Worldfa!!!!");
});

app.get("/leeJson", async (request: Request, response: Response) => {

  const leer: LeeJSON = new LeeJSON();
  leer.cargaArchivo();
  let impresoras: Impresora[] = [];
  let promesas: Promise<void>[] = [];

  impresoras = leer.getListaImpresoras();
  promesas = impresoras.map((impresora: Impresora) => {
    let pp = new ConsultaImpresora(impresora);

    return pp.obtenerDatosImpresora()
      .then((resultado: Impresora) => {
        response.write(resultado.toString());
      })
      .catch((error: Impresora) => {
        response.write(`No conecta ${error.getIp()} \n`);
      });
  });

  await Promise.all(promesas);
  response.end(); // Termina la respuesta después de completar todas las operaciones

});


app.get("/leeDB", async (request: Request, response: Response) => {


  let impresoras: Impresora[] = [];
  let promesas: Promise<void>[] = [];
  
  impresoras = IpService.findAllPrinters() || [];

  promesas = impresoras.map((impresora: Impresora) => {
    let pp = new ConsultaImpresora(impresora);

    return pp.obtenerDatosImpresora()
      .then((resultado: Impresora) => {
        response.write(resultado.toString());
      })
      .catch((error: Impresora) => {
        response.write(`No conecta ${error.getIp()} \n`);
      });
  });

  await Promise.all(promesas);

  response.end(); // Termina la respuesta después de completar todas las operaciones

});


// sendFile will go here
app.get('/', async (request: Request, response: Response) => {

  //const leer: LeeJSON = new LeeJSON();
  //leer.cargaArchivo();

  let pp: ConsultaImpresora = new ConsultaImpresora();

  let promesas: Promise<void>[] = [];

  let cadenasHtml = new CadenasVistaImpresoras();
  response.write(cadenasHtml.getEncabezado());

  //promesas = leer.getListaImpresoras().map(async (impresora: Impresora) => {

  promesas = IpService.findAllPrinters().map(async (impresora: Impresora) => {

    pp = new ConsultaImpresora(impresora);

    return pp.obtenerDatosImpresora().then((impExito) => {

      if(impExito.getConectada()){
        response.write(cadenasHtml.getImpresora(impExito));
      }else{
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
});


app.get("/lista", async (request: Request, response: Response) => {

  //const leer: LeeJSON = new LeeJSON();
  //leer.cargaArchivo();
  let pp: ConsultaImpresora = new ConsultaImpresora();

  let promesas: Promise<void>[] = [];

  let cadenasHtml = new CadenaHtml();

  

  response.write(cadenasHtml.getEncabezado());


  promesas = IpService.findAllPrinters().map(async (impresora: Impresora) => {

  //promesas = leer.getListaImpresoras().map(async (impresora: Impresora) => {

    pp = new ConsultaImpresora(impresora);

    return pp.obtenerDatosImpresora().then((impExito) => {

      if (impExito.getConectada() && (impExito.getNegro() <= 10)) {

        response.write(`  <tr class="table-danger"> <td>`);

      }
      else {

        if (impExito.getColor() && (impExito.getAmarillo() <= 10 || impExito.getCyan() <= 10 || impExito.getMagenta() <= 10)) {
          response.write(` <tr class="table-danger"> <td>`);
        }
        else {
          response.write(`  <tr> <td>`);
        }

      }
      response.write(`  ${impresora.getModelo()}</td>  <td><a href="http://${impresora.getIp()}" target="_blank">${impresora.getIp()}</a></td> <td> ${impresora.getNumeroDeSerie()} </td>  <td>${impresora.getLocalizacion()}</td>
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

});



app.get("/contador", async (request: Request, response:Response) => {

  //res.sendFile(path.join(__dirname, 'views/indexF.html'));
  response.render('contador', {});
});


app.listen(PORT, () => {
  console.log(`Server running at PORT, http://localhost:${PORT}`);

  /*
  const leer: LeeJSON = new LeeJSON();
  let pp: CapturaDatos = new CapturaDatos();
  leer.cargaArchivo();
  //leer.leeImpresoras();
  //let arrayImpresoras : Impresora[]=leer.getListaImpresoras();
  leer.getListaImpresoras().forEach(async (impresora: Impresora) => {
    pp = new CapturaDatos(impresora);

    
    pp.obtenerDatos().then((impExito)=>{
      //console.log(impExito.toString());
      
    })
    .catch((impError)=>{
      //console.log(`No conecta ${impError.toString()}`);
    });
    
  });
*/

});