function loadImages() {
  "use strict";
  const responsiveImages = [];

  const responsiveImage = require("../img/Steph_Mat_Engagement_16.jpg");

  var gallery = document.querySelectorAll("div[class='gallery']");

  var image = document.createElement('img');
  // console.log(responsiveImage.srcSet);

  image.setAttribute("srcSet", responsiveImage.srcSet);
  image.src = responsiveImage.src;
  image.sizes = "(max-width: 400px) 100vw,(max-width: 960px) 75vw, 640px";
  // sizes="(max-width: 400px) 100vw,
  //           (max-width: 960px) 75vw,
  //           640px"

  gallery[0].appendChild(image);

  createRegistryRenditions();
  createSplashRenditions();

  function createRegistryRenditions() {
    const responsiveImage = require("../img/Steph_Mat_Engagement_16.jpg");
    var registry = document.querySelector('section#registry a');
    var image = document.createElement('img');

    image.setAttribute("srcSet", responsiveImage.srcSet);
    image.src = responsiveImage.src;
    image.sizes = "(max-width: 200px) 50vw,(max-width: 480px) 38vw, 100px";
    registry.appendChild(image);
  }

  function createSplashRenditions() {
    const responsiveImage = require("../img/Steph_Mat_Engagement_66.jpg");
    var splash = document.querySelector('.splash');
    var image = document.createElement('img');

    image.setAttribute("srcSet", responsiveImage.srcSet);
    image.src = responsiveImage.src;
    image.sizes = "(max-width: 500px) 100vw,(max-width: 2000px) 100vw, 100px";
    splash.appendChild(image);
  }
}

export default loadImages;