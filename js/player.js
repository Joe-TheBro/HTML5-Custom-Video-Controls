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
var vidplay = false;
var audhover = false;
var parhover = false;
var parwhile = true;
var audslidtimeout;
var timeout;
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
parent.addEventListener("mouseenter", function() {
parhover = true;
parent.onmousemove = function(){
  clearTimeout(timeout);
  vidcontrol.style.opacity = ".9";
  parent.style.cursor = "default";
  timeout = setTimeout(function(){
  parent.style.cursor = "none";
  vidcontrol.style.opacity = "0";
  }, 3000);
}
});
parent.addEventListener("mouseleave", function () {
  parhover = false;
  clearTimeout(timeout);
  vidcontrol.style.opacity = "0";
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
  }
  else{
      vid.pause();
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
var spanCurrentTime = document.getElementById('time-current');
var spanDuration = document.getElementById('time-duration');
var videoDuration = vid.duration;
var videoCurrentTime = vid.currentTime;
