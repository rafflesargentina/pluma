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
