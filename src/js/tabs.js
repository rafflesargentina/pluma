function activarTab() {
    var n, blanco, gatillo, gatillos;

    event.preventDefault();

    gatillos = qsByClassName(document.body, "Tab");
    desactivarTabs(gatillos);

    gatillo = event.target;
    blanco = qsById(gatillo.getAttribute("data-contenidotab"));
    if(!blanco) {
        gatillo = gatillo.parentNode;
        blanco = qsById(gatillo.getAttribute("data-contenidotab"))
    }
    if(blanco) {
        if(!hasClass(gatillo, "El--activo") && !hasClass(blanco, "El--visible")) {
            addClass(gatillo, "El--activo");
            addClass(blanco, "El--visible");
        }
    }
}

function desactivarTabs(gatillos) {
    var n, blanco, gatillo, gatillos;
    for(n = 0; n < gatillos.length; n++) {
        gatillo = gatillos[n];
        blanco = qsById(gatillo.getAttribute("data-contenidotab"));
        removeClass(gatillo, "El--activo");
        removeClass(blanco, "El--visible");
    }
}

function registrarTabs(gatillos) {
    var n, gatillo, gatillos;
    for(n = 0; n < gatillos.length; n++) {
        gatillo = gatillos[n];
        addEvent(gatillo, "click", function() {
            activarTab();
        });
    }
}

function verificarTabs(gatillos) {
    var n, blanco, errores, gatillo, gatillos, conErrores, conErrores;
    conErrores = [];
    for(n = 0; n < gatillos.length; n++) {
        gatillo = gatillos[n];
        blanco = qsById(gatillo.getAttribute("data-contenidotab"));
        errores = qsByClassName(blanco, "El--con-error");
        if(errores.length > 0) {
            addClass(gatillo, "El--con-error");
            addClass(blanco, "El--con-error");
            conErrores.push(gatillo);
        }
    }
    if(conErrores.length > 0) {
        gatillo = conErrores[0];
        blanco = qsById(gatillo.getAttribute("data-contenidotab"));
        desactivarTabs(gatillos);
        addClass(gatillo, "El--activo");
        addClass(blanco, "El--visible");
    }
}

domReady(function() {
    var gatillos = qsByClassName(document.body, "Tab");
    registrarTabs(gatillos);
    verificarTabs(gatillos);
});
