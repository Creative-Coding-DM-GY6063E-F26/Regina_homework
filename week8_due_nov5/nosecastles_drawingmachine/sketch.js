/**
 * CASTLE COLORING GAME
 *
 * Move your nose to color in the castle.
 * The paint only shows inside the castle outline, nowhere else.
 *   p - next castle (three in total)
 *   spacebar - clear the painting
 *   s - save a PNG
 */
let vid;
let faceMesh;
let faces = [];

let paintLayer;
let parts = [];

let blue = '#8FEAF7';
let lavender = '#C3A6FF';
let strawberry = '#FF8FB1';
let pistachio = '#9BF2D2';
let lemon = '#FFC24B';
let peach = '#FFB38A';

let castleMakers = [makeCastleA, makeCastleB, makeCastleC];
let castleIndex = 0;

async function setup() {
  createCanvas(640, 480);

  vid = createCapture(VIDEO, { flipped: true });
  vid.size(width, height);
  vid.hide();

  paintLayer = createGraphics(width, height);

  buildCastle();

  faceMesh = await ml5.faceMesh({ maxFaces: 1, flipped: true });
  faceMesh.detectStart(vid, gotFaces);
}

function draw() {
  background('#F5FF7A');

  if (faces.length > 0) {
    let nose = faces[0].keypoints[1];
    paintInsideCastle(nose.x, nose.y);
  }

  image(paintLayer, 0, 0);
  drawOutline();

  image(vid, 0, 0, 160, 120);

  if (faces.length > 0) {
    let nose = faces[0].keypoints[1];
    noFill();
    stroke(40);
    strokeWeight(2);
    circle(nose.x, nose.y, 40);
  }

  noStroke();
  fill(40, 170);
  textAlign(CENTER);
  textSize(14);
  text('p = next castle     space = clear     s = save', width / 2, height - 15);
}

function gotFaces(results) {
  faces = results;
}

function addPart(x, y, w, h, color) {
  parts.push({ x: x, y: y, w: w, h: h, color: color });
}

function addMerlons(x, y, w, color, n) {
  let step = (w - 20) / (n - 1);
  for (let k = 0; k < n; k++) {
    addPart(x + k * step, y - 20, 20, 20, color);
  }
}

function buildCastle() {
  parts = [];
  castleMakers[castleIndex]();
}

function makeCastleA() {
  addPart(220, 220, 200, 160, blue);

  addPart(180, 160, 70, 220, lavender);
  addMerlons(180, 160, 70, lavender, 3);

  addPart(390, 160, 70, 220, strawberry);
  addMerlons(390, 160, 70, strawberry, 3);

  addPart(285, 120, 70, 100, pistachio);
  addMerlons(285, 120, 70, pistachio, 3);

  addPart(300, 300, 40, 80, peach);
}

function makeCastleB() {
  addPart(230, 300, 180, 100, lavender);
  addPart(250, 220, 140, 80, blue);
  addPart(280, 150, 80, 70, pistachio);
  addPart(305, 100, 30, 50, lemon);

  addPart(190, 180, 50, 220, strawberry);
  addMerlons(190, 180, 50, strawberry, 2);

  addPart(400, 180, 50, 220, strawberry);
  addMerlons(400, 180, 50, strawberry, 2);

  addPart(305, 340, 30, 60, peach);
}

function makeCastleC() {
  addPart(170, 270, 300, 130, blue);

  addPart(170, 210, 60, 190, pistachio);
  addMerlons(170, 210, 60, pistachio, 2);

  addPart(410, 210, 60, 190, pistachio);
  addMerlons(410, 210, 60, pistachio, 2);

  addPart(275, 190, 90, 210, lavender);
  addMerlons(275, 190, 90, lavender, 3);

  addPart(295, 230, 20, 30, lemon);
  addPart(325, 230, 20, 30, lemon);

  addPart(305, 330, 30, 70, strawberry);
}

function drawOutline() {
  noFill();
  stroke(40);
  strokeWeight(3);
  rectMode(CORNER);
  parts.forEach((p) => {
    rect(p.x, p.y, p.w, p.h);
  });
}

function paintInsideCastle(x, y) {
  let ctx = paintLayer.drawingContext;
  parts.forEach((p) => {
    ctx.save();
    ctx.beginPath();
    ctx.rect(p.x, p.y, p.w, p.h);
    ctx.clip();
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, TWO_PI);
    ctx.fill();
    ctx.restore();
  });
}

function keyPressed() {
  if (key === 'p' || key === 'P') {
    castleIndex = (castleIndex + 1) % castleMakers.length;
    buildCastle();
    paintLayer.clear();
  }
  if (keyCode === 32) {
    paintLayer.clear();
  }
  if (key === 's') {
    saveCanvas('castle', 'png');
  }
}