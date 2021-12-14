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

let evenLines: p5.Vector[] = [];
let oddLines: p5.Vector[] = [];
let lineSize: number;

let wWidth: number;
let wHeight: number;

function setup() {
  wWidth = windowWidth;
  wHeight = windowHeight;

  noStroke();
  createCanvas(windowHeight, windowHeight - 100).parent('canvasDiv');
  angleMode(DEGREES);

  setInterval(() => targetAngle += 90, 3000);
  initInteractiveElements();
}

function draw() {

  document.getElementById("body").style.backgroundColor = backgroundColorPicker.color();

  hSliderValue = horizontalLinesSlider.value() as number;
  vSliderValue = verticalLinesSlider.value() as number;
  lineThicknessValue = lineThicknessSlider.value() as number;

  hSliderP.html('colunas: ' + hSliderValue.toString());
  vSliderP.html('linhas: ' + vSliderValue.toString());
  lineThicknessP.html('grossura das linhas: ' + lineThicknessValue.toString());

  lineSize = (height / hSliderValue) > (width / vSliderValue) ? width / vSliderValue : (height / hSliderValue)

  if (hSliderValue !== currentXValue || vSliderValue !== currentYValue || windowWidth !== wWidth || windowHeight !== wHeight) {
    currentYValue = vSliderValue;
    currentXValue = hSliderValue;
    get2DGridCenterPoints(hSliderValue, vSliderValue)
  }

  background(backgroundColorPicker.color());
  rectMode(CENTER)
  if (currentAngle < targetAngle) {
    currentAngle++
  }
  evenLines.forEach(vector => {
    push()
    fill(evenLinesColorPicker.color());
    translate(vector.x, vector.y)
    rotate(currentAngle)
    rect(0, 0, lineThicknessSlider.value() as number, lineSize)
    pop()
  })

  oddLines.forEach(vector => {
    push()
    fill(oddLinesColorPicker.color());
    translate(vector.x, vector.y)
    rotate(currentAngle)
    rect(0, 0, lineSize, lineThicknessSlider.value() as number)
    pop()
  })

  push()
  textSize(20);
  text(hSliderValue, 0, 0);
  fill(0)
  pop()
}

function windowResized() {
  resizeCanvas(windowHeight, windowHeight - 100);
}