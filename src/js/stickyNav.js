function stickyNav() {
  "use strict";
  var hdr = window.innerHeight;
  var scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;

  window.onscroll = function() {
    var main = document.getElementsByTagName("main");
      if (window.pageYOffset > hdr) {
          var nav = document.getElementsByTagName("nav");
          nav[0].classList.add("fixed");
          main[0].classList.add("fixed-content");
      } else {
          document.getElementsByTagName("nav")[0].classList.remove("fixed");
          main[0].classList.remove("fixed-content");
      }
  };
}

export default stickyNav;