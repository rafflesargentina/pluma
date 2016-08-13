/**
 * Fuente: http://youmightnotneedjquery.com
 */
function addClass(el, className) {
  if (el.classList)
    el.classList.add(className)
  else if (!hasClass(el, className)) el.className += " " + className
}

function hasClass(el, className) {
  if (el.classList)
    return el.classList.contains(className)
  else
    return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))
}

function removeClass(el, className) {
  if (el.classList)
    el.classList.remove(className)
  else if (hasClass(el, className)) {
    var reg = new RegExp('(\\s|^)' + className + '(\\s|$)')
    el.className=el.className.replace(reg, ' ')
  }
}

/**
 * Fuente: http://stackoverflow.com/questions/3076679/javascript-event-registering-without-using-jquery
 */
function addEvent(el, eventType, handler) {
  if (el.addEventListener) { // DOM Level 2 browsers
    el.addEventListener(eventType, handler, false);
  } else if (el.attachEvent) { // IE <= 8
    el.attachEvent('on' + eventType, handler);
  }
}

function removeEvent(el, eventType, handler) {
  if (el.addEventListener) { // DOM Level 2 browsers
    el.removeEventListener(eventType, handler, false);
  } else if (el.attachEvent) { // IE <= 8
    el.detachEvent('on' + eventType, handler);
  }
}

/**
 * Fuente: http://beeker.io/jquery-document-ready-equivalent-vanilla-javascript
 */
var domReady = function(callback) {
    var ready = false;

    var detach = function() {
        if(document.addEventListener) {
            document.removeEventListener("DOMContentLoaded", completed);
            window.removeEventListener("load", completed);
        } else {
            document.detachEvent("onreadystatechange", completed);
            window.detachEvent("onload", completed);
        }
    }
    var completed = function() {
        if(!ready && (document.addEventListener || event.type === "load" || document.readyState === "complete")) {
            ready = true;
            detach();
            callback();
        }
    };

    if(document.readyState === "complete") {
        callback();
    } else if(document.addEventListener) {
        document.addEventListener("DOMContentLoaded", completed);
        window.addEventListener("load", completed);
    } else {
        document.attachEvent("onreadystatechange", completed);
        window.attachEvent("onload", completed);

        var top = false;

        try {
            top = window.frameElement == null && document.documentElement;
        } catch(e) {}

        if(top && top.doScroll) {
            (function scrollCheck() {
                if(ready) return;

                try {
                    top.doScroll("left");
                } catch(e) {
                    return setTimeout(scrollCheck, 50);
                }

                ready = true;
                detach();
                callback();
            })();
        }
    }
};

function qsById(id) {
    var elemento;
    if(supportsQuerySelectors()) {
        elemento = document.querySelector("#" + id);
    } else {
        elemento = document.getElementById(id);
    }
    return elemento;
}

function qsByName(nodo, name) {
    var elementos;
    if(supportsQuerySelectors()) {
        elementos = nodo.querySelectorAll("[name$=" + name + "]");
    } else {
        elementos = nodo.getElementsByName(name);
    }
    return elementos;
}

function qsByTagName(nodo, tagName) {
    var elementos;
    if(supportsQuerySelectors()) {
        elementos = nodo.querySelectorAll(tagName);
    } else {
        elementos = nodo.getElementByTagName(tagName);
    }
    return elementos;
}

function qsByClassName(nodo, nombreClase) {
    var elementos = [];
    if(supportsQuerySelectors()) {
        elementos = nodo.querySelectorAll("." + nombreClase);
    } else {
        var re = new RegExp('(^| )'+nombreClase+'( |$)');
        var todosNodos = nodo.getElementsByTagName("*");
        for(var n = 0; n < todosNodos.length; n++) {
            if(re.test(todosNodos[n].className)) {
                elementos.push(todosNodos[n]);
            }
        }
    }
    return elementos;
}

/**
 *  Fuente: https://davidwalsh.name/css-animation-callback
 */
function whichAnimationEvent(el){
    var a;
    var animations = {
      'animation':       'animationend',
      'OAnimation':      'oAnimationEnd',
      'MSAnimation':     'msAnimationEnd',
      'MozAnimation':    'animationend',
      'WebkitAnimation': 'webkitAnimationEnd'
    }

    for(a in animations){
        if( el.style[a] !== undefined ){
            return animations[a];
        }
    }
}

function whichTransitionEvent(el){
    var t;
    var transitions = {
      'transition':       'transitionend',
      'OTransition':      'oTransitionEnd',
      'MSTransition':     'msTransitionEnd',
      'MozTransition':    'transitionend',
      'WebkitTransition': 'webkitTransitionEnd'
    }

    for(t in transitions){
        if( el.style[t] !== undefined ){
            return transitions[t];
        }
    }
}

/**
 * Fuente: http://www.htmlgoodies.com/beyond/javascript/using-javascripts-css3-selectors.html
 */
function supportsQuerySelectors() {
  return (  typeof document['querySelector']    == 'function'
         && typeof document['querySelectorAll'] == 'function');
}

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

function posicionarDesplegable(gatillo,blanco) {
    var main = qsByTagName(document.body, "main")[0];
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

function enfocarEtiqueta() {
    var nombre = event.target.name;
    var etiquetas = qsByTagName(document.body, "label");
    for(var n = 0; n < etiquetas.length; n++)
        if(etiquetas[n].htmlFor == nombre) var etiqueta = etiquetas[n];
    addClass(etiqueta, "--con-foco");
}

function desenfocarEtiqueta() {
    var nombre = event.target.name;
    var etiquetas = qsByTagName(document.body, "label");
    for(var n = 0; n < etiquetas.length; n++)
        if(etiquetas[n].htmlFor == nombre) var etiqueta = etiquetas[n];
    removeClass(etiqueta, "--con-foco");
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
