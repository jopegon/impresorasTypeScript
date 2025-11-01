
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



const generaChart = (chartData, arrayColores, canvasName, leyendaX, leyendaY) => {

    const dataElement = document.getElementById(chartData);
    let datasets;

    try {
        
        // obtiene el contenido de texto de ese elemento y de todos sus descendientes
        datasets = JSON.parse(dataElement.textContent);
    } catch (e) {
        console.error('Error al parsear datasets:', e);
        datasets = [];
    }

    if (!Array.isArray(datasets)) {
        console.error('datasets no es un array:', datasets);
        datasets = [];
    }

    const chartDatasets = datasets.map((dataset, index) => ({
        label: dataset.label,
        data: dataset.data,
        borderColor: arrayColores[index % arrayColores.length],
        backgroundColor: arrayColores[index % arrayColores.length].replace('rgb', 'rgba').replace(')', ', 0.1)'),
        borderWidth: 2,
        fill: false,
        tension: 0.4,
        pointRadius: 2,
        pointHoverRadius: 4
    }));


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



}




const generaSubChart = (chartData, arrayColores, canvasName, leyendaX, leyendaY) => {


    let datasets=chartData;
    //console.log('canvasName:',canvasName);

    const chartDatasets = datasets.map((dataset, index) => ({
        label: dataset.label,
        data: dataset.data,
        borderColor: arrayColores[index % arrayColores.length],
        backgroundColor: arrayColores[index % arrayColores.length].replace('rgb', 'rgba').replace(')', ', 0.1)'),
        borderWidth: 2,
        fill: false,
        tension: 0.4,
        pointRadius: 2,
        pointHoverRadius: 4
    }));


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



}