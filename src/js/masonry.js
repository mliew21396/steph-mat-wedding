import Masonry from 'masonry-layout';
import imagesLoaded from 'imagesLoaded';

function masonry() {
  var grid = document.querySelector('.grid');
  var msnry;

  imagesLoaded( grid, function() {
    msnry = new Masonry( grid, {
      itemSelector: '.grid-item',
      columnWidth: '.grid-sizer',
      percentPosition: true,
      horizontalOrder: true
    });
  });

  grid.addEventListener("mouseover", function( event ) {
      var body = document.querySelector('body');
      var grid = document.querySelector('.grid');

      body.classList.add("overflow-hidden");
  });

  grid.addEventListener("mouseleave", function( event ) {
      var body = document.querySelector('body');
      var grid = document.querySelector('.grid');

      body.classList.remove("overflow-hidden");
  });
}

export default masonry;