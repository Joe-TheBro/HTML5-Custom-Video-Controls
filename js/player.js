var $playercontrol = $("#playpause");
var $time = $("#time");
var vidcontrol = document.getElementById("vidcontrols");
var $fullscreen = $("#fullscreen");
var $vid = $("#vid");
var $parent = $("#parent");
var vid = document.getElementById('vid');
var audio = document.getElementById('audio');
var $audiobar = $("#volume-slider");
var audiobar = document.getElementById("volume-panel");
var parent = document.getElementById("parent");
var playpbutton = document.getElementById("playpbutton");
var volumebutton = document.getElementById("volumebt");
var spanCurrentTime = document.getElementById('time-current');
var spanDuration = document.getElementById('time-duration');
var videoDuration;
var videoCurrentTime;
var vidplay = false;
var audhover = false;
var parhover = false;
var parwhile = true;
var audslidtimeout;
var volume;
var timeout;
var savedVolume;
var parinterval;
var interval;
vid.addEventListener("play", function(){
vidplay = true;
});
vid.addEventListener("playing", function(){
vidplay = true;
});
audio.addEventListener("mouseover", function(){
audhover = true;
audiobarshow();
});
audio.addEventListener("mouseout", function(){
audhover = false;
audiobarhide();
});
$(document).ready(function(){
  setTimeout(function(){
    videoDuration = vid.duration;
    spanDuration.innerHTML = videoDuration;
  }, 100);
  interval = setInterval(function(){
    if(spanCurrentTime != videoCurrentTime){
      spanCurrentTime.innerHTML = videoCurrentTime;
    }
volume = vid.volume;
if(volume != 0){
  savedVolume = volume;
}
if(volume == 0 && volumebutton.innerHTML != "volume_off"){
  volumebutton.innerHTML = "volume_off";
}
else if (volume < 0.5 && volume != 0 && volumebutton.innerHTML != "volume_down"){
  volumebutton.innerHTML = "volume_down";
}
else if (volume > 0.5 && volumebutton.innerHTML != "volume_up"){
  volumebutton.innerHTML = "volume_up";
}
if(videoCurrentTime != vid.currentTime){
  videoCurrentTime = vid.currentTime;
}
  }, 10);
});

parent.addEventListener("mouseenter", function() {
parhover = true;
parent.onmousemove = function(){
  clearTimeout(timeout);
  vidcontrol.style.opacity = ".9";
  parent.style.cursor = "default";
  timeout = setTimeout(function(){
    if(vidplay == true){
      parent.style.cursor = "none";
      vidcontrol.style.opacity = "0";
    }
  }, 2500);
}
});
parent.addEventListener("mouseleave", function () {
  parhover = false;
  clearTimeout(timeout);
  vidcontrol.style.opacity = "0";
});
volumebutton.addEventListener("click", function () {
  console.log("clicked");
  if(volume != 0){
    vid.volume = 0;
  }
  else{
    vid.volume = savedVolume;
  }
});
// parent.onmousemove = function(){
//   clearTimeout(timeout);
//   timeout = setTimeout(function(){parent.style.cursor = "none";}, 2000);
// }
// This mans is a FUCKING LEGEND -------> codepen.io/garethdweaver/pen/EjqNxO, helped a lot.
function audiobarshow() {
  if (audslidtimeout != null) {
    clearTimeout(audslidtimeout);
  }
  audiobar.style.width = "73px";
}
function audiobarhide(){
  audslidtimeout = setTimeout(function(){
   audiobar.style.width = "0";
  }, 300);
}
// $audio.hover(function(){
//        audiobar.style.setProperty("--audio-bar-width", '100px');
// }, function(){
//     audiobar.style.setProperty("--audio-bar-width", "1px");
//     $audiobar.hide();
// });
$playercontrol.click(function(){
  if(!vidplay){
      vid.play();
      playpbutton.innerHTML = "pause";
  }
  else{
      vid.pause();
      playpbutton.innerHTML = "play_arrow";
      vidplay = false;
  }
});
$fullscreen.click(function(){
   fullscreen();
});
function fullscreen() {
  var isInFullScreen =
    (document.fullscreenElement && document.fullscreenElement !== null) ||
    (document.webkitFullscreenElement &&
      document.webkitFullscreenElement !== null) ||
    (document.mozFullScreenElement && document.mozFullScreenElement !== null) ||
    (document.msFullscreenElement && document.msFullscreenElement !== null);

  var vid = document.getElementById('vid');
  if (!isInFullScreen) {
    if (vid.requestFullscreen) {
      vid.requestFullscreen();
    } else if (vid.mozRequestFullScreen) {
      vid.mozRequestFullScreen();
    } else if (vid.webkitRequestFullScreen) {
      vid.webkitRequestFullScreen();
    } else if (vid.msRequestFullscreen) {
      vid.msRequestFullscreen();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  }
}

