/**
 * current angle, in degrees, the lines are relative to their starting point
 */
let currentAngle = 0;

/**
 * next angle, in degrees, lines should go to
 */
let targetAngle = 0;

/**
 * X axis coordinates array that allow diferentiation between columns
 */
let gridXCenterCoords: number[] = [];


/**
 * number of columns and/or rows
 */
let nCols = 6;
let nRows = 6;

/**
 * canvas size in pixels, apllied to both x and y axis
 */
let canvasSize = 1200;

/**
 * each line thickness, in pixels
 */
let lineThickness = 9;


const vLines: p5.Vector[] = [];
const hLines: p5.Vector[] = [];

function setup() {
  noStroke();
  createCanvas(canvasSize, canvasSize);
  angleMode(DEGREES);
  setInterval(() => targetAngle += 90, 2500);

  const centerPoints = get2DGridCenterPoints(nRows, nCols);
  centerPoints.forEach((centerPoint) => {
    gridXCenterCoords.indexOf(centerPoint[0]) % 2 === 0 ?
      vLines.push(createVector(centerPoint[0], centerPoint[1])) :
      hLines.push(createVector(centerPoint[0], centerPoint[1]))
  })
}

/**
 * Divides the canvas in rows and columns
 * @param rows number of rows in grid
 * @param cols number of columns in grid
 * @returns array of each quadrant center point coordinates
 */
function get2DGridCenterPoints(rows: number, cols: number): number[][] {
  let shapeCenterX = 0;
  let gridUnitWidth = width / rows;

  let shapeCenterY = 0;
  let gridUnitHeight = height / cols;

  const coordArray = [];

  for (let i = 1; i <= rows; i++) {
    shapeCenterX = gridUnitWidth * i - gridUnitWidth / 2;
    gridXCenterCoords.push(shapeCenterX);
    for (let j = 1; j <= cols; j++) {
      shapeCenterY = gridUnitHeight * j - gridUnitHeight / 2;
      coordArray.push([shapeCenterX, shapeCenterY]);
    }
  }

  return coordArray;

}

function draw() {
  background(255);
  fill(1);
  rectMode(CENTER)
  if (currentAngle < targetAngle) {
    currentAngle++
  }
  vLines.forEach(vector => {
    push()
    translate(vector.x, vector.y)
    rotate(currentAngle)
    rect(0, 0, lineThickness, height / nRows)
    pop()
  })

  hLines.forEach(vector => {
    push()
    translate(vector.x, vector.y)
    rotate(currentAngle)
    rect(0, 0, width / nCols, lineThickness)
    pop()
  })
}