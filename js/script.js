/* -------------------------------------------------------------
  - Menu modal deeplinking
  - Open menu if hash is a match
  - Image blur onload technique
------------------------------------------------------------- */

document.getElementById("header-wrap").className = "transparent";

// Menu modal deeplinking ---- https://gist.github.com/sstephenson/739659 ----
var detectBackOrForward = function(onBack, onForward) {
  hashHistory = [window.location.hash];
  historyLength = window.history.length;

  return function() {
    var hash = window.location.hash, length = window.history.length;
    if (hashHistory.length && historyLength == length) {
      if (hashHistory[hashHistory.length - 2] == hash) {
        hashHistory = hashHistory.slice(0, -1);
        onBack();
      } else {
        hashHistory.push(hash);
        onForward();
      }
    } else {
      hashHistory.push(hash);
      historyLength = length;
    }
  }
};

window.addEventListener("hashchange", detectBackOrForward(
  function() {
    if (window.location.hash == "") { $('.modal').modal('hide'); }
    console.log("back")
  },
  function() {
    if (window.location.hash == "") { $('.modal').modal('hide'); }
    console.log("forward")
  }
));


// Open menu if hash is menu-modal ------------------------------------------
$(window).on('load',function() {
  var pathname = window.location.hash,
      rez = pathname.split('#'),
      linkUrl = rez[1];

  if (linkUrl == 'modalNavigation') {
    $('#modalNavigation').modal('show');
  } else if (linkUrl == 'portfolioModal1') {
    $('#portfolioModal1').modal('show');
  }
});


// Image blur onload technique ----------------------------------------------
window.onload = function loadStuff() {
  var img, header, enhancedClass, bigSrc;
  // Quit early if older browser (e.g. IE8).
  if (!('addEventListener' in window)) {
    return;
  }

  img = new Image();
  header = document.querySelector('.masthead');
  enhancedClass = 'post-header-enhanced';
  bigSrc = header.getAttribute("data-src");

  // Assign an onLoad handler to the dummy image *before* assigning the src
  img.onload = function() {
    header.classList.add(enhancedClass);
  };
  // Finally, trigger the whole preloading chain by giving the dummy
  // image its source.
  if (bigSrc) {
    img.src = bigSrc;
    header.style.backgroundImage = 'url(' + bigSrc + ')';
  }
};

// Passive event listener
document.addEventListener('touchmove', function(event) {
  // event.preventDefault() will be ignored
}, {passive: true});


// Header navigation shrink -------------------------------------------------
(function($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 54)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#header-wrap',
    offset: 54
  });

  // Collapse the navbar when page is scrolled
  $(window).scroll(function() {
    if ($("#header-wrap").offset().top > 100) {
      $("#header-wrap").addClass("navbar-shrink");
    } else {
      $("#header-wrap").removeClass("navbar-shrink");
    }
  });

})(jQuery); // End of use strict
