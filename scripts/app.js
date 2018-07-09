// fork getUserMedia for multiple browser versions, for those
// that need prefixes

navigator.getUserMedia = ( navigator.getUserMedia ||
                       navigator.webkitGetUserMedia ||
                       navigator.mozGetUserMedia ||
                       navigator.msGetUserMedia);

// set up forked web audio context, for multiple browsers
// window. is needed otherwise Safari explodes

var audioCtx = new (window.AudioContext || window.webkitAudioContext)();;
var voiceSelect = document.getElementById("voice");
var source;
var stream;

// grab the mute button to use below

var mute = document.querySelector('.mute');

//set up the different audio nodes we will use for the app

var analyser = audioCtx.createAnalyser();
<<<<<<< Updated upstream
var distortion = audioCtx.createWaveShaper();
var gainNode = audioCtx.createGain();
=======
analyser.minDecibels = -90;
analyser.maxDecibels = -10;
analyser.smoothingTimeConstant = 0.85;

var soundSource;

ajaxRequest = new XMLHttpRequest();

ajaxRequest.open('GET', 'https://mdn.github.io/voice-change-o-matic/audio/concert-crowd.ogg', true);

ajaxRequest.responseType = 'arraybuffer';


ajaxRequest.onload = function() {
  var audioData = ajaxRequest.response;

  audioCtx.decodeAudioData(audioData, function(buffer) {
      soundSource = audioCtx.createBufferSource();
    }, function(e){ console.log("Error with decoding audio data" + e.err);});

  //soundSource.connect(audioCtx.destination);
  //soundSource.loop = true;
  //soundSource.start();
};

ajaxRequest.send();
>>>>>>> Stashed changes

// set up canvas context for visualizer

var canvas = document.querySelector('.visualizer');
var canvasCtx = canvas.getContext("2d");

var visualSelect = document.getElementById("visual");

var drawVisual;

//main block for doing the audio recording

if (navigator.getUserMedia) {
   console.log('getUserMedia supported.');
<<<<<<< Updated upstream
   navigator.getUserMedia (
      // constraints - only audio needed for this app
      {
         audio: true
      },

      // Success callback
      function(stream) {
         source = audioCtx.createMediaStreamSource(stream);
         source.connect(analyser);
         analyser.connect(distortion);
         distortion.connect(gainNode);
         gainNode.connect(audioCtx.destination);
        
      	 visualize(stream);
         voiceChange();

      },

      // Error callback
      function(err) {
         console.log('The following gUM error occured: ' + err);
      }
   );
=======
   var constraints = {audio: true}
   navigator.mediaDevices.getUserMedia (constraints)
      .then(
        function(stream) {
           source = audioCtx.createMediaStreamSource(stream);
           source.connect(analyser);
           analyser.connect(audioCtx.destination);

        	 visualize();
      })
      .catch( function(err) { console.log('The following gUM error occured: ' + err);})
>>>>>>> Stashed changes
} else {
   console.log('getUserMedia not supported on your browser!');
}

function visualize(stream) {
  WIDTH = canvas.width;
  HEIGHT = canvas.height;

  analyser.fftSize = 256;
  var bufferLengthAlt = analyser.frequencyBinCount;
  console.log(bufferLengthAlt);
  var dataArrayAlt = new Uint8Array(bufferLengthAlt);

<<<<<<< Updated upstream
  var visualSetting = visualSelect.value;
  console.log(visualSetting);

  if(visualSetting == "sinewave") {
    analyser.fftSize = 2048;
    var bufferLength = analyser.frequencyBinCount;
    var dataArray = new Uint8Array(bufferLength);

    source.connect(analyser);
    analyser.connect(audioCtx.destination);

    canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

    function draw() {

      drawVisual = requestAnimationFrame(draw);

      analyser.getByteTimeDomainData(dataArray);

      canvasCtx.fillStyle = 'rgb(200, 200, 200)';
      canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

      canvasCtx.lineWidth = 2;
      canvasCtx.strokeStyle = 'rgb(0, 0, 0)';

      canvasCtx.beginPath();

      var sliceWidth = WIDTH * 1.0 / bufferLength;
      var x = 0;

      for(var i = 0; i < bufferLength; i++) {
   
        var v = dataArray[i] / 128.0;
        var y = v * HEIGHT/2;

        if(i === 0) {
          canvasCtx.moveTo(x, y);
        } else {
          canvasCtx.lineTo(x, y);
        }

        x += sliceWidth;
      }

      canvasCtx.lineTo(canvas.width, canvas.height/2);
      canvasCtx.stroke();
    };
=======
  canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);
>>>>>>> Stashed changes

  var drawAlt = function() {
    drawVisual = requestAnimationFrame(drawAlt);

<<<<<<< Updated upstream
  } else if(visualSetting == "off") {
    canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);
    canvasCtx.fillStyle = "red";
=======
    analyser.getByteFrequencyData(dataArrayAlt);

    canvasCtx.fillStyle = 'rgb(0, 0, 0)';
>>>>>>> Stashed changes
    canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

    var barWidth = (WIDTH / bufferLengthAlt) * 2.5;
    var barHeight;
    var x = 0;

<<<<<<< Updated upstream
function voiceChange() {
  var voiceSetting = voiceSelect.value;
  console.log(voiceSetting);
  if(voiceSetting == "distortion") {

  }
}
=======
    for(var i = 0; i < bufferLengthAlt; i++) {
      barHeight = dataArrayAlt[i];
>>>>>>> Stashed changes

      canvasCtx.fillStyle = 'rgb(' + (barHeight+100) + ',50,50)';
      canvasCtx.fillRect(x,HEIGHT-barHeight*2,barWidth,barHeight*2);

<<<<<<< Updated upstream
visualSelect.onchange = function() {
  window.cancelAnimationFrame(drawVisual);
  visualize(stream);
}

voiceSelect.onchange = function() {
  voiceChange();
}

mute.onclick = voiceMute;

function voiceMute() {
  gainNode.gain.value = 0;
  console.log(gainNode.gain.value);
}
=======
      x += barWidth + 1;
    }
  };

  drawAlt();

}
>>>>>>> Stashed changes
