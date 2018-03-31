import hammerjs from 'hammerjs';

function galleryModal() {
	var galleryItemsWrapper = document.querySelector('#gallery-modal .modal-guts');
	var slideIndex = 1;

	setup();

	function setup() {
		bindListeners();
		showSlide(slideIndex);
	}

	function bindListeners() {
		var nextControl = document.querySelector('.next-control');
		var previousControl = document.querySelector('.previous-control');
		var galleryImages = document.querySelectorAll('.my-slides');
		for (var i = galleryImages.length - 1; i >= 0; i--) {
			var mc = new Hammer(galleryImages[i]);
			mc.add( new Hammer.Swipe({ velocity: 0.8, threshold: 1000 }) );

			mc.on('panleft panright tap click', changeSlide);
		}
		var mcNext = new Hammer(nextControl);
		mcNext.add( new Hammer.Swipe({ velocity: 0.8, threshold: 1000 }) );
		mcNext.on('tap click', changeToNextSlide);


		var mcPrevious = new Hammer(previousControl);
		mcPrevious.add( new Hammer.Swipe({ velocity: 0.8, threshold: 1000 }) );
		mcPrevious.on('tap click', changeToPreviousSlide);
	}

	function changeSlide(event) {
		if (event.type == 'panleft' || event.type == 'tap' || event.type == 'click') {
			changeToNextSlide();
		} else if (event.type == 'panright') {
			changeToPreviousSlide();
		}
	}

	function changeToNextSlide() {
		showSlide(slideIndex += 1);
	}

	function changeToPreviousSlide() {
		showSlide(slideIndex += -1);
	}

	function showSlide(newSlideIndex) {
		var slides = document.getElementsByClassName("my-slides");

		if (newSlideIndex > slides.length) {
			slideIndex = 1;
		}
		if (newSlideIndex < 1) {
			slideIndex = slides.length;
		}
		for (var i = 0; i < slides.length; i++) {
			slides[i].classList.add("closed");
		}
		updateSlideCount(slideIndex, slides.length);
		slides[slideIndex-1].classList.toggle("closed");
	}

	function updateSlideCount(slideIndex, totalSlides) {
		var slideCount = document.querySelector('.slide-count');
		slideCount.innerHTML = parseInt(slideIndex) + '/' + parseInt(totalSlides);
	}
}


export default galleryModal;