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

function mostrarDesplegable() {
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
