"use strict";

const columnaFecha = 0;
const columnaIp = 1;
const columnaLocalizacion = 2;
const columnaImpresiones = 3;

const rutaFichero = "/jss/resultados.csv";
const objSelector = document.getElementById("nDias");

let ctx1 = document.getElementById('line-chart1');
let ctx2 = document.getElementById('line-chart2');
let ctx3 = document.getElementById('line-chart3');
let ctx4 = document.getElementById('line-chart4');

let grafico01, grafico02,grafico03,grafico04;
  
objSelector.addEventListener("change",()=>{

    leeCsv()
    .then(content => procesaThen(content))
    .catch(error => {
        console.error(error);
    });
    //objSelector.style.display="none";
});

const leeCsv = () => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (e) => {
            const content = e.target.result;
            resolve(content);
        };

        reader.onerror = (e) => {
            reject(new Error('Error al leer el archivo.'));
        };

        // Usa fetch para obtener el archivo como un blob
        fetch(rutaFichero)
            .then(response => response.blob())
            .then(blob => reader.readAsText(blob));
    });
}


const procesaGrafico = (grafico, ctx, listaRegistros, mitadArray) => {
    
    // Necesita una nueva instancia cada vez
    // existe la opción de update pero creo una nueva ...
    if (grafico) {
        grafico.destroy();
    }

    grafico = new Chart(ctx, {
        type: 'line',
        data: devuelveData(listaRegistros, mitadArray),
        options: {
            title: {
                display: true,
                text: 'Impresiones realizadas'
            }
        }
    });

    return grafico;
};
        
 

const procesaThen = (content) => {

    let listaRegistros = devuelveArrayRegistros(content);
    let setIps = setColumnaSinBlancos(listaRegistros, columnaIp);
    let listaIps = [...setIps];
    let mitad1Array = listaIps.slice(0, listaIps.length / 4);
    let mitad2Array = listaIps.slice((listaIps.length / 4), (listaIps.length / 4) * 2)
    let mitad3Array = listaIps.slice((listaIps.length / 4) * 2, (listaIps.length / 4) * 3);
    let mitad4Array = listaIps.slice((listaIps.length / 4) * 3, listaIps.length)


    grafico01 = procesaGrafico (grafico01, ctx1, listaRegistros, mitad1Array) ;

    grafico02 = procesaGrafico (grafico02, ctx2, listaRegistros, mitad2Array) ;

    grafico03 = procesaGrafico (grafico03, ctx3, listaRegistros, mitad3Array) ;

    grafico04 = procesaGrafico (grafico04, ctx4, listaRegistros, mitad4Array) ;
}


// Ruta predeterminada del archivo CSV
leeCsv()
    .then(content => procesaThen(content))
    .catch(error => {
        console.error(error);
    });


const setColumna = (listaRegistros, col) => {

    let setRegistros = new Set();
    listaRegistros.forEach(registro => {
        setRegistros.add(registro[col]);
    });
    return setRegistros;
}


const setColumnaSinBlancos = (listaRegistros, col) => {

    let setRegistros = new Set();
    listaRegistros.forEach(registro => {
        setRegistros.add(registro[col].trim());
    });
    return setRegistros;
}

/*
*  Calcula las impresiones del día restando las impresiones
*  del día anterior, si no se tienen datos del día anterior ...
*/
const operaTotales = (listaValores, ip) => {

    // Para que copie valores, no dirección de memoria
    let listaDuplica = Array.from(listaValores);;

    listaValores.forEach((valor, index) => {

        // Resta todos menos el último día
        if ((index + 1) < (listaValores.length)) {
            if ((listaValores[index + 1] === undefined) && (listaValores[index] !== undefined)) {              
                listaValores[index + 1] = listaValores[index];
            }
            listaValores[index] = listaValores[index + 1] - listaValores[index];
        }

    });

    // Control de undefined
    for (let i = 0; i < listaDuplica.length; i++) {
        if ((listaDuplica[i] === undefined) && (i !== 0)) {

            listaValores[i - 1] = undefined;
        }
    }

    // Elimino el valor del último día, no puedo restar al día siguiente
    listaValores.pop();

    return listaValores;
}

/*
* Filtra todos los valores de una ip determinada
*/
const arrayTotalesPorIp = (array, ip) => {

    var listaValores = [];

    array.forEach((element, index) => {

        if (element[columnaIp].trim() === ip) {
            if (element[columnaImpresiones].length === 0) {
                listaValores.push(undefined);
            } else {
                listaValores.push(Number(element[columnaImpresiones]));
            }
        }
    });

    let setFechas = setColumnaSinBlancos(array, columnaFecha);
    let numeroDeDias = document.getElementById('nDias').value;
    //console.log(setFechas);
    //console.log(setFechas.size);

    // Control de tamaño array y días solicitados
    if (setFechas.size > Math.abs(numeroDeDias) ){
        if (listaValores.length < Math.abs(numeroDeDias) ){

            // Relleno array por la izquierda para que salga el valor 
            // de la gráfica en el lado derecho                 
            for (let i =0 ; i<31; i++){
             listaValores.unshift(undefined);
            }
            
        }
    }
    



    listaValores = listaValores.slice((numeroDeDias - 1), listaValores.length);
    listaValores = operaTotales(listaValores, ip);


    // Numero de días es un número negativo que captura dias
    // desde la parte de detras del array
    return listaValores;
}

const randomColor = () => {
    let cadena;
    cadena = Math.floor(Math.random() * 16777215).toString(16);

    while (cadena.length !== 6){
        cadena = '0' + cadena
    };

    return "#" + cadena;
};

const devuelveArrayRegistros = (content) => {
    let lines = content.replace(/\r/g, '').split('\n');
    let listaRegistros = [];
    lines.forEach(line => {

        if (line.length > 0) {
            listaRegistros.push(line.split(','));
        }

    });
    return listaRegistros;
}

const devuelveDataSet = (registros, ip) => {

    let dataSet = {
        data: arrayTotalesPorIp(registros, ip),
        label: ip,
        fill: false,
        borderColor: randomColor(),
        tension: 0.4
    };

    return dataSet;
}

const devuelveArrayDataSets = (arrayRegistros, setIps, setLocalizaciones) => {

    let dataSets = [];
    setIps.forEach(ip => {
        dataSets.push(devuelveDataSet(arrayRegistros, ip));
    });

    return dataSets;
}

const devuelveData = (arrayRegistros, listaIps) => {

    let numeroDeDias = document.getElementById('nDias').value;

    var setFechas, setIps, setLocalizaciones = new Set();

    //let arrayRegistros = devuelveArrayRegistros(content);

    setIps = setColumnaSinBlancos(arrayRegistros, columnaIp);

    setLocalizaciones = setColumna(arrayRegistros, columnaLocalizacion);

    setFechas = setColumnaSinBlancos(arrayRegistros, columnaFecha);

    let arrayFechas = [...setFechas].slice(1, [...setFechas].length);

    arrayFechas = arrayFechas.slice(numeroDeDias, arrayFechas.length)


    let data = {
        labels: arrayFechas,
        datasets: devuelveArrayDataSets(arrayRegistros, listaIps, setLocalizaciones)
    };

    return data;
}


