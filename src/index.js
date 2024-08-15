document.addEventListener('DOMContentLoaded', function () {
  var splideImgs = document.querySelectorAll('.splide img');
  var productLinks = document.querySelectorAll('.tvs-product .product-content');
  var productPointers = document.querySelectorAll('.tvs-vehicle-container .overlay .tvs-overlay-vehicle .tvs-overlay-markers .tvs-marker');
  var vehicleContainers = document.querySelectorAll(".tvs-vehicle-container .tvs-overlay-vehicle");
  var vehicleSwapper = document.querySelector(".tvs-overlay-vehicle-swap .swap-button");
  var currentIsInit = true;
  var vehicleTransition = false;
  var splide = new Splide('.splide', {
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
    if(slide.slide.dataset.vhposition == "front" && currentIsInit){
      vehicleSwap();
    }else if(slide.slide.dataset.vhposition == "rear" && !currentIsInit){
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
    if(slide.slide.dataset.vhposition == "front" && currentIsInit){
      vehicleSwap();
    }else if(slide.slide.dataset.vhposition == "rear" && !currentIsInit){
      vehicleSwap();
    }
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
  vehicleSwapper.addEventListener('click', ()=>{
    if(!vehicleTransition){
      vehicleSwap();
    }
  });
  function vehicleSwap(){
    currentIsInit = !currentIsInit;
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