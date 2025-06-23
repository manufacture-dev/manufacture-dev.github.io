// Preloader js    
$(window).on('load', function () {
  $('.preloader').fadeOut(100);
});

(function ($) {
  'use strict';

  const $form = $('#static-form');

  if ($form.length) {
    $form.on('submit', function (e) {
      e.preventDefault();

      $('#sent').hide();
      $('#error').hide();

      const formData = new FormData(this);

      $.ajax({
        url: $form.attr('action'),
        method: 'POST',
        data: formData,
        processData: false,
        contentType: false
      })
          .done(function () {
            $('#sent').show();
          })
          .fail(function () {
            $('#error').show();
          });
    });
  }

  // Product slider
  $('.product-image-slider').slick({
    autoplay: false,
    infinite: true,
    arrows: false,
    dots: true,
    customPaging: function (slider, i) {
      var image = $(slider.$slides[i]).data('image');
      return '<img class="img-fluid" src="' + image + '" alt="product-image">';
    }
  });

  // Product slider
  $('.product-slider').slick({
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    dots: false,
    arrows: false,
    responsive: [{
        breakpoint: 1024,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  });

})(jQuery);