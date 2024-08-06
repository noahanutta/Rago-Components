document.addEventListener('DOMContentLoaded', function () {
  var splide = new Splide('.splide', {
    arrows: false,
    autoWidth:true,
    gap: 10,
    rewind: true,
    pagination: false,
    flickPower: 200,
  });
  splide.mount();
});