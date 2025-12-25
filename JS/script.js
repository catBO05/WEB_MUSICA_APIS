$(document).ready(function () {
    $("#menu-toggle").on("click", function () {
        $("#nav-links-responsive").toggleClass("active");
    });

    $("#nav-links-responsive a").on("click", function () {
        $("#nav-links-responsive").removeClass("active");
    });
});