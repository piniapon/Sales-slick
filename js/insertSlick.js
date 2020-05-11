$(document).ready(function () {

  $('.slick').slick({
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    adaptiveHeight: true,
    prevArrow: $('.prevBtn'),
    nextArrow: $('.nextBtn'),
  });
});