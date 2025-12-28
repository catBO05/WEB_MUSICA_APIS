// MENU RESPONSIVE

$(document).ready(function () {
    $("#menu-toggle").on("click", function () {
        $("#nav-links-responsive").toggleClass("active");
    });

    $("#nav-links-responsive a").on("click", function () {
        $("#nav-links-responsive").removeClass("active");
    });
});


// MENU

const menu = document.getElementById("menu");
const trigger = document.querySelector(".cantantes");

window.addEventListener("scroll", () => {
    const triggerTop = trigger.offsetTop;

    if (window.scrollY >= triggerTop - 100) {
        menu.classList.add("top");
    } else {
        menu.classList.remove("top");
    }
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