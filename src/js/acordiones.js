domReady(function() {
    var botonesAcordion = qsByClassName(document.body, "Btn-Acordion");
    for(n = 0; n < botonesAcordion.length; n++) {
        addEvent(botonesAcordion[n], "click", function() {
            if(!hasClass(event.target, "El--activo")) {
                addClass(event.target, "El--activo")
                addClass(event.target.nextElementSibling, "El--visible");
            } else {
                removeClass(event.target.nextElementSibling, "El--visible");
                removeClass(event.target, "El--activo")
            }
        });
    }
});
