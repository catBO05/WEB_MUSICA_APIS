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

