function setup() {
    createCanvas(400, 400);
    background(220);
}

function draw() {

}

function mousePressed() {
    drawRandomCircle();
}

function drawRandomCircle(x=random(width), y=random(height), r=random(10, 50)) {
    fill(random(255), random(255), random(255));
    ellipse(x, y, r*2, r*2);

}