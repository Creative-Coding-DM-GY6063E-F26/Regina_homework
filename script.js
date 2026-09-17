// change the quotes in this array. Be mindful of the quotation marks!
// this is the only part of the file you need to edit!
const quotes = [
  { text: "combining programming techniques with artistic expression in order to create aesthetically pleasing and optimized interactive digital experiences.", source: "Meadows School of the Arts" },
  { text: "Creative Coding is an approach to programming computers in which the primary goal is to create an aesthetic or expressive experience.", source: "The College of New Jersey" },
  { text: "Creative coding is basically using code for artistic expression instead of it being simply functional.", source: "Tinna Lyngholm Thomsen" },
  { text: "A critical conversation between human and machine. A journey into the real structures of digital technology.", source: "Tim Rodenbröker" },
  { text: "a type of computer programming in which the goal is to create something expressive instead of something functional.", source: "wikipedia" },
  { text: "a place where experience in the field of #design, love of explorative creativity and skills as a programmer come together.", source: "patrikhuebner" },
  { text: "uses software, code and computational processes to be expressive or to create art forms.", source: "Damien Borowik" },
  { text: "encompasses the disciplines within which software engineering is used to create algorithmic art.", source: "42 Berlin" }
];
// no need to edit anything below this line! 
// if you have made an error, you can check your history to see what might have gone wrong

// a variable tht holds the current quote
let current = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  randomSeed(millis());
  pickQuote(); // calls the function to pick a quote
}

function pickQuote() {
  // take a random number and use that to identify what quote to use
  current = quotes[floor(random(quotes.length))]; 
}

function draw() {
  background(255, 20, 250);
  drawQuote(); // draw the quote on screen
}

function drawQuote() {
  // draw text
  fill(10, 255, 10);
  textAlign(CENTER, CENTER);
  text("Creative Coding is.....", width / 2, height / 2 - 48);
  textSize(32);
  textStyle(BOLD);
  text("“" + current.text + "”", width / 2, height / 2);
  textAlign(RIGHT, CENTER);
  text("-" + current.source, width - 100, height - 100);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function newQuote() {
  pickQuote();
  redraw();
}

function mousePressed() {
  newQuote(); 
}