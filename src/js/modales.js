function mostrarVModal() {
    var gatillo = event.target;
    if(supportsQuerySelectors()) {
        var blanco = document.querySelector("#" + gatillo.getAttribute("data-vmodal"));
        var wrapperVModal = document.querySelector(".Wrapper-VModal");
    } else {
        var blanco = document.getElementById(gatillo.getAttribute("data-vmodal"));
        var wrapperVModal = document.getElementsByClassName("Wrapper-VModal")[0];
    }
    if(wrapperVModal) {
        addClass(wrapperVModal, "--visible");
    }
    if(blanco) {
        addClass(gatillo, "--activo");
        addClass(blanco, "--vmodal-visible");
        alto = blanco.offsetHeight;
        blanco.style.marginTop = -alto / 2 + "px";
    }
}

function ocultarVModales(ev,gatillos) {
    for(n = 0; n < gatillos.length; n++) {
        var gatillo = gatillos[n];
        if(supportsQuerySelectors()) {
            var blanco = document.querySelector("#" + gatillo.getAttribute("data-vmodal"));
            var wrapperVModal = document.querySelector(".Wrapper-VModal");
        } else {
            var blanco = document.getElementById(gatillo.getAttribute("data-vmodal"));
        var wrapperVModal = document.querySelector(".Wrapper-VModal");
        }
        if(!blanco.contains(ev.target) && !gatillo.contains(ev.target)) {
            removeClass(blanco, "--vmodal-visible");
            removeClass(gatillo, "--activo");
            if(wrapperVModal) {
              removeClass(wrapperVModal, "--visible");
            }
        }
    }
}

domReady(function() {
    if(supportsQuerySelectors()) {
        var gatillosVModal = document.querySelectorAll(".Btn-VModal");
    } else {
        var gatillosVModal = document.getElementsByClassName("Btn-VModal");
    }

    addEvent(window,"click", function(ev) {
        ocultarVModales(ev,gatillosVModal)
    });
});
