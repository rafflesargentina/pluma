function alternarDesplegable() {
    event.preventDefault();
    var main = qsByTagName(document.body, "main");
    var gatillo = event.target;
    var blanco = qsById(gatillo.getAttribute("data-desplegable"));
    if(!blanco) {
        gatillo = gatillo.parentNode;
        blanco = qsById(gatillo.getAttribute("data-desplegable"))
    }
    if(blanco) {
        if(hasClass(gatillo, "--activo") && hasClass(blanco, "--desplegable-visible")) {
            removeClass(gatillo, "--activo");
            removeClass(blanco, "--desplegable-visible");
            removeEvent(window, "resize", function() { posicionarDesplegable(gatillo,blanco) });
        } else {
            addClass(gatillo, "--activo");
            addClass(blanco, "--desplegable-visible");
            posicionarDesplegable(gatillo,blanco);
            addEvent(window, "resize", function()  { posicionarDesplegable(gatillo,blanco) });
        }
    }
}
  
function ocultarDesplegables(ev,gatillos) {
    for(var n = 0; n < gatillos.length; n++) {
        var gatillo = gatillos[n];
        var blanco = qsById(gatillo.getAttribute("data-desplegable"));
        if(!blanco.contains(ev.target) && !gatillo.contains(ev.target)) {
            removeClass(blanco, "--desplegable-visible");
            removeClass(gatillo, "--activo");
            removeEvent(window, "resize", function() { posicionarDesplegable(gatillo,blanco) });
        }
    }
}

function posicionarDesplegable(gatillo,blanco) {
    var rect = gatillo.getBoundingClientRect();
    var posicionY = rect.top + gatillo.offsetHeight + "px";
    if(blanco.offsetWidth + rect.left < main.offsetWidth) {
       var posicionX = rect.left + "px";
       blanco.style.top = posicionY;
       blanco.style.left = posicionX;
    } else {
        var posicionX = rect.left - blanco.offsetWidth + gatillo.offsetWidth;
        if(posicionX < 0) {
            posicionX = 0;
            blanco.style.top = "";
            blanco.style.left = posicionX + "px";
        } else {
            blanco.style.top = posicionY;
            blanco.style.left = posicionX + "px";
        }
    }
}

domReady(function() {
    var gatillosDesplegable = qsByClassName(document.body, "Btn-Desplegable");
    addEvent(window,"click", function(ev) {
        ocultarDesplegables(ev,gatillosDesplegable)
    });
});
