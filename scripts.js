// Get elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

// build functions
function togglePlay() {
video.paused ? video.play() : video.pause();
}

function updateButton(){
	toggle.textContent = this.paused ? '►': '❚ ❚';
}

function skip(){
	console.log(this.dataset.skip);
	video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate(){
	if(!isPressed) return;
	console.log(this.value);
	console.log(this.name);
	video[this.name] = this.value;
}

function handleProgress(){
	const percent = (video.currentTime / video.duration) * 100;
	progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e){
	console.log(e);
	const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
	video.currentTime = scrubTime;
}

// hook up the event listeners
video.addEventListener("click", togglePlay);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
toggle.addEventListener("click", togglePlay);

video.addEventListener("timeupdate", handleProgress);

skipButtons.forEach(element => {
	element.addEventListener("click", skip);
});

ranges.forEach(element => {
	element.addEventListener("change", handleRangeUpdate);
});

ranges.forEach(element => {
	element.addEventListener("mousemove", handleRangeUpdate);
});

let isPressed = false;

ranges.forEach(element => {
	element.addEventListener("mousedown", (e) => isPressed = true);
});

ranges.forEach(element => {
	element.addEventListener("mouseup", (e) => isPressed = false);
});

progress.addEventListener("click", scrub);