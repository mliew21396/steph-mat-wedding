function modal() {
  "use strict";
  var body = document.querySelector("body");
  var modal = document.querySelector("#modal");
  var modalCover = document.querySelector("#modal-cover");
  var closeButton = document.querySelector("#close-button");
  var openButton = document.querySelector("#open-button");

  modalCover.addEventListener("click", function() {
    modal.classList.toggle("closed");
    modalCover.classList.toggle("closed");
    body.style.overflow = "visible";
  });

  openButton.addEventListener("click", function() {
    modal.classList.toggle("closed");
    modalCover.classList.toggle("closed");
    body.style.overflow = "hidden";
  });
}

export default modal;