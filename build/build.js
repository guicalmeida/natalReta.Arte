var currentAngle = 0;
var targetAngle = 0;
var gridXCenterCoords = [];
var nCols = 6;
var nRows = 6;
var canvasSize = 1200;
var lineThickness = 9;
var theta;
var N_FRAMES = 120;
var cycle = 240;
var vLines = [];
var hLines = [];
function setup() {
    noStroke();
    createCanvas(canvasSize, canvasSize);
    angleMode(DEGREES);
    var centerPoints = get2DGridCenterPoints(nRows, nCols);
    centerPoints.forEach(function (centerPoint) {
        gridXCenterCoords.indexOf(centerPoint[0]) % 2 === 0 ?
            vLines.push(createVector(centerPoint[0], centerPoint[1])) :
            hLines.push(createVector(centerPoint[0], centerPoint[1]));
    });
}
function draw() {
    var t = (frameCount % N_FRAMES) / N_FRAMES;
    if (t === 0) {
        currentAngle = targetAngle;
    }
    t = easeInOutExpo(t);
    var theta = map(t, 0, 1, currentAngle, targetAngle);
    background(255);
    fill(1);
    rectMode(CENTER);
    vLines.forEach(function (vector) {
        push();
        translate(vector.x, vector.y);
        rotate(theta);
        rect(0, 0, lineThickness, height / nRows);
        pop();
    });
    hLines.forEach(function (vector) {
        push();
        translate(vector.x, vector.y);
        rotate(theta);
        rect(0, 0, width / nCols, lineThickness);
        pop();
    });
    if (((frameCount % cycle) / cycle) === 0) {
        targetAngle += 90;
    }
}
function easeInOutExpo(x) {
    return x === 0 ? 0 : x === 1 ? 1 : x < 0.5 ? pow(2, 20 * x - 10) / 2 : (2 - pow(2, -20 * x + 10)) / 2;
}
function get2DGridCenterPoints(rows, cols) {
    var shapeCenterX = 0;
    var gridUnitWidth = width / rows;
    var shapeCenterY = 0;
    var gridUnitHeight = height / cols;
    var coordArray = [];
    for (var i = 1; i <= rows; i++) {
        shapeCenterX = gridUnitWidth * i - gridUnitWidth / 2;
        gridXCenterCoords.push(shapeCenterX);
        for (var j = 1; j <= cols; j++) {
            shapeCenterY = gridUnitHeight * j - gridUnitHeight / 2;
            coordArray.push([shapeCenterX, shapeCenterY]);
        }
    }
    return coordArray;
}
//# sourceMappingURL=build.js.map