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
            "gap": "3rem",
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


// HOME
// CARROUSEL inicio
document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const carousel = document.querySelector('.carousel-container');

    const artistsData = {
        pop: [
            { name: "Taylor Swift", image: "MEDIA/IMG/taylorswift.webp" },
            { name: "David Bisbal", image: "MEDIA/IMG/Bisbal.webp" },
            { name: "Billie Eilish", image: "MEDIA/IMG/billieeilish.webp" },
            { name: "Lady Gaga", image: "MEDIA/IMG/ladyGaga.webp" },
            { name: "Justin Bieber", image: "MEDIA/IMG/justinBieber.webp" },
            { name: "Ed Sheeran", image: "MEDIA/IMG/EdSheeran.webp" },
            { name: "Morat", image: "MEDIA/IMG/morat.webp" },
            { name: "Beyoncé", image: "MEDIA/IMG/beyonce.webp" }
        ],
        reggaeton: [
            { name: "Daddy Yankee", image: "MEDIA/IMG/daddyyankee.webp" },
            { name: "Bad Bunny", image: "MEDIA/IMG/badbunny.webp" }
        ],
        hiphop: [
            { name: "Kendrick Lamar", image: "MEDIA/IMG/kendrick.webp" },
            { name: "Cardi B", image: "MEDIA/IMG/cardiB.webp" }
        ],
        electronica: [
            { name: "Daft Punk", image: "MEDIA/IMG/daftpunk.webp" },
            { name: "Calvin Harris", image: "MEDIA/IMG/calvin.webp" }
        ],
        rock: [
            { name: "The Beatles", image: "MEDIA/IMG/beatles.webp" },
            { name: "Queen", image: "MEDIA/IMG/queen.webp" }
        ]
    };

    const genreIds = ['pop','reggaeton','hiphop','electronica','rock'];
    let currentSlide = 0;

    // Ocultar todos los slides y artistas
    function hideAllSlides() {
        slides.forEach(slide => slide.classList.remove('active'));
        genreIds.forEach(genre => {
            const container = document.getElementById(genre);
            if (container) container.style.display = 'none';
        });
    }

    // Mostrar slide y artistas actuales
    function showSlide(n) {
        hideAllSlides();
        currentSlide = (n + slides.length) % slides.length;

        slides[currentSlide].classList.add('active');

        const container = document.getElementById(genreIds[currentSlide]);
        if (container) container.style.display = 'flex';
    }

    // Botones
    prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));
    nextBtn.addEventListener('click', () => showSlide(currentSlide + 1));

    // Autoplay
    let slideInterval = setInterval(() => showSlide(currentSlide + 1), 8000);
    carousel.addEventListener('mouseenter', () => clearInterval(slideInterval));
    carousel.addEventListener('mouseleave', () => {
        slideInterval = setInterval(() => showSlide(currentSlide + 1), 5000);
    });

    // Inicializar mostrando primer slide
    showSlide(0);
});


// CHECK/+
document.addEventListener("DOMContentLoaded", () => {
    const statusButtons = document.querySelectorAll(".status");

    statusButtons.forEach(button => {
        button.addEventListener("click", () => {
            button.classList.toggle("checked");
            button.innerHTML = button.classList.contains("checked") ? '<i class="fa-solid fa-check"></i>' : '<i class="fa-solid fa-plus"></i>';
        });
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
