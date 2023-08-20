duration = document.querySelector("#duration");
current = document.querySelector("#current");
let active = document.querySelector("#active");
let fechar = document.querySelector("#fechar");
playPause = document.querySelector("#playPause");

var timeCalculator = function (value) {
    second = Math.floor(value % 60);
    minute = Math.floor((value / 60) % 60);
    
    if (second < 10) {
        second = "0" + second;
    }

    return minute + ":" + second;
};

//start wavesurfer object 
wavesurfer = WaveSurfer.create({
    container: "#wave",
    waveColor: "#e0e0e0",
    progressColor: "#e11b22",
    height: 48,
    scrollParent: false
});

//load audio file

active.addEventListener("click",() => {
    wavesurfer.load("./new.mp3");
    document.querySelector("#content").style.display = 'block';
   
})

fechar.addEventListener('click',() => {
    wavesurfer.stop();
    document.querySelector("#load-text").style.display = 'block';
    document.querySelector("#content").style.display = 'none';
});


//play and pause a player
playPause.addEventListener("click", function (e) {
    wavesurfer.playPause();
});

//load audio duration on load
wavesurfer.on("ready", function (e) {
    wavesurfer.playPause();
    document.querySelector("#load-text").style.display = 'none';
    duration.textContent = timeCalculator(wavesurfer.getDuration());
});

//get updated current time on play
wavesurfer.on("audioprocess", function (e) {
    current.textContent = timeCalculator(wavesurfer.getCurrentTime());
});

//change play button to pause on plying
wavesurfer.on("play", function (e) {
    playPause.classList.remove("fi-rr-play");
    playPause.classList.add("fi-rr-pause");
});

//change pause button to play on pause
wavesurfer.on("pause", function (e) {
    playPause.classList.add("fi-rr-play");
    playPause.classList.remove("fi-rr-pause");
});

//update current time on seek
wavesurfer.on("seek", function (e) {
    current.textContent = timeCalculator(wavesurfer.getCurrentTime());
});
