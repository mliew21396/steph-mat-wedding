import hammerjs from 'hammerjs';

function galleryModal() {
	var galleryItemsWrapper = document.querySelector('#gallery-modal .modal-guts');
	var slideIndex = 1;

	setup();

	function setup() {
		bindListeners();
		showSlides(slideIndex);
	}

	function bindListeners() {
		var nextControl = document.querySelector('.next-control');
		var previousControl = document.querySelector('.previous-control');
		var galleryImages = document.querySelectorAll('.my-slides');
		for (var i = galleryImages.length - 1; i >= 0; i--) {
			var mc = new Hammer(galleryImages[i]);
			mc.add( new Hammer.Swipe({ velocity: 0.3, threshold: 1000 }) );

			mc.on('panleft panright tap click', function(event) {
				if (event.type == 'panleft' || event.type == 'tap' || event.type == 'click') {
					plusSlides(1);
				} else if (event.type == 'panright') {
					plusSlides(-1);
				}
			});
		}

		nextControl.addEventListener('click', function() {
			plusSlides(1);
		});

		previousControl.addEventListener('click', function() {
			plusSlides(-1);
		});
	}

	function plusSlides(newSlideIndex) {
		showSlides(slideIndex += newSlideIndex);
	}
	

	function showSlides(newSlideIndex) {
		var i;
		var slides = document.getElementsByClassName("my-slides");

		if (newSlideIndex > slides.length) {
			slideIndex = 1;
		}
		if (newSlideIndex < 1) {
			slideIndex = slides.length;
		}
		for (i = 0; i < slides.length; i++) {
			// slides[i].style.display = "none";
			slides[i].classList.add("closed");
		}
		// slides[slideIndex-1].style.display = "block";
		updateSlideCount(slideIndex, slides.length);
		slides[slideIndex-1].classList.toggle("closed");
	}

	function updateSlideCount(slideIndex, totalSlides) {
		var slideCount = document.querySelector('.slide-count');
		slideCount.innerHTML = parseInt(slideIndex) + '/' + parseInt(totalSlides);
	}
}


export default galleryModal;