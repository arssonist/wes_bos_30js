const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo(){
    navigator.mediaDevices.getUserMedia({ video: true, audio:false })
        .then(localMediaStream => {
            console.log(localMediaStream)
            // change src attr on video obj
            video.src = window.URL.createObjectURL(localMediaStream);
            // use .play() function to stream
            video.play()
        })
        .catch((err) => {
            console.error('There is an error '+ err)
        })
}
getVideo();
function paintToCanvas(){
    const width = video.videoWidth;
    const height = video.videoHeight;
    // make canvas same size as video`
    canvas.width = width;
    canvas.height = height;

    // set time for redrawing of canvas
    // context.drawImage(img,x,y,width,height);

    return setInterval(() => {
      ctx.drawImage(video, 0, 0, width, height);
      // take pixels out
      let pixels = ctx.getImageData(0,0,width,height);
      // mess with them using a loop function below

      // pixels = redEffect(pixels);

      // pixels = rgbSplit(pixels);

      pixels = greenScreen(pixels);

      // adds frames a little delayed
      // ctx.globalAlpha = 0.1

      // put them back on canvas
      ctx.putImageData(pixels,0,0);

  },16)
}

function takePhoto() {
    // play sound
    snap.currentTime = 0;
    snap.play()
    // take data out of canvas
    const data = canvas.toDataURL('image/jpeg')
    console.log(data);
    // make link to get image
    const link = document.createElement('a');
    link.href = data;
    link.setAttribute('download', 'handsome');
    // set text for download button
    // link.textContent = 'Download Image';
    // make photo appear on page
    link.innerHTML = `<img src="${data}" alt="handsome dude"/>`;
    // like .prepend()
    strip.insertBefore(link,strip.firstChild);

}

function redEffect(pixels){
    for (let i = 0; i < pixels.data.length; i+=4) {
        pixels.data[i + 0] = pixels.data[i + 0] + 100;//red
        pixels.data[i + 1] = pixels.data[i + 1] - 100//green
        pixels.data[i + 2] = pixels.data[i + 2] * 0.5//blue
    }
    return pixels;
}
function rgbSplit(pixels) {
  for(let i = 0; i < pixels.data.length; i+=4) {
    pixels.data[i - 150] = pixels.data[i + 0]; // RED
    pixels.data[i + 100] = pixels.data[i + 1]; // GREEN
    pixels.data[i - 150] = pixels.data[i + 2]; // Blue
  }
  return pixels;
}
function greenScreen(pixels) {
  const levels = {};

  document.querySelectorAll('.rgb input').forEach((input) => {
    levels[input.name] = input.value;
  });
  console.log(levels)

  for (i = 0; i < pixels.data.length; i = i + 4) {
    red = pixels.data[i + 0];
    green = pixels.data[i + 1];
    blue = pixels.data[i + 2];
    alpha = pixels.data[i + 3];

    if (red >= levels.rmin
      && green >= levels.gmin
      && blue >= levels.bmin
      && red <= levels.rmax
      && green <= levels.gmax
      && blue <= levels.bmax) {
      // take it out!
      pixels.data[i + 3] = 0;
    }
  }

  return pixels;
}

video.addEventListener('canplay', paintToCanvas)
