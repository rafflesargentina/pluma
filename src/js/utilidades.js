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
