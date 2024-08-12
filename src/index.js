document.addEventListener('DOMContentLoaded', function () {
  var splideImgs = document.querySelectorAll('.splide img');
  var productLinks = document.querySelectorAll('.tvs-product .product-content');
  var productPointers = document.querySelectorAll('.tvs-vehicle-container .overlay .tvs-overlay-vehicle .tvs-overlay-markers .tvs-marker');
  var splide = new Splide('.splide', {
    arrows: false,
    autoWidth:true,
    gap: 10,
    rewind: true,
    pagination: false,
    flickPower: 200,
  });
  splide.mount();
  splide.on('click', function(slide){
    splideImgs.forEach(
      (s,index)=>{
        s.classList.remove("active");
        productLinks[index].classList.remove('active');
        productPointers[index].classList.remove('active');
      }
    )
    slide.slide.querySelector('img').classList.add('active');
    productLinks[slide.index].classList.add('active');
    productPointers[slide.index].classList.add('active');
  });
  productPointers.forEach(
    (pointer,index)=>{
      pointer.addEventListener('click',()=>{
        productPointers.forEach((p)=>{p.classList.remove('active')});
        pointer.classList.add('active');
        splide.go(index);
        splideImgs.forEach(
          (s,ind)=>{
            s.classList.remove("active");
            productLinks[ind].classList.remove('active');
            productPointers[ind].classList.remove('active');
            if(ind == index){
              s.classList.add("active");
            }
          }
        );
        productLinks[index].classList.add('active');
        productPointers[index].classList.add('active');
      })
    }
  );
});