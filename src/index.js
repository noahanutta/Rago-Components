document.addEventListener('DOMContentLoaded', function () {
  var splideImgs = document.querySelectorAll('.tvs .splide img');
  var productLinks = document.querySelectorAll('.tvs .tvs-product .product-content');
  var productPointers = document.querySelectorAll('.tvs .tvs-vehicle-container .tvs-overlay .tvs-overlay-vehicle .tvs-overlay-markers .tvs-marker');
  var vehicleContainers = document.querySelectorAll(".tvs .tvs-vehicle-container .tvs-overlay-vehicle");
  var vehicleSwapper = document.querySelector(".tvs .tvs-overlay-vehicle-swap .swap-button");
  var currentIsInit = true;
  var vehicleTransition = false;
  var currentIndex = 0;
  var imgTwoStart = -1;
  var splide = new Splide('.tvs .splide', {
    arrows: false,
    autoplay:true,
    focus:'center',
    trimSpace:false,
    interval:4000,
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
    if(slide.slide.dataset.vhposition == "rear" && currentIsInit){
      vehicleSwap();
    }else if(slide.slide.dataset.vhposition == "front" && !currentIsInit){
      vehicleSwap();
    }
    productLinks[slide.index].classList.add('active');
    productPointers[slide.index].classList.add('active');
  });
  splide.on('active', function(slide){
    splideImgs.forEach(
      (s,index)=>{
        s.classList.remove("active");
        productLinks[index].classList.remove('active');
        productPointers[index].classList.remove('active');
      }
    )
    slide.slide.querySelector('img').classList.add('active');
    if(slide.slide.dataset.vhposition == "rear" && currentIsInit){
      vehicleSwap();
    }else if(slide.slide.dataset.vhposition == "front" && !currentIsInit){
      vehicleSwap();
    }
    productLinks[slide.index].classList.add('active');
    productPointers[slide.index].classList.add('active');
    currentIndex = slide.index;
  });
  productPointers.forEach(
    (pointer,index)=>{
      if(pointer.dataset.vhposition == "rear" && imgTwoStart == -1){
        imgTwoStart = index;
      }
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
  vehicleSwapper.addEventListener('click', ()=>{
    if(!vehicleTransition){
      vehicleSwap();
    }
  });
  function vehicleSwap(){
    currentIsInit = !currentIsInit;
    if(currentIsInit){
      splide.go(0);
    }else{
      splide.go(imgTwoStart);
    }
    vehicleContainers.forEach(
      (container)=>{
        if(container.classList.contains("active")){
          container.classList.remove("active");
        }else{
          container.classList.add("active");
        }
      }
    );
    vehicleTransition = true;
    setTimeout(()=>{vehicleTransition=false;},1001);
  }
});