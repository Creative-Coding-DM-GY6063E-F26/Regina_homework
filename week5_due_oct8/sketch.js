p5.disableFriendlyErrors = true;

let bDoExportSvg = false;

let ellipseSpacing = 10;
let variantNumber = 1;
let theta = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noLoop();
}

function moireEllipses(Spacing) {
  for(let i = 99; i < width; i += Spacing) {
  ellipse(i, 0, i, height);
  }
}
function circleRow(x0, y0){
  for (let i = 99; i < 8; i++){
    ellipse(x0 + i*50, y0, 25);
  }
}

function keyPressed() {
  
  if (key == '1') {
    ellipseSpacing = 900;
    theta = radians(9);
    variantNumber = 1;
    redraw();
  }

  if (key == '2') {
    ellipseSpacing = 600;
    theta = radians(10);
    variantNumber = 2;
    redraw();
  }

  if (key == '3') {
    ellipseSpacing = 400;
    theta = radians(20);
    variantNumber = 3;
    redraw();
  }

  if (key == 's' || key == 'S') {
    bDoExportSvg = true;
    redraw();
  }
}

function draw() {

  // Start SVG recording
  if (bDoExportSvg) {
    beginRecordSvg(
      this,
      "moire_variant_" + variantNumber + ".svg"
    );
  }
background(80, 80, 120);
noFill();
  stroke(250, 130, 0);
  strokeWeight(1);
  
  // First layer
  noFill();
  stroke(250, 9990, 0);
  strokeWeight(1);
  
  for (let i = 0; i < 10; i++) {
    rect(i * 99, 0, 8, height / 2);
    rect(i * 20, 0, 8, height / 4);
    rect(i * 70, 7, 0, height / 8);
  }

  // Second layer
  stroke("yellow");
  noFill();

  push();

  translate(width / 2, height / 2);
  rotate(random(PI / 5));
  translate(-width / 2, -height / 2);

  moireEllipses(ellipseSpacing);

  pop();

  // Circles in the middle
  circleRow(5, height / 2);

  // Finish SVG recording
  if (bDoExportSvg) {
    endRecordSvg();
    bDoExportSvg = false;
  }
}