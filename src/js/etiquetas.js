function enfocarEtiqueta() {
    var nombre = event.target.id;
    var etiquetas = qsByTagName(document.body, "label");
    for(var n = 0; n < etiquetas.length; n++)
        if(etiquetas[n].htmlFor == nombre) var etiqueta = etiquetas[n];
    if(!hasClass(etiqueta, "El--con-foco")) addClass(etiqueta, "El--con-foco");
}

function desenfocarEtiqueta() {
    var nombre = event.target.id;
    var etiquetas = qsByTagName(document.body, "label");
    for(var n = 0; n < etiquetas.length; n++)
        if(etiquetas[n].htmlFor == nombre) var etiqueta = etiquetas[n];
    if(!hasClass(etiqueta, "El--con-foco")) removeClass(etiqueta, "El--con-foco");
}

domReady(function() {
    var etiquetas = qsByTagName(document.body, "label");
    if(etiquetas) {
        for(var n = 0; n < etiquetas.length; n++) {
            var nombre = etiquetas[n].htmlFor;
            if(nombre) var control = qsByName(document.body, nombre)[0];
            if(control) {
                addEvent(control, "focus", function() { enfocarEtiqueta() });
                addEvent(control, "blur", function() { desenfocarEtiqueta() });
            }
        }
    }
});
