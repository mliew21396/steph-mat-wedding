function linkScroll () {
  "use strict";
  var homeSources = document.querySelectorAll("a[href='#home']");
  var homeTarget = document.getElementById("home");
  var storySources = document.querySelectorAll("a[href='#story']");
  var storyTarget= document.getElementById("story");
  var weddingDetailSources = document.querySelectorAll("a[href='#schedule']");
  var weddingDetailsTarget = document.getElementById("schedule");
  var travelSources = document.querySelectorAll("a[href='#travel']");
  var travelTarget = document.getElementById("travel");
  var photoSources = document.querySelectorAll("a[href='#photos']");
  var photosTarget = document.getElementById("photos");
  var registrySources = document.querySelectorAll("a[href='#registry']");
  var registryTarget = document.getElementById("registry");

  homeSources.forEach(function(homeSource) {
    homeSource.addEventListener('click', function(e) {
      scrollHandler(homeTarget);
    });
  });

  storySources[0].addEventListener('click', function(e) {
    scrollHandler(storyTarget);
  });

  weddingDetailSources[0].addEventListener('click', function(e) {
    scrollHandler(weddingDetailsTarget);
  });

  travelSources[0].addEventListener('click', function(event) {
    scrollHandler(travelTarget);
  });

  photoSources[0].addEventListener('click', function(event) {
    scrollHandler(photosTarget);
  });

  registrySources[0].addEventListener('click', function (event) {
    scrollHandler(registryTarget);
  });

  function scrollHandler(target) {
    event.preventDefault();
    scrollTo(document.documentElement, target.offsetTop, 500);
  }

  function scrollTo(element, to, duration) {
    if (duration <= 0) return;
    var difference = to - element.scrollTop;
    var perTick = difference / duration * 10;

    setTimeout(function() {
        element.scrollTop = element.scrollTop + perTick;
        if (element.scrollTop === to) return;
        scrollTo(element, to, duration - 10);
    }, 10);
  }
}

export default linkScroll;