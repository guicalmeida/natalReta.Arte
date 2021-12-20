/**
 * current angle, in degrees, the lines are relative to their starting point
 */
let currentAngle = 0;

/**
 * next angle, in degrees, lines should go to
 */
let targetAngle = 90;

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
let theta: number;

const N_FRAMES = 120;
const cycle = 240;

const vLines: p5.Vector[] = [];
const hLines: p5.Vector[] = [];

function setup() {
  wWidth = windowWidth;
  wHeight = windowHeight;

  noStroke();
  createCanvas(windowHeight, windowHeight - 100).parent('canvasDiv');
  angleMode(DEGREES);
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

  let t = (frameCount%N_FRAMES) / N_FRAMES;
  if (t === 0){
    currentAngle = targetAngle
  }
  t = easeInOutExpo(t);
  let theta = map(t, 0, 1, currentAngle, targetAngle);

  background(backgroundColorPicker.color());
  rectMode(CENTER);
  
  evenLines.forEach(vector => {
    push()
    fill(evenLinesColorPicker.color());
    translate(vector.x, vector.y)
    rotate(theta)
    rect(0, 0, lineThicknessSlider.value() as number, lineSize)
    pop()
  })

  oddLines.forEach(vector => {
    push()
    fill(oddLinesColorPicker.color());
    translate(vector.x, vector.y)
    rotate(theta)
    rect(0, 0, lineSize, lineThicknessSlider.value() as number)
    pop()
  })

  if (((frameCount%cycle) / cycle )=== 0) {
    targetAngle += 90;
  }

  push()
  textSize(20);
  text(hSliderValue, 0, 0);
  fill(0)
  pop()
}

function easeInOutExpo(x: number) {
  return x === 0 ? 0: x === 1 ? 1: x < 0.5 ? pow(2, 20 * x - 10) / 2 : (2 - pow(2, -20 * x + 10)) / 2;
}

function windowResized() {
  resizeCanvas(windowHeight, windowHeight - 100);
}
