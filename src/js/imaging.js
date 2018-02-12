import lazySizes from 'lazySizes';
import imageConstants from './imageConstants.js';


function loadImages() {
  "use strict";
  // Splash
  createRenditions(imageConstants.splashImage.imageFile,
    imageConstants.splashImage.parentSelector,
    imageConstants.splashImage.imageSizes);
  createRenditions(imageConstants.splashArrow.imageFile, imageConstants.splashArrow.parentSelector, imageConstants.splashArrow.imageSizes, imageConstants.splashArrow.className);
  // Gallery
    // Side Image
  for (const key of Object.keys(imageConstants.gallerySideImages)) {
      var imageFile = imageConstants.gallerySideImages[key].imageFile;
      var imageSizes = imageConstants.gallerySideImages[key].imageSizes;
      var parentSelector = imageConstants.gallerySideImages[key].parentSelector;
      var className = imageConstants.gallerySideImages[key].className;
      var mainImageSizes = imageConstants.gallerySideImages[key].mainImageSizes;

      createMasonryRenditions(imageFile, parentSelector, imageSizes, className, mainImageSizes);
  }
    //First Main Image
  createRenditions(imageConstants.galleryMainImage.imageFile,imageConstants.galleryMainImage.parentSelector, imageConstants.galleryMainImage.imageSizes, imageConstants.galleryMainImage.className);
  // Registry
  createRenditions(imageConstants.registryImage.imageFile, imageConstants.registryImage.parentSelector, imageConstants.registryImage.imageSizes);

  function createRenditions(imageFile, parentSelector, imageSizes, className) {
    const responsiveImage = require("../img/" + imageFile);
    var parentElement = document.querySelector(parentSelector);
    var image = document.createElement('img');

    image.className = className || "";
    image.setAttribute("data-srcSet", responsiveImage.srcSet);
    image.setAttribute("data-src", responsiveImage.src);
    image.sizes = imageSizes;
    image.classList.add("lazyload");
    parentElement.appendChild(image);
  }

  function createMasonryRenditions(imageFile, parentSelector, imageSizes, className, mainImageSizes) {
    const responsiveImage = require("../img/" + imageFile);
    var parentElement = document.querySelector(parentSelector);
    var imageWrapper = document.createElement('div');
    var image = document.createElement('img');

    imageWrapper.className = className || "";
    image.setAttribute("srcSet", responsiveImage.srcSet);
    image.setAttribute("src", responsiveImage.src);
    image.sizes = imageSizes;
    image.style.display = "block";
    imageWrapper.appendChild(image);
    parentElement.appendChild(imageWrapper);

    image.addEventListener("click", function() {
      var mainImage = document.querySelector(".grid-main-item");

      if (mainImage != null) {
        var newMainImage = image.cloneNode(true);

        newMainImage.className += " " + "grid-main-item";
        newMainImage.sizes = mainImageSizes;
        newMainImage.style.display = "block";
        mainImage.parentNode.replaceChild(newMainImage,mainImage);
      }
    });
  }
}

export default loadImages;