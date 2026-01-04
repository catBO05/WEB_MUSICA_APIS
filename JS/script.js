//INDEX (HTML)
const container = document.querySelector('.cont');
const registerbtn = document.querySelector('.register-boton');
const loginbtn = document.querySelector('.login-boton');

if (container && registerbtn && loginbtn) {
    registerbtn.addEventListener('click', () => {
        container.classList.add('active');
    });

    loginbtn.addEventListener('click', () => {
        container.classList.remove('active');
    });
}


// MENU RESPONSIVE
$(document).ready(function () {
    $("#menu-toggle").on("click", function () {
        $("#nav-links").toggleClass("active");
    });

    $("#nav-links a").on("click", function () {
        $("#nav-links").removeClass("active");
    });
});


// SCROLL - Cambio de tamaños (jQuery)
function shrinkHeader() {
    "use strict";
    var scroll = $(window).scrollTop();
    var threshold = $(window).height() / 2;
    if (scroll > threshold) {
        $("nav").css({
            "height": "12vh",
            "width": "100%",
            "align-items": "center",
            "flex-direction": "row",
            "justify-content": "space-between",
            "gap": "0rem",
            "background-color": "#6b6b6b4f",
        });
        $("nav a img").css({
            "width": "40%",
            "height": "40%",
        });
        $("nav ul").css({
            "flex-direction": "row",
            "gap": "1rem",
            "align-items": "none",
        });
        $(".linea-titulo").css("flex-direction", "row");
        $(".linea-hrz::after").css("right", "-8px");
    } else {
         $("nav").css({
            "height": "100vh",
            "width": "20%",
            "align-items": "flex-start",
            "flex-direction": "column",
            "justify-content": "start",
            "gap": "2.5rem",
            "background-color": "transparent",
        });
        $("nav a img").css({
            "width": "100%",
            "height": "100%",
        });
        $("nav ul").css({
            "flex-direction": "column",
            "gap": "4.8rem",
            "align-items": "center",
        });
        $(".linea-titulo").css("flex-direction", "row-reverse");
        $(".linea-hrz::after").css("right", "42px");
    }
}

$(document).ready(function () {
    "use strict";
    $(window).scroll(function () {
        shrinkHeader();
    });
});



// TOP GLOBAL (HTML)

// REPRODUCTOR DE MUSICA QUE SE PAUSA
let progress = document.getElementById("progress");
let song = document.getElementById("song");
let ctrlIcon = document.getElementById("ctrlIcon");

song.onloadedmetadata = function() {
    progress.max = song.duration;
    progress.value = song.currentTime;
}

function playPause() {
    if (ctrlIcon.classList.contains("fa-pause")) {
        song.pause();
        ctrlIcon.classList.remove("fa-pause");
        ctrlIcon.classList.add("fa-play");
        
    } else {
        song.play();
        ctrlIcon.classList.add("fa-pause");
        ctrlIcon.classList.remove("fa-play");
    }
}

if(song.play()){
    setInterval(()=>{
        progress.value = song.currentTime;
    },500);
}

progress.onchange = function(){
    song.play();
    song.currentTime = progress.value;
    ctrlIcon.classList.add("fa-pause");
    ctrlIcon.classList.remove("fa-play");
}



// NUMEROS ANIMADOS
const animarContadorIndividual = (contador) => {
    const destino = parseFloat(contador.getAttribute('data-target'));
    const sufijo = contador.getAttribute('data-suffix');
    let valorInicial = 0;
    
    const duracion = 1700; 
    const framesPorSegundo = 80;
    const totalPasos = (duracion / 1000) * framesPorSegundo;
    const incremento = destino / totalPasos;

    const actualizarCuenta = () => {
        valorInicial += incremento;

        if (valorInicial < destino) {
            let numeroFormateado = valorInicial.toFixed(1).replace('.', ',');
            
            if (numeroFormateado.endsWith(',0')) {
                numeroFormateado = numeroFormateado.slice(0, -2);
            }

            contador.innerText = numeroFormateado + sufijo;
            requestAnimationFrame(actualizarCuenta);
        } else {
            contador.innerText = destino.toString().replace('.',',') + sufijo;
        }
    };

    actualizarCuenta();
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animado')) {
            entry.target.classList.add('animado');
            animarContadorIndividual(entry.target);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('.number').forEach(contador => {
    observer.observe(contador);
});





// PODCAST



// HOME
const artistsData = {
    pop: [
        { name: "Billie Eilish", genre: "Pop alternativo", image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" },
        { name: "Taylor Swift", genre: "Pop / Country", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" },
        { name: "The Weeknd", genre: "Pop / R&B", image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" },
        { name: "Dua Lipa", genre: "Pop / Dance", image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" },
        { name: "Harry Styles", genre: "Pop / Rock", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" }
    ],
    rock: [
        { name: "The Beatles", genre: "Rock clásico", image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" },
        { name: "Led Zeppelin", genre: "Hard rock", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" },
        { name: "Queen", genre: "Rock", image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" },
        { name: "Nirvana", genre: "Grunge", image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" },
        { name: "Radiohead", genre: "Rock alternativo", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" }
    ],
    hiphop: [
        { name: "Kendrick Lamar", genre: "Hip hop", image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" },
        { name: "Cardi B", genre: "Hip hop / Trap", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" },
        { name: "Drake", genre: "Hip hop / R&B", image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" },
        { name: "Travis Scott", genre: "Hip hop / Trap", image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" },
        { name: "Nicki Minaj", genre: "Hip hop", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" }
    ],
    electronic: [
        { name: "Daft Punk", genre: "House / Electrónica", image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" },
        { name: "Calvin Harris", genre: "EDM / House", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" },
        { name: "Marshmello", genre: "Future bass", image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" },
        { name: "Deadmau5", genre: "Progressive house", image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" },
        { name: "Skrillex", genre: "Dubstep", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" }
    ],
    jazz: [
        { name: "Miles Davis", genre: "Jazz", image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" },
        { name: "Louis Armstrong", genre: "Jazz tradicional", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" },
        { name: "John Coltrane", genre: "Avant-garde jazz", image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" },
        { name: "Ella Fitzgerald", genre: "Jazz vocal", image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" },
        { name: "Duke Ellington", genre: "Swing", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" }
    ]
};

// Mapeo de géneros a IDs de contenedor
const genreToContainerId = {
    0: "pop-artists",
    1: "rock-artists",
    2: "hiphop-artists",
    3: "electronic-artists",
    4: "jazz-artists"
};

const genreNames = ["Pop", "Rock", "Hip Hop", "Electrónica", "Jazz"];
        
// Variables del carrusel
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const indicators = document.querySelectorAll('.indicator');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const currentGenreElement = document.querySelector('.current-genre');
        
// Inicializar artistas para todos los géneros
function initializeArtists() {
    const genres = ['pop', 'rock', 'hiphop', 'electronic', 'jazz'];
            
    genres.forEach((genre, index) => {
        const containerId = genreToContainerId[index];
        const container = document.getElementById(containerId);
                
        // Limpiar contenedor
        container.innerHTML = '';
                
        // Añadir artistas
        artistsData[genre].forEach(artist => {
            const artistCard = document.createElement('div');
            artistCard.className = 'artist-card';
            artistCard.innerHTML = `
                <img src="${artist.image}" alt="${artist.name}" class="artist-image">
                <div class="artist-info artist-name">${artist.name}</div>
            `;
            container.appendChild(artistCard);
        });
    });
}
        
// Cambiar slide
function goToSlide(n) {
    // Ocultar slide actual
    slides[currentSlide].classList.remove('active');
    indicators[currentSlide].classList.remove('active');
    
    // Ocultar carrusel de artistas actual
    const currentContainerId = genreToContainerId[currentSlide];
    document.getElementById(currentContainerId).style.display = 'none';
            
    // Actualizar slide actual
    currentSlide = (n + slides.length) % slides.length;
    
    // Mostrar nuevo slide
    slides[currentSlide].classList.add('active');
    indicators[currentSlide].classList.add('active');
            
    // Actualizar título del género
    currentGenreElement.textContent = genreNames[currentSlide];
            
    // Mostrar carrusel de artistas correspondiente
    const newContainerId = genreToContainerId[currentSlide];
    document.getElementById(newContainerId).style.display = 'flex';
}
        
// Navegación
function nextSlide() {
    goToSlide(currentSlide + 1);
}
        
function prevSlide() {
    goToSlide(currentSlide - 1);
}
        
// Event listeners
prevBtn.addEventListener('click', prevSlide);
nextBtn.addEventListener('click', nextSlide);
        
// Indicadores click
indicators.forEach(indicator => {
    indicator.addEventListener('click', () => {
        const slideIndex = parseInt(indicator.getAttribute('data-slide'));
        goToSlide(slideIndex);
    });
});
        
// Navegación con teclado
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
                prevSlide();
    } else if (e.key === 'ArrowRight') {
                nextSlide();
    }
});
        
// Auto-avance cada 8 segundos (opcional)
let slideInterval = setInterval(nextSlide, 8000);
        
// Pausar auto-avance al interactuar
document.querySelector('.carousel-container').addEventListener('mouseenter', () => {
    clearInterval(slideInterval);
});
        
document.querySelector('.carousel-container').addEventListener('mouseleave', () => {
    slideInterval = setInterval(nextSlide, 8000);
});
        
// Inicializar
initializeArtists();
        
// Asegurarse de que solo se muestre el primer carrusel de artistas
document.getElementById('pop-artists').style.display = 'flex';