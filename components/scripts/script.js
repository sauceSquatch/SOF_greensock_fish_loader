
$(document).ready(function()
{
  initBuild();
})

///// INIT
var loader_container = $(".loader_container"),
    wave = $(".wave_container"),
    fish = $("#loader_fish"),
    ripple = $(".ripple");


///// INIT build
initBuild = function() {
  animate_buildOn();
  animate_wave();
  animate_fish();
}

animate_buildOn = function() {
  build_TL = new TimelineMax();
  build_TL.to(loader_container, 1.05, {width:250, height:250, top:0, ease:Elastic.easeOut});
  build_TL.to(loader_container, 1.05, {width:2, height:2, top:50, ease:Elastic.easeIn, delay:10});
}

animate_wave = function() {
  wave_timeline = new TimelineMax({repeat:-1});
  wave_timeline.to(wave, 5, {"left":-900, ease:Power0.easeNone});
}

animate_fish = function(){
  // console.log("fish: ", fish);
  fish_timeline = new TimelineMax({repeat:-1});
  fish_timeline.set(fish, {"left":240, "top":120, scale:0.15, rotation:230});
  fish_timeline.to(fish, 1.25, {
    bezier:{
      type:"thru", 
      values:[{"left":240, "top":120}, 
              {"left":120, "top":10}, 
              {"left":10, "top":120}],
      autoRotate:true
    },
    ease:SlowMo.ease.config(0.5, 0.5, false), delay:0.25, scale:1.35});
  // fish_timeline.to(ripple, 1.25, {scale:2, alpha:0, ease:Power4.easeOut});
}
