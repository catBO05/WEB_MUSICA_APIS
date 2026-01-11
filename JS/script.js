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

// Ir a home
document.addEventListener("DOMContentLoaded", () => {

  // LOGIN
  document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const inputs = this.querySelectorAll("input");
    let valido = true;

    inputs.forEach(input => {
      if (input.value.trim() === "") {
        valido = false;
      }
    });

    if (valido) {
      window.location.href = "home.html";
    } else {
      alert("Completa todos los campos correctamente");
    }
  });

  // REGISTER
  document.getElementById("registerForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const inputs = this.querySelectorAll("input");
    let valido = true;

    inputs.forEach(input => {
      if (input.value.trim() === "") {
        valido = false;
      }
    });

    if (valido) {
      window.location.href = "home.html";
    } else {
      alert("Completa todos los campos correctamente");
    }
  });

});


// MENU RESPONSIVE
function animar() {
    document.getElementById("icono").classList.toggle("cambiar");
}

function openMenu() {
    const menu = document.getElementById("menu-lista");

    if (menu.classList.contains("activo")) return;

    animar();
    menu.classList.add("activo");

    let overlay = document.getElementById("menu-overlay");
    if (!overlay) {
        overlay = document.createElement("div");
        overlay.id = "menu-overlay";
        overlay.onclick = closeMenu;
        document.body.appendChild(overlay);
    }
    overlay.classList.add("activo");

    document.body.style.overflow = "hidden";
}

function closeMenu() {
    const menu = document.getElementById("menu-lista");

    if (!menu.classList.contains("activo")) return;

    animar();
    menu.classList.remove("activo");

    const overlay = document.getElementById("menu-overlay");
    if (overlay) overlay.classList.remove("activo");

    document.body.style.overflow = "auto";
}

function menu() {
    const menu = document.getElementById("menu-lista");
    menu.classList.contains("activo") ? closeMenu() : openMenu();
}


// SCROLL - Cambio de tamaños (jQuery) PROBLEMAS CON EL RESPONSIVE

// function shrinkHeader() {
//     "use strict";
//     var scroll = $(window).scrollTop();
//     var threshold = $(window).height() / 2;
//     if (scroll > threshold) {
//         $("nav").css({
//             "height": "12vh",
//             "width": "100%",
//             "align-items": "center",
//             "flex-direction": "row",
//             "justify-content": "space-between",
//             "gap": "0rem",
//             "background-color": "#6b6b6b4f",
//         });
//         $("nav > a").css("margin-top", "8px");
//         $("nav a img").css({"width": "18%"});
//         $("nav ul").css({
//             "flex-direction": "row",
//             "gap": "1rem",
//             "align-items": "none",
//         });
//         $(".linea-titulo").css("flex-direction", "row");
//         $(".linea-hrz::after").css("right", "-8px");
//     } else {
//          $("nav").css({
//             "height": "100vh",
//             "width": "20%",
//             "align-items": "flex-start",
//             "flex-direction": "column",
//             "justify-content": "start",
//             "gap": "4rem",
//             "background-color": "transparent",
//         });
//         $("nav > a").css("margin-top", "24px");
//         $("nav a img").css({
//             "width": "60%",
//             "height": "100%",
//         });
//         $("nav ul").css({
//             "flex-direction": "column",
//             "gap": "4.8rem",
//             "align-items": "center",
//         });
//         $(".linea-titulo").css("flex-direction", "row-reverse");
//         $(".linea-hrz::after").css("right", "42px");
//     }


//     if (window.innerWidth > 768) { // SOLO DESKTOP
//         if (scroll > threshold) {
//             $("nav").css({
//                 height: "12vh",
//                 flexDirection: "row",
//                 justifyContent: "space-between",
//                 backgroundColor: "#6b6b6b4f",
//             });
//         } else {
//             $("nav").css({
//                 height: "100vh",
//                 flexDirection: "column",
//                 justifyContent: "start",
//                 backgroundColor: "transparent",
//             });
//         }
//     }
// }

// $(document).ready(function () {
//     "use strict";
//     $(window).scroll(function () {
//         shrinkHeader();
//     });
// });


// HOME
// CARROUSEL inicio
document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const carousel = document.querySelector('.carousel-container');

    // Imagenes "Artistas del mes"
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
            { name: "Daddy Yankee", image: "MEDIA/IMG/daddyYankee.webp" },
            { name: "Karol G", image: "MEDIA/IMG/karolG.webp" },
            { name: "Don Omar", image: "MEDIA/IMG/donOmar.webp" },
            { name: "Yandel", image: "MEDIA/IMG/Yandel.webp" },
            { name: "J Balbin", image: "MEDIA/IMG/jbalvin.webp" },
            { name: "Bad Bunny", image: "MEDIA/IMG/badbunny.webp" }
        ],
        hiphop: [
            { name: "Tupac Shakur", image: "MEDIA/IMG/tupak.webp" },
            { name: "The Notorious B.I.G.", image: "MEDIA/IMG/TheNotorious.webp" },
            { name: "Nas", image: "MEDIA/IMG/nas.webp" },
            { name: "Eminem", image: "MEDIA/IMG/eminem.webp" },
            { name: "Drake", image: "MEDIA/IMG/Drake.webp" },
        ],
        electronica: [
            { name: "Daft Punk", image: "MEDIA/IMG/daftPunk.webp" },
            { name: "Martin Garrix", image: "MEDIA/IMG/martinGarrix.jpg" },
            { name: "David Guetta", image: "MEDIA/IMG/DavidGuetta.webp" },
            { name: "Marshmello", image: "MEDIA/IMG/Marshmello.webp" },
            { name: "Black Coffe", image: "MEDIA/IMG/BlackCoffee.webp" },
        ],
        rock: [
            { name: "Mick Jagger", image: "MEDIA/IMG/MickJagger.webp" },
            { name: "Robert Plant", image: "MEDIA/IMG/RobertPlant.webp" },
            { name: "Queen", image: "MEDIA/IMG/queen.webp" },
            { name: "Elvis", image: "MEDIA/IMG/elvis.webp" },
            { name: "David Bowie", image: "MEDIA/IMG/DavidBowie.webp" },
        ]
    };

    const genreIds = ['pop','reggaeton','hiphop','electronica','rock'];
    let currentSlide = 0;

    function hideAllSlides() {
        slides.forEach(slide => slide.classList.remove('active'));

        genreIds.forEach(genre => {
            const container = document.getElementById(genre);
            if (container) {
                container.style.display = 'none';
                container.innerHTML = "";
            }
        });
    }

    function renderArtists(genre) {
        const container = document.getElementById(genre);
        if (!container || !artistsData[genre]) return;

        const group = document.createElement("div");
        group.classList.add("group");

        artistsData[genre].forEach(artist => {
            const card = document.createElement("div");
            card.classList.add("card-artistas");

            card.innerHTML = `
                <img src="${artist.image}" class="artist-image" alt="${artist.name}">
                <h4 class="name artist-info">${artist.name}</h4>
            `;

            group.appendChild(card);
        });

        container.appendChild(group);
    }

    function showSlide(n) {
        hideAllSlides();
        currentSlide = (n + slides.length) % slides.length;

        slides[currentSlide].classList.add('active');

        const genre = genreIds[currentSlide];
        const container = document.getElementById(genre);

        if (container) {
            renderArtists(genre);
            container.style.display = 'flex';
        }
    }

    // Botones
    prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));
    nextBtn.addEventListener('click', () => showSlide(currentSlide + 1));


    let slideInterval = setInterval(() => showSlide(currentSlide + 1), 8000);
    carousel.addEventListener('mouseenter', () => clearInterval(slideInterval));
    carousel.addEventListener('mouseleave', () => {
        slideInterval = setInterval(() => showSlide(currentSlide + 1), 8000);
    });

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

song.addEventListener("timeupdate", () => {
    progress.value = song.currentTime;
});

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


// ANIMACION - SCROLL AOS
/*jslint devel: true*/
/*eslint-env browser*/
window.onload = function () {
    "use strict";
    AOS.init({
        duration: 1500,
    });
};