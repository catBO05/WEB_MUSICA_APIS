// MENU RESPONSIVE
$(document).ready(function () {
    $("#menu-toggle").on("click", function () {
        $("#nav-links-responsive").toggleClass("active");
    });

    $("#nav-links-responsive a").on("click", function () {
        $("#nav-links-responsive").removeClass("active");
    });
});

// SCROLL - Cambio de tamaños (jQuery) - EN PROCESO
function shrinkHeader() {
    "use strict";
    var scroll = $(window).scrollTop();
    var threshold = $(window).height() / 2;
    if (scroll > threshold) {
        $("nav").css({
            "height": "12vh",
            "width": "100%",
            "flex-direction": "row",
            "background-color": "var(--black-color)",
            "border-bottom": "none",
        });
        // $("#icono > div").css("background-color", "var(--black-color)");
        $(".icono_logo").css("fontSize", "0.9rem");
        $(".logo").css({
            "flex-direction": "row",
            "width": "4.5rem",
            "gap": "8px",
        });
        $(".logo > :first-child").css("height", "1.8rem");

    } else {
         $("nav").css({
            "height": "100vh",
            "width": "25%",
            "flex-direction": "column",
            "background-color": "transparent",
            "border-bottom": "3px solid rgba(255, 255, 255, 0.5)",
        });
        // $("#icono > div").css("background-color", "white");
        $(".icono_logo").css("fontSize", "1rem");
        $(".logo").css({
            "flex-direction": "column",
            "width": "5rem",
            "gap": "0px",
        });
        $(".logo > :first-child").css("height", "2.2rem");

    }
}

$(document).ready(function () {
    "use strict";
    $(window).scroll(function () {
        shrinkHeader();
    });
});



// REPRODUCTOR DE MUSICA QUE SE PAUSA Y TODO
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