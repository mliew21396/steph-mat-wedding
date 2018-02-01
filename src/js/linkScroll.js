function linkScroll () {
  "use strict";
  var homeSources = document.querySelectorAll("a[href='#home']");
  var homeTarget = document.getElementById("home");
  var storySources = document.querySelectorAll("a[href='#story']");
  var storyTarget= document.getElementById("story");
  var weddingDetailSources = document.querySelectorAll("a[href='#schedule']");
  var weddingDetailsTarget = document.getElementById("schedule");
  var photoSources = document.querySelectorAll("a[href='#photos']");
  var photosTarget = document.getElementById("photos");
  // var rsvpSources = document.querySelectorAll("a[href='#rsvp']");
  // var rsvpTarget = document.getElementById("rsvp");
  var registrySources = document.querySelectorAll("a[href='#registry']");
  var registryTarget = document.getElementById("registry");

  // var sources = [home, story, weddingDetails, photos, rsvp, registry];
  // var targets =  [homeTarget, storyTarget, weddingDetailsTarget, photosTarget, rsvpTarget, registryTarget];

  homeSources.forEach(function(homeSource) {
    homeSource.addEventListener('click', function(e) {
      scrollHandler(homeTarget);
    });
  });

  storySources[0].addEventListener('click', function(e) {
    scrollHandler(storyTarget);
  });

  // for (let i = 0; i < weddingDetails.length; i++) {
    weddingDetailSources[0].addEventListener('click', function(e) {
      scrollHandler(weddingDetailsTarget);
    });
  // }

  // for (let i = 0; i < photos.length; i++) {
    photoSources[0].addEventListener('click', function(event) {
      scrollHandler(photosTarget);
    });
  // }

  // for (let i = 0; i < rsvp.length; i++) {
    // rsvpSources[0].addEventListener('click', function(event) {
    //   scrollHandler(rsvpTarget);
    // });
  // }

  // for (let i = 0; i < registry.length; i++) {
    registrySources[0].addEventListener('click', function (event) {
      scrollHandler(registryTarget);
    });
  // }

  function assignListeners(sources, targets) {
    for (var i = 0; i < sources.length; i++) {
      // for (var j = 0; j < sources[i].length; i++) {
      //   sources[i][j].addEventListener('click', function (event) {
      //     scrollHandler(targets[i][j])
      //   }
      // }
      processListeners(sources[i], i);
    }
  }

  function processListeners(sections, count) {
    for (var j = 0; j < sections.length; j++) {
      console.log("lkj");
      // console.log(sections);
      // sections[j].addEventListener('click', function (event) {
    //     // scrollHandler(targets[count])
      // }
    }
  }

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