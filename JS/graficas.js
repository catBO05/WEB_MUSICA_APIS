// GRAFICO
document.addEventListener('DOMContentLoaded', function() {
    const ctx = document.getElementById('generosChart').getContext('2d');
    
    const generosChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Pop', 'Reggaetón', 'Hip Hop', 'Electrónica', 'Otros'],
            datasets: [{
                label: 'Preferencias de Género',
                data: [37, 27, 18, 13, 7],
                backgroundColor: [
                    '#E1FF2D',
                    '#93BD57',
                    '#48B3AF',
                    '#4635B1',
                    '#FFFDE1'
                ],
                borderWidth: 0,
                hoverOffset: 25,
            }]
        },
        options: {
            responsive: true,
            layout: {
                padding: 14
            },
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'left',
                    labels: {
                        color: '#ffffff',
                        font: {
                            family: 'Manrope',
                            size: 16
                        },
                        padding: 20
                    }
                },
            },
            cutout: '50%'
        }
    });
});





// PODCAST GRAFICO
document.addEventListener('DOMContentLoaded', function() {
    const ctx = document.getElementById('podcastChart').getContext('2d');
    
    const generosChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Misterio', 'Entretenimiento', 'Entrevistas', 'Documentales', 'Otros'],
            datasets: [{
                label: 'Preferencias de podcast',
                data: [17, 12, 8, 5, 2],
                backgroundColor: [
                    '#E1FF2D',
                    '#93BD57',
                    '#48B3AF',
                    '#4635B1',
                    '#FFFDE1'
                ],
                borderWidth: 0,
                hoverOffset: 25,
            }]
        },
        options: {
            responsive: true,
            layout: {
                padding: 14
            },
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'left',
                    labels: {
                        color: '#ffffff',
                        font: {
                            family: 'Manrope',
                            size: 16
                        },
                        padding: 20
                    }
                },
            },
            cutout: '50%'
        }
    });
});