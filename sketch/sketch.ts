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
 * canvas size in pixels, apllied to both x and y axis
 */
let canvasSize = 800;

/**
 * each line thickness, in pixels
 */
let lineThickness = 6;

let horizontalLinesSlider: p5.Element
let verticalLinesSlider: p5.Element
let hSliderValue: number, vSliderValue: number, currentXValue: number, currentYValue: number;

let evenLines: p5.Vector[] = [];
let oddLines: p5.Vector[] = [];
let lineSize: number;

function setup() {
  noStroke();
  createCanvas(canvasSize, canvasSize);
  angleMode(DEGREES);
  setInterval(() => targetAngle += 90, 2500);
  horizontalLinesSlider = createSlider(1, 10, 6);
  verticalLinesSlider = createSlider(1, 10, 6);
  

}

function draw() {
  hSliderValue = horizontalLinesSlider.value() as number;
  vSliderValue = verticalLinesSlider.value() as number;

  lineSize = (height / hSliderValue) > (width / vSliderValue) ? width / vSliderValue : (height / hSliderValue)

  if (hSliderValue !== currentXValue || vSliderValue !== currentYValue){
    currentYValue = vSliderValue;
    currentXValue = hSliderValue;
    get2DGridCenterPoints(hSliderValue, vSliderValue)
  }

  background(255);
  fill(1);
  rectMode(CENTER)
  if (currentAngle < targetAngle) {
    currentAngle++
  }
  evenLines.forEach(vector => {
    push()
    translate(vector.x, vector.y)
    rotate(currentAngle)
    rect(0, 0, lineThickness, lineSize)
    pop()
  })

  oddLines.forEach(vector => {
    push()
    translate(vector.x, vector.y)
    rotate(currentAngle)
    rect(0, 0, lineSize, lineThickness)
    pop()
  })
}