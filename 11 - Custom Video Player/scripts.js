const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');


function togglePlay() {
    if(video.paused) {
        video.play();
    } else {
        video.pause();
    }
}
function updateButton(){
    console.log('Update the button');
    const icon = this.paused ? '►' : '❚ ❚';
    console.log(icon)
    toggle.textContent = icon;
}

function skip() {
    // dataset gets data tag
    // skip is what is attached
    console.log(this.dataset.skip);
    video.currentTime += parseFloat(this.dataset.skip);
}
function handleRange(){
    video[this.name] = this.value;
    console.log(this.name);
}
// change the property flexBasis
function handleProgress() {
    // get place by dividing times
    const percent =  (video.currentTime / video.duration) * 100;
    // add time to flexBasis as %
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e){
    // get full progress with offsetWidth
     const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
     console.log(scrubTime);
    //  set currentTime to scrubtime
     video.currentTime = scrubTime;
}
video.addEventListener('click',togglePlay);
video.addEventListener('play',updateButton);
video.addEventListener('pause',updateButton);
video.addEventListener('timeupdate', handleProgress);
toggle.addEventListener('click',togglePlay);

skipButtons.forEach((button)=> {
    button.addEventListener('click', skip)
});
ranges.forEach((range)=> {
    range.addEventListener('change', handleRange);
});
ranges.forEach((range)=> {
    range.addEventListener('mousemove', handleRange);
});
let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => {
    // if mousedown is false scrub will not run- only is mouse is held down;
    mousedown && scrub(e);
});
progress.addEventListener('mousedown', () => {
    mousedown = true;
});
progress.addEventListener('mouseup', () => {
    mousedown = false;
});
