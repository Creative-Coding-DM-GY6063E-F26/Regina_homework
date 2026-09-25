function setup() {
  createCanvas(windowWidth, windowHeight);
  noLoop();
}

function draw() {
  background(45, 20, 120);

    push();
  scale(4.9);

  quad(20, 50, 80, 30, 80, 70, 20, 70);

  line(-40, 20, 250, 10);
  line(-40, 80, 200, 60);

  // Draw the triangle.
  triangle(70, 90, 
           8, 20, 
           36+34, 25+30);
  
  fill(200);

  // Draw the triangle .
  triangle(70, 90, 
           70-8+70, 20, 
           70-36+70-34, 25+30);
  
  // Bottom-right.
  arc(50, 55, 50, 50, 0, HALF_PI);

  noFill();

  // Bottom-left.
  arc(50, 55, 60, 60, HALF_PI, PI);

  // Top-left.
  arc(50, 55, 70, 70, PI, PI + QUARTER_PI);

  // Top-right.
  arc(50, 55, 80, 80, PI + QUARTER_PI, TWO_PI);
  

  // Style the line.
  stroke('magenta');
  strokeWeight(6);


  line(40, 20, 40, 75);

  
  // Style the line.
  stroke('magenta');
  strokeWeight(2);
  line(125, 3, 125, 55);

  strokeWeight(5);

  line(10, 40, 80, 40);

  
  rect(30, 70, 80, 40);

  ellipse(30, 100, 50, 10);

  line(100,30,
       100,5);

  // Create a p5.Color object using a HSL color string.
  let c1 = color('hsl(165, 8%, 72%)');
  // Draw the left quad.
  noStroke();
  fill(c1);
  quad(0, 5, -8, 30, 100, 160, 20, 70);

   pop();
  
}