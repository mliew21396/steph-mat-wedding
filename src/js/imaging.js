import lazySizes from 'lazySizes';
import imageConstants from './imageConstants.js';


function loadImages() {
  "use strict";
  // Gallery
  // Side Image
  for (const key of Object.keys(imageConstants.gallerySideImages)) {
    var sideImageFile = imageConstants.gallerySideImages[key].imageFile;
    var sideImageSizes = imageConstants.gallerySideImages[key].imageSizes;
    var sideParentSelector = imageConstants.gallerySideImages[key].parentSelector;
    var sideClassName = imageConstants.gallerySideImages[key].className;
    var sideMainImageSizes = imageConstants.gallerySideImages[key].mainImageSizes;

    createMasonryRenditions(sideImageFile, sideParentSelector, sideImageSizes, sideClassName, sideMainImageSizes);
  }
  // First Main Image
  createRenditions(imageConstants.galleryMainImage.imageFile,imageConstants.galleryMainImage.parentSelector, imageConstants.galleryMainImage.imageSizes, imageConstants.galleryMainImage.className);
  // Gallery Modal Image
  for (const key of Object.keys(imageConstants.galleryModalImages)) {
    var modalImageFile = imageConstants.galleryModalImages[key].imageFile;
    var modalImageSizes = imageConstants.galleryModalImages[key].imageSizes;
    var modalParentSelector = imageConstants.galleryModalImages[key].parentSelector;
    var modalClassName = imageConstants.galleryModalImages[key].className;
    var modalMainImageSizes = imageConstants.galleryModalImages[key].mainImageSizes;

    createMasonryRenditions(modalImageFile, modalParentSelector, modalImageSizes, modalClassName, modalMainImageSizes);
  }

  function createRenditions(imageFile, parentSelector, imageSizes, className) {
    const responsiveImage = require("../img/responsive/" + imageFile);
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
    const responsiveImage = require("../img/responsive/" + imageFile);
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