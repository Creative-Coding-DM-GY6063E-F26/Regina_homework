
let sounds = [null, null, null, null];
let isPlaying = [false, false, false, false];

async function setup() {
  createCanvas(400, 400);

  sounds[0] = await loadSound('floodlight.ogg');
  sounds[1] = await loadSound('tranquil.mp3');
  sounds[2] = await loadSound('doomed-drone.wav');
  sounds[3] = await loadSound('bell-from-heaven.mp3');
}

function draw() {
  background(220);

  textSize(20);
  fill(0);

  text("A - Floodlight", 50, 100);
  text("S - Tranquil", 50, 150);
  text("D - Doomed Drone", 50, 200);
  text("F - Heaven Bell", 50, 250);
}

function keyPressed() {
  userStartAudio();

  if (key === 'a') {
    toggleSound(0);
  } else if (key === 's') {
    toggleSound(1);
  } else if (key === 'd') {
    toggleSound(2);
  } else if (key === 'f') {
    toggleSound(3);
  }
}

function toggleSound(index) {
  if (isPlaying[index] === false) {
    sounds[index].play();
    isPlaying[index] = true;
  } else {
    sounds[index].stop();
    isPlaying[index] = false;
  }
}
