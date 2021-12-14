var nCols = 6;
var nRows = 6;
var currentAngle = 0;
var targetAngle = 0;
var lineThickness = 9;
var canvasSize = 1200;
var gridXCenterCoords = [];
var vLines = [];
var hLines = [];
function setup() {
    noStroke();
    createCanvas(canvasSize, canvasSize);
    angleMode(DEGREES);
    setInterval(function () { return targetAngle += 90; }, 2500);
    var centerPoints = get2DGridCenterPoints(nRows, nCols);
    centerPoints.forEach(function (centerPoint) {
        gridXCenterCoords.indexOf(centerPoint[0]) % 2 === 0 ?
            vLines.push(createVector(centerPoint[0], centerPoint[1])) :
            hLines.push(createVector(centerPoint[0], centerPoint[1]));
    });
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
function draw() {
    background(201, 38, 44);
    fill(255);
    rectMode(CENTER);
    if (currentAngle < targetAngle) {
        currentAngle++;
    }
    vLines.forEach(function (vector) {
        push();
        translate(vector.x, vector.y);
        rotate(currentAngle);
        rect(0, 0, lineThickness, height / nRows);
        pop();
    });
    hLines.forEach(function (vector) {
        push();
        translate(vector.x, vector.y);
        rotate(currentAngle);
        rect(0, 0, width / nCols, lineThickness);
        pop();
    });
}
//# sourceMappingURL=build.js.map