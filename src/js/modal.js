function modal() {
  "use strict";
  var body = document.querySelector("body");
  var modal = document.querySelector("#modal");
  var galleryModal = document.querySelector("#gallery-modal");
  var modalCover = document.querySelector("#modal-cover");
  var closeButton = document.querySelector("#close-button");
  var rsvpOpenButton = document.querySelector("#rsvp-open-button");
  var primaryInput = document.querySelector(".primary-input");
  var galleryTrigger = document.querySelector(".gallery-trigger");
  var nameTab = document.querySelector(".name-tab");
  var rsvpsTab = document.querySelector(".rsvp-tab");
  var loadingTab = document.querySelector(".loading-tab");

  modalCover.addEventListener("click", function() {
    if (!modal.classList.contains('closed')) {
      modal.classList.toggle("closed");
    }
    modalCover.classList.toggle("closed");
    body.style.overflow = "visible";
    resetGalleryModal();
    resetFormTabs();
  });

  rsvpOpenButton.addEventListener("click", function() {
    modal.classList.toggle("closed");
    modalCover.classList.toggle("closed");
    body.style.overflow = "hidden";
    primaryInput.focus();
  });

  galleryTrigger.addEventListener("click", function() {
    galleryModal.classList.toggle("closed");
    modalCover.classList.toggle("closed");
    body.style.overflow = "hidden";
  });

  function resetGalleryModal() {
    if (!galleryModal.classList.contains('closed')) {
      galleryModal.classList.toggle("closed");
    }
  }

  function resetFormTabs() {
    if (nameTab.style.display == 'none') {
      nameTab.style.display = 'block';
    }
    if (rsvpsTab.style.display == 'block') {
      rsvpsTab.style.display = 'none';
    }
    if (loadingTab.style.display == 'block') {
      loadingTab.style.display = 'none';
    }
  }
}

export default modal;