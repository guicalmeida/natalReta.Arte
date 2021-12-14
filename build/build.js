function get2DGridCenterPoints(rows, cols) {
    evenLines = [];
    oddLines = [];
    gridXCenterCoords = [];
    var shapeCenterX = 0;
    var gridUnitWidth = width / rows;
    var shapeCenterY = 0;
    var gridUnitHeight = height / cols;
    var coordArray = [];
    for (var i = 1; i <= rows; i++) {
        shapeCenterX = Math.round(gridUnitWidth * i - gridUnitWidth / 2);
        gridXCenterCoords.push(shapeCenterX);
        for (var j = 1; j <= cols; j++) {
            shapeCenterY = Math.round(gridUnitHeight * j - gridUnitHeight / 2);
            coordArray.push([shapeCenterX, shapeCenterY]);
        }
    }
    coordArray.forEach(function (centerPoint) {
        gridXCenterCoords.indexOf(centerPoint[0]) % 2 === 0 ?
            evenLines.push(createVector(centerPoint[0], centerPoint[1])) :
            oddLines.push(createVector(centerPoint[0], centerPoint[1]));
    });
}
var currentAngle = 0;
var targetAngle = 0;
var gridXCenterCoords = [];
var canvasSize = 800;
var lineThickness = 6;
var horizontalLinesSlider;
var verticalLinesSlider;
var hSliderValue, vSliderValue, currentXValue, currentYValue;
var evenLines = [];
var oddLines = [];
var lineSize;
function setup() {
    noStroke();
    createCanvas(canvasSize, canvasSize);
    angleMode(DEGREES);
    setInterval(function () { return targetAngle += 90; }, 2500);
    horizontalLinesSlider = createSlider(1, 10, 6);
    verticalLinesSlider = createSlider(1, 10, 6);
}
function draw() {
    hSliderValue = horizontalLinesSlider.value();
    vSliderValue = verticalLinesSlider.value();
    lineSize = (height / hSliderValue) > (width / vSliderValue) ? width / vSliderValue : (height / hSliderValue);
    if (hSliderValue !== currentXValue || vSliderValue !== currentYValue) {
        currentYValue = vSliderValue;
        currentXValue = hSliderValue;
        get2DGridCenterPoints(hSliderValue, vSliderValue);
    }
    background(255);
    fill(1);
    rectMode(CENTER);
    if (currentAngle < targetAngle) {
        currentAngle++;
    }
    evenLines.forEach(function (vector) {
        push();
        translate(vector.x, vector.y);
        rotate(currentAngle);
        rect(0, 0, lineThickness, lineSize);
        pop();
    });
    oddLines.forEach(function (vector) {
        push();
        translate(vector.x, vector.y);
        rotate(currentAngle);
        rect(0, 0, lineSize, lineThickness);
        pop();
    });
}
//# sourceMappingURL=build.js.map