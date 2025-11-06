
const colors_8 = [
    'rgb(255, 99, 132)',
    'rgb(54, 162, 235)',
    'rgb(255, 206, 86)',
    'rgb(75, 192, 192)',
    'rgb(153, 102, 255)',
    'rgb(255, 159, 64)',
    'rgb(201, 203, 207)',
    'rgb(83, 102, 255)'
];


const colorsNivelToner = [
    'rgb(0, 0, 0)',             //negro
    'rgb(0, 255, 255)',         //cyan
    'rgb(255, 0, 0)',         //rojo
    'rgb(255, 255, 0)'          //amarillo
];





/**
 * Crea un gráfico de línea (Chart.js) a partir de datos obtenidos del DOM o de un array.
 * @param {string | Object[]} chartDataOrId - El ID del elemento DOM que contiene los datos (como string JSON) O el array de datasets.
 * @param {string[]} arrayColores - Array de colores RGB para las líneas.
 * @param {string} canvasName - El ID del elemento canvas donde se dibujará el gráfico.
 * @param {string} leyendaX - Título del eje X.
 * @param {string} leyendaY - Título del eje Y.
 * @returns {Chart} El objeto Chart.js creado.
 */
const crearChart = (chartDataOrId, arrayColores, canvasName, leyendaX, leyendaY) => {

    let datasets;

    // 1. Lógica unificada para OBTENER los datasets
    if (typeof chartDataOrId === 'string') {
        // Caso 'generaChart': Se pasó un ID del DOM
        const dataElement = document.getElementById(chartDataOrId);
        
        try {
            // Intenta parsear el contenido de texto del elemento
            datasets = dataElement ? JSON.parse(dataElement.textContent) : [];
        } catch (e) {
            console.error('Error al parsear datasets del DOM:', e);
            datasets = [];
        }
    } else if (Array.isArray(chartDataOrId)) {
        // Caso 'generaSubChart': Se pasó directamente el array de datasets
        datasets = chartDataOrId;
    } else {
        console.error('El primer argumento debe ser un ID de elemento (string) o un array de datos.', chartDataOrId);
        datasets = [];
    }

    // 2. Validación de que 'datasets' es un array
    if (!Array.isArray(datasets)) {
        console.error('Los datasets finales no son un array:', datasets);
        datasets = [];
    }
    
    // Si no hay datasets, se puede salir o generar un gráfico vacío (elegimos salir para evitar errores)
    if (datasets.length === 0) {
        // Retorna null si no hay datos válidos y no se dibuja el gráfico.
        return null; 
    }

    // 3. Lógica compartida para TRANSFORMAR y CONFIGURAR los datasets
    const chartDatasets = datasets.map((dataset, index) => ({
        label: dataset.label,
        data: dataset.data,
        // Aplica el color de forma modular
        borderColor: arrayColores[index % arrayColores.length],
        // Genera el color de fondo semi-transparente
        backgroundColor: arrayColores[index % arrayColores.length].replace('rgb', 'rgba').replace(')', ', 0.1)'),
        borderWidth: 2,
        fill: false,
        tension: 0.4,
        pointRadius: 2,
        pointHoverRadius: 4
    }));

    // 4. Lógica compartida para CREAR y DEVOLVER el Chart
    const ctx = document.getElementById(canvasName).getContext('2d');
    
    return new Chart(ctx, {
        type: 'line',
        data: {
            datasets: chartDatasets
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false,
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        title: function (context) {
                            const fecha = new Date(context[0].parsed.x);
                            return 'Fecha: ' + fecha.toLocaleDateString('es-ES', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric'
                            });
                        },
                        label: function (context) {
                            return context.dataset.label + ': ' + context.parsed.y;
                        }
                    }
                }
            },
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'day',
                        displayFormats: {
                            day: 'dd/MM/yyyy'
                        },
                        tooltipFormat: 'dd/MM/yyyy'
                    },
                    title: {
                        display: true,
                        text: leyendaX
                    }
                },
                y: {
                    beginAtZero: false,
                    title: {
                        display: true,
                        text: leyendaY
                    }
                }
            }
        }
    });
};