
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
  init_controls();
}

animate_buildOn = function() {
  build_TL = new TimelineMax({delay:0.2, onComplete:killTweens});
  build_TL.to(loader_container, 1.05, {width:250, height:250, top:0, ease:Elastic.easeOut});
  build_TL.to(loader_container, 1.05, {width:2, height:2, top:50, ease:Elastic.easeIn, delay:5.5});
}

animate_wave = function() {
  wave_TL = new TimelineMax({repeat:-1});
  wave_TL.to(wave, 5, {"left":-900, ease:Power0.easeNone});
}

animate_fish = function(){
  // console.log("fish: ", fish);
  fish_TL = new TimelineMax({repeat:-1});
  fish_TL.set(fish, {"left":240, "top":120, scale:0.15, rotation:230});
  fish_TL.to(fish, 1.25, {
    bezier:{
      type:"thru", 
      values:[{"left":240, "top":120}, 
              {"left":120, "top":10}, 
              {"left":10, "top":120}],
      autoRotate:true
    },
    ease:SlowMo.ease.config(0.5, 0.5, false), delay:0.25, scale:1.35});
  // fish_TL.to(ripple, 1.25, {scale:2, alpha:0, ease:Power4.easeOut});
}

killTweens = function() {
  console.log("killTweens", build_TL);
  build_TL.pause();
  wave_TL.pause();
  fish_TL.pause();
}


/* --- Control playback methods --- */

init_controls = function() {
  $("#play").click(function() {
      build_TL.play();
      wave_TL.play();
      fish_TL.play();
  });
      
  $("#pause").click(function() {
      build_TL.pause();
      wave_TL.pause();
      fish_TL.pause();
  });
      
  $("#reverse").click(function() {
      build_TL.reverse();
      wave_TL.reverse();
      fish_TL.reverse();
  });
      
  $("#resume").click(function() {
      build_TL.resume();  
      wave_TL.resume();  
      fish_TL.resume();  
  });
      
  $("#restart").click(function() {
      build_TL.restart();
      wave_TL.restart();
      fish_TL.restart();
  });

  //when the timeline updates, call the update'Slider' function
  build_TL.eventCallback("onUpdate", updateSlider_build);
  wave_TL.eventCallback("onUpdate", updateSlider_wave);
  fish_TL.eventCallback("onUpdate", updateSlider_fish);
    
  $("#slider_build").slider({
    range: false,
    min: 0,
    max: 100,
    step:.1,
    slide: function ( event, ui ) {
      build_TL.pause();
      //adjust the timeline's progress() based on slider value
      build_TL.progress( ui.value/100 );
      }
  });

  $("#slider_wave").slider({
    range: false,
    min: 0,
    max: 100,
    step:.1,
    slide: function ( event, ui ) {
      wave_TL.pause();
      //adjust the timeline's progress() based on slider value
      wave_TL.progress( ui.value/100 );
      }
  }); 

  $("#slider_fish").slider({
    range: false,
    min: 0,
    max: 100,
    step:.1,
    slide: function ( event, ui ) {
      fish_TL.pause();
      //adjust the timeline's progress() based on slider value
      fish_TL.progress( ui.value/100 );
      }
  }); 
      
  function updateSlider_build() {
    $("#slider_build").slider("value", build_TL.progress() *100);
    console.log("slider_build: ", $("#slider_build"));
  } 

  function updateSlider_wave() {
    $("#slider_wave").slider("value", wave_TL.progress() *100);
    console.log("slider_wave: ", $("#slider_build"));
  }  

  function updateSlider_fish() {
    $("#slider_fish").slider("value", fish_TL.progress() *100);
    console.log("slider_fish: ", $("#slider_fish"));
  }   

  // build_TL.progress(1)
}


