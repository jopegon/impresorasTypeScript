
let selectorIP = document.getElementById("selectorIp");

let selectorModelo = document.getElementById("selectorModelo");

let selectorColor = document.getElementById("selectorColor");

let selectorEstado = document.getElementById("selectorEstado");

let panelSelectores =  document.getElementById("panelSelectores");

let listaSeleccionada = [];

//Necesario para mostrar panel de selectes cuando se han obtenido datos de todas las impresoras
panelSelectores.classList.remove("d-none")

selectorIP.addEventListener("change", (event) => {
    filtra();
});

selectorEstado.addEventListener("change", (event) => {
    filtra();
});

selectorColor.addEventListener("change", (event) => {
    filtra();
});

selectorModelo.addEventListener("change", (event) => {
    filtra();
});


// Atajo de teclado Ctrl+b para ver impresoras con toner bajo
document.addEventListener('keydown', (event) =>{
    if(event.ctrlKey && event.key === 'b'){
        event.preventDefault();  // Previene la acción predeterminada del navegador
        const selector = document.getElementById("selectorEstado");
        if (selector){
            selector.value='fondoRojo';
            const eventNuevo = new Event('change');
            selector.dispatchEvent(eventNuevo);            
        }else{
            console.log('No se ha encontrado el select de Estado');
        }
    }
});


// Atajo de teclado Ctrl+s muestra impresoras sin conexion
document.addEventListener('keydown', (event) =>{
    if(event.ctrlKey && event.key === 's'){
        event.preventDefault();  // Previene la acción predeterminada del navegador
        const selector = document.getElementById("selectorEstado");
        if (selector){
            selector.value='fondoGris';
            const eventNuevo = new Event('change');
            selector.dispatchEvent(eventNuevo);            
        }else{
            console.log('No se ha encontrado el select de Estado');
        }

    }
});

// Atajo de teclado Ctrl+k muestra impresoras con conexión ok
document.addEventListener('keydown', (event) =>{
    if(event.ctrlKey  && event.key === 'k'){
        event.preventDefault();  // Previene la acción predeterminada del navegador
        const selector = document.getElementById("selectorEstado");
        if (selector){
            selector.value='fondoBlanco';
            const eventNuevo = new Event('change');
            selector.dispatchEvent(eventNuevo);            
        }else{
            console.log('No se ha encontrado el select de Estado');
        }

    }
});


// Atajo de teclado Ctrl+' ' muestra todas las impresoras 
document.addEventListener('keydown', (event) =>{
    if(event.ctrlKey  && event.key === ' '){
        event.preventDefault();  // Previene la acción predeterminada del navegador
        const selector = document.getElementById("selectorEstado");
        if (selector){
            selector.value='card';
            const eventNuevo = new Event('change');
            selector.dispatchEvent(eventNuevo);            
        }else{
            console.log('No se ha encontrado el select de Estado');
        }

    }
});

/*
 He creado la clase css IdentificadorModelo para capturar todos los 
 modelos de las impresoras y utilizarlos en el select de modelos
 */
let listaTarjetas = document.getElementsByClassName("IdentificadorModelo");

let mapaModelos = new Set();
Array.from(listaTarjetas).map((elemento) => {
    mapaModelos.add(elemento.innerText)
});
selectorModelo.add(new Option("", ""));

[...mapaModelos].sort().map((elemento)=>{
    selectorModelo.add(new Option(elemento, elemento));
});

document.getElementById("elementosListados").innerHTML= `Número de impresoras ${document.getElementsByClassName("card").length}`;

const filtra = () => {
    let listaCondiciones = [];
    listaCondiciones.push(selectorIP.value, selectorEstado.value, selectorColor.value, selectorModelo.value)
    let contador=0;
    let elementos = document.getElementsByClassName('card');

    Array.from(elementos).map((elemento) => {
    
        /*
        Necesario para resetear las cosultas anteriores, en la consulta
        actual si no cumple condiciones lo oculta
        */ 
        elemento.classList.add("d-none")

        let correcto=true; 
        listaCondiciones.map((value,index)=>{
            if (index==0){
                if (!elemento.getElementsByTagName('a')[0].outerHTML.includes(value)){
                    correcto=false;
                }
            }else if (!elemento.outerHTML.includes(value)){
                correcto=false;
            }
        });
        if (correcto){
            elemento.classList.remove("d-none")
            ++contador;            
        }
    });
   document.getElementById("elementosListados").innerHTML= `Número de impresoras ${contador}`;
}