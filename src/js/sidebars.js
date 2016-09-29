function alternarSidebar() {
    var main, blanco, gatillo;
    main = qsByClassName(document.body, "Main-Con-Sidebar")[0];

    event.preventDefault();

    gatillo = event.target;
    blanco = qsById(gatillo.getAttribute("data-sidebar"));

    if(!blanco) {
        gatillo = gatillo.parentNode;
        blanco = qsById(gatillo.getAttribute("data-sidebar"))
    }

    if(blanco) {
        if(!hasClass(gatillo, "El--activo") && !hasClass(blanco, "El--visible")) {
            addClass(gatillo, "El--activo");
            addClass(blanco, "El--visible");
            if(hasClass(blanco, "Sidebar-Empujona")) { if(main) { if(!hasClass(main, "Apretado")) { addClass(main, "Apretado"); }}}
        } else {
            removeClass(gatillo, "El--activo");
            removeClass(blanco, "El--visible");
            if(hasClass(blanco, "Sidebar-Empujona")) { if(main) { if(hasClass(main, "Apretado")) { removeClass(main, "Apretado"); }}}
        }
    }
}

function ocultarSidebars(ev,gatillos) {
    var n, main, blanco, gatillo;
    n = gatillos.length;
    main = qsByClassName(document.body, "Main-Con-Sidebar")[0];
    while(n--) {
        gatillo = gatillos[n];
        blanco = qsById(gatillo.getAttribute("data-sidebar"));
        if(!blanco.contains(ev.target) && !gatillo.contains(ev.target)) {
            removeClass(blanco, "El--visible");
            removeClass(gatillo, "El--activo");
            if(hasClass(blanco, "Sidebar-Empujona")) { if(main) { if(hasClass(main, "Apretado")) { removeClass(main, "Apretado"); }}}
        }
    }
}

function registrarSidebars(gatillos) {
    var n, gatillo, gatillos;
    for(n = 0; n < gatillos.length; n++) {
        gatillo = gatillos[n];
        addEvent(gatillo, "click", function() {
            alternarSidebar();
        });
    }
}

domReady(function() {
    var gatillos = qsByClassName(document.body, "Btn-Sidebar");
    registrarSidebars(gatillos);
    if(gatillos.length > 0)
        addEvent(window,"click", function(ev) {
            ocultarSidebars(ev,gatillos);
        });
});
