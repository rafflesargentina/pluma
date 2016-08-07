function mostrarVModal() {
    var gatillo = event.target;
    var blanco = qsById(gatillo.getAttribute("data-vmodal"));
    var wrapperVModal = qsByClassName(document.body, "Wrapper-VModal")[0];
    if(wrapperVModal) {
        addClass(wrapperVModal, "El--visible");
    }
    if(blanco) {
        addClass(gatillo, "El--activo");
        addClass(blanco, "El--visible");
        alto = blanco.offsetHeight;
        blanco.style.marginTop = -alto / 2 + "px";
    }
}

function ocultarVModales(ev,gatillos) {
    for(var n = 0; n < gatillos.length; n++) {
        var gatillo = gatillos[n];
        var blanco = qsById(gatillo.getAttribute("data-vmodal"));
        var wrapperVModal = qsByClassName(document.body, "Wrapper-VModal")[0];
        if(!blanco.contains(ev.target) && !gatillo.contains(ev.target)) {
            removeClass(blanco, "El--visible");
            removeClass(gatillo, "El--activo");
            if(wrapperVModal) {
              removeClass(wrapperVModal, "El--visible");
            }
        }
    }
}

domReady(function() {
    var gatillosVModal = qsByClassName(document.body, "Btn-VModal");

    addEvent(window,"click", function(ev) {
        ocultarVModales(ev,gatillosVModal)
    });
});
