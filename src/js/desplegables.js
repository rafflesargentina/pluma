function alternarDesplegable() {
    event.preventDefault();
    var gatillo = event.target;
    var blanco = qsById(gatillo.getAttribute("data-desplegable"));
    if(!blanco) {
        gatillo = gatillo.parentNode;
        blanco = qsById(gatillo.getAttribute("data-desplegable"))
    }
    if(blanco) {
        if(hasClass(gatillo, "El--activo") && hasClass(blanco, "El--visible")) {
            removeClass(gatillo, "El--activo");
            removeClass(blanco, "El--visible");
            removeEvent(window, "resize", function() { posicionarDesplegable(gatillo,blanco) });
        } else {
            addClass(gatillo, "El--activo");
            addClass(blanco, "El--visible");
            posicionarDesplegable(gatillo,blanco);
            addEvent(window, "resize", function()  { posicionarDesplegable(gatillo,blanco) });
        }
    }
}

function ocultarDesplegables(ev,gatillos) {
    for(var n = 0; n < gatillos.length; n++) {
        var gatillo = gatillos[n];
        var blanco = qsById(gatillo.getAttribute("data-desplegable"));
        if(blanco) {
            if(!blanco.contains(ev.target) && !gatillo.contains(ev.target)) {
                removeClass(blanco, "El--visible");
                removeClass(gatillo, "El--activo");
                removeEvent(window, "resize", function() { posicionarDesplegable(gatillo,blanco) });
            }
        }
    }
}

function registrarDesplegables(gatillos) {
    var n, gatillo, gatillos;
    for(n = 0; n < gatillos.length; n++) {
        gatillo = gatillos[n];
        addEvent(gatillo, "click", function() {
            alternarDesplegable();
        });
    }
}

function posicionarDesplegable(gatillo,blanco) {
    var d = document,
        e = d.documentElement,
        g = d.getElementsByTagName("body")[0],
        w = window;

    var wH = w.innerHeight ||
             e.clientHeight ||
             g.clientHeight;
    var wW = w.innerWidth ||
             e.clientWidth ||
             g.clientWidth;

    var rect, posicionX, posicionY;
    rect = gatillo.getBoundingClientRect();

    if(rect.top + blanco.offsetHeight < wH) {
        posicionY = gatillo.offsetHeight + "px";
        if(!hasClass(blanco, "El--con-sombra-abajo")) {
            removeClass(blanco, "El--con-sombra-arriba");
            addClass(blanco, "El--con-sombra-abajo");
        }
    } else {
        posicionY = 0 - blanco.offsetHeight + "px";
        if(!hasClass(blanco, "El--con-sombra-arriba")) {
            removeClass(blanco, "El--con-sombra-abajo");
            addClass(blanco, "El--con-sombra-arriba");
        }
    }

    if(rect.left + blanco.offsetWidth < wW) {
        posicionX = gatillo.offsetLeft + "px";
        if(!hasClass(blanco, "El--con-sombra-derecha")) {
            removeClass(blanco, "El--con-sombra-izquierda");
            addClass(blanco, "El--con-sombra-derecha");
        }
    } else {
        posicionX = (gatillo.offsetWidth + gatillo.offsetLeft - blanco.offsetWidth) + "px";
        if(!hasClass(blanco, "El--con-sombra-izquierda")) {
            removeClass(blanco, "El--con-sombra-derecha");
            addClass(blanco, "El--con-sombra-izquierda");
        }
    }

    blanco.style.top = posicionY;
    blanco.style.left = posicionX;
}

domReady(function() {
    var gatillos = qsByClassName(document.body, "Btn-Desplegable");
    registrarDesplegables(gatillos);   
    addEvent(window,"click", function(ev) {
        ocultarDesplegables(ev,gatillos);
    });
});
