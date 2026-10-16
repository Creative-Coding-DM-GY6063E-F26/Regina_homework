let minDiameter;
let maxDiameter;
let started = false;


// A day was divided into 24 circles，every 3600 second a new bubles was generated. （There are 86400 seconds in a 24-hour day.）
const maxNumCircles = 24;
const SECONDS_PER_DAY = 86400;
const SECONDS_PER_CIRCLE = SECONDS_PER_DAY / maxNumCircles;

// I breathe one every 3.6 seconds, so I breathe about 17 times per minute. 86400/3.6=24000 times breath a day.
const BREATHS_PER_MINUTE = 17;
const BREATH_PERIOD = 3.6;

// 
const POP_DURATION = 2;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 100);
  maxDiameter =width;
  minDiameter = maxDiameter / 30;
}


function getCircle(i) {
  randomSeed(i * 977 + 13);
  return {
    x: random(-10, 10),
    y: random(-10, 10),
    d: random(minDiameter, maxDiameter),
    hueShift: random(-40, 40),
    segments: floor(random(2, 1)), 
    gap: random(0.2049, 0.9), 
    rotation: random(TWO_PI),
  };
}

// breath period
function breath(secs, phaseOffset) {
  return (1 - cos((TWO_PI * (secs + phaseOffset)) / BREATH_PERIOD)) / 2;
}


function drawBubble(c, scale, baseHue, gap, burst) {
  let h = (baseHue + 180 + c.hueShift + 360) % 360;
  let d = c.d * scale;
  noFill();
  stroke(h, 45, 100, 95);
  strokeWeight(1.5);
  strokeCap(ROUND);

  push();
  translate(width / 2, height / 2);

  if (gap <= 0) {
    ellipse(c.x, c.y, d, d);
  } else {
    let span = TWO_PI / c.segments;
    for (let k = 0; k < c.segments; k++) {
      let a0 = c.rotation + k * span + gap / 2;
      let a1 = c.rotation + (k + 1) * span - gap / 2;
      let mid = (a0 + a1) / 2;
      let ox = cos(mid) * burst;
      let oy = sin(mid) * burst;
      arc(c.x + ox, c.y + oy, d, d, a0, a1);
    }
  }
  pop();
}


function drawBrokenRing(x, y, d, segments, gap, rotation) {
  let span = TWO_PI / segments;
  for (let k = 0; k < segments; k++) {
    let a0 = rotation + k * span + gap / 2;
    let a1 = rotation + (k + 1) * span - gap / 2;
    arc(x, y, d, d, a0, a1);
  }
}

function drawHead(baseHue, b) {
  let h = (baseHue + 180 + b * 60) % 360;
  let s = 1 + 0.03 * b;

  noFill();
  stroke(h, 15, 55, 100);
  strokeWeight(2);

  push();
  translate(width / 2, height / 2 + 15);
  scale(s);
  drawBrokenRing(0, 0, 220, 4, 0.5, 0.3); 
  drawBrokenRing(-90, -105, 105, 3, 0.7, 2.0); 
  drawBrokenRing(90, -105, 105, 3, 0.7, 4.2); 
  pop();
}

function mouseClicked() {
started = !started;
}

function draw() {
  let now = new Date();
  let secs =
    now.getHours() * 3600 +
    now.getMinutes() * 60 +
    now.getSeconds() +
    now.getMilliseconds() / 1000;
  let dayFrac = secs / SECONDS_PER_DAY;

  let baseHue = dayFrac* 360;
  background(baseHue, 18, 100);
  drawHead(baseHue, breath(secs, 0));

  
  if (!started) return;

  let progress = dayFrac * maxNumCircles;
  let fullCircles = floor(progress);
  let partial = progress - fullCircles;
  let secsSinceBirth = partial * SECONDS_PER_CIRCLE;

 
  for (let i = 0; i < fullCircles; i++) {
    let c = getCircle(i);
    let b = breath(secs, -i * 0.05);
    let scale = 1 + 0.03 * b;

    let burst = 0;
    if (i === fullCircles - 1 && secsSinceBirth < POP_DURATION) {
      let t = secsSinceBirth / POP_DURATION;
      burst = 25 * pow(1 - t, 2);
    }
    drawBubble(c, scale, baseHue, c.gap, burst);
  }

  if (fullCircles < maxNumCircles) {
    let c = getCircle(fullCircles);
    let b = breath(secs, 0);
    let scale = partial * (1 + 0.06 * b);
    drawBubble(c, scale, baseHue, 0, 0);
  }
  
}