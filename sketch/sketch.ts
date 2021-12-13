let nCols = 6;
let nRows = 6;
let currentAngle = 0;
let targetAngle = 0;


const vLines: p5.Vector[] = [];
const hLines: p5.Vector[] = [];

function setup() {
  noStroke();
  let canvasSize = 1200;
  createCanvas(canvasSize, canvasSize);
  angleMode(DEGREES);
  setInterval(()=> targetAngle+=90, 2500);
  
  const centerPoints = get2DGridCenterPoints(nRows, nCols);
  const xCoords = [100, 300, 500, 700, 900, 1100];
  centerPoints.forEach((centerPoint) => {
    xCoords.indexOf(centerPoint[0]) % 2 === 0  ?
    vLines.push(createVector(centerPoint[0], centerPoint[1])) :
    hLines.push(createVector(centerPoint[0], centerPoint[1]))
  })
}

function get2DGridCenterPoints(rows: number, cols: number): number[][] {
  let shapeCenterX = 0;
  let gridUnitWidth = width/rows;
  
  let shapeCenterY= 0;
  let gridUnitHeight = height/cols;
  
  const coordArray = [];
  
  for (let i = 1; i <= rows; i++) {
    shapeCenterX = gridUnitWidth * i - gridUnitWidth/2;
    for (let j = 1; j <= cols; j++) {
      shapeCenterY = gridUnitHeight * j - gridUnitHeight/2;
      coordArray.push([shapeCenterX, shapeCenterY]);
    }
  }
  
  return coordArray;
  
}

function draw() {
  background(255);
  fill(1);
  rectMode(CENTER)
  if(currentAngle < targetAngle){
    currentAngle++
  }
  vLines.forEach( vector => {
    push()
    translate(vector.x, vector.y)
    rotate(currentAngle)
    rect(0, 0, 9, height/6)
    pop()
  })
  
  hLines.forEach(vector => {
    push()
    translate(vector.x, vector.y)
    rotate(currentAngle)
    rect(0, 0, width/6, 9)
    pop()
  })
}