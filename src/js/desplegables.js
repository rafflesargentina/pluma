function mostrarDesplegable() {
    event.target.preventDefault();
    var gatillo = event.target;
    if(supportsQuerySelectors()) {
        var blanco = document.querySelector("#" + gatillo.getAttribute("data-desplegable"));
    } else {
        var blanco = document.getElementById(gatillo.getAttribute("data-desplegable"));
    }
    if(blanco) {
        addClass(gatillo, "--activo");
        addClass(blanco, "--desplegable-visible");
        var rect = gatillo.getBoundingClientRect();
        blanco.style.top = rect.top + gatillo.offsetHeight + "px";
        blanco.style.left = rect.left + "px";
    }
}
  
function ocultarDesplegables(ev,gatillos) {
    for(n = 0; n < gatillos.length; n++) {
        var gatillo = gatillos[n];
        if(supportsQuerySelectors()) {
            var blanco = document.querySelector("#" + gatillo.getAttribute("data-desplegable"));
        } else {
            var blanco = document.getElementById(gatillo.getAttribute("data-desplegable"));
        }
        if(!blanco.contains(ev.target) && !gatillo.contains(ev.target)) {
            removeClass(blanco, "--desplegable-visible");
            removeClass(gatillo, "--activo");
        }
    }
}

domReady(function() {
    if(supportsQuerySelectors()) {
        var gatillosDesplegable = document.querySelectorAll(".Btn-Desplegable");
    } else {
        var gatillosDesplegable = document.getElementsByClassName("Btn-Desplegable");
    }

    addEvent(window,"click", function(ev) {
        ocultarDesplegables(ev,gatillosDesplegable)
    });
});
