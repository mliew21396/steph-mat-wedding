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

  var touchEvent = 'ontouchstart' in window ? 'touchstart' : 'click';
  console.log(touchEvent)

  homeSources.forEach(function(homeSource) {
    homeSource.addEventListener(touchEvent, function(e) {
      console.log('home')
      scrollHandler(homeTarget);
    });
  });

  storySources[0].addEventListener(touchEvent, function(e) {
    console.log('story')
    scrollHandler(storyTarget);
  });

  weddingDetailSources[0].addEventListener(touchEvent, function(e) {
    scrollHandler(weddingDetailsTarget);
  });

  travelSources[0].addEventListener(touchEvent, function(event) {
    scrollHandler(travelTarget);
  });

  photoSources[0].addEventListener(touchEvent, function(event) {
    scrollHandler(photosTarget);
  });

  registrySources[0].addEventListener(touchEvent, function (event) {
    scrollHandler(registryTarget);
  });

  function scrollHandler(target) {
    console.log('scrollHandler')
    event.preventDefault();
    scrollTo(document.scrollingElement, target.offsetTop, 500);
  }

  function scrollTo(element, to, duration) {
    console.log('scrollTo')
    console.log(duration)
    console.log(element)
    console.log(to)
    if (duration <= 0) return;
    console.log('difference', difference)
    var difference = to - element.scrollTop;
    console.log('perTick', perTick)
    var perTick = difference / duration * 10;

    setTimeout(function() {
        console.log('setTimeout')
        console.log(element.scrollTop)
        element.scrollTop = element.scrollTop + perTick;
        if (element.scrollTop === to) return;
        scrollTo(element, to, duration - 10);
    }, 10);
  }
}

export default linkScroll;