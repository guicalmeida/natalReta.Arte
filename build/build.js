var nCols = 6;
var nRows = 6;
var currentAngle = 0;
var targetAngle = 0;
var vLines = [];
var hLines = [];
function setup() {
    noStroke();
    var canvasSize = 1200;
    createCanvas(canvasSize, canvasSize);
    background(200);
    angleMode(DEGREES);
    setInterval(function () { return targetAngle += 90; }, 2500);
    var centerPoints = get2DGridCenterPoints(nRows, nCols);
    var xCoords = [100, 300, 500, 700, 900, 1100];
    centerPoints.forEach(function (centerPoint) {
        xCoords.indexOf(centerPoint[0]) % 2 === 0 ?
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
        for (var j = 1; j <= cols; j++) {
            shapeCenterY = gridUnitHeight * j - gridUnitHeight / 2;
            coordArray.push([shapeCenterX, shapeCenterY]);
        }
    }
    return coordArray;
}
function draw() {
    fill(1);
    rectMode(CENTER);
    if (currentAngle < targetAngle) {
        currentAngle++;
    }
    vLines.forEach(function (vector) {
        push();
        translate(vector.x, vector.y - 100);
        rotate(currentAngle);
        rect(0, 0, 9, height / 6);
        pop();
    });
    hLines.forEach(function (vector) {
        push();
        translate(vector.x - 100, vector.y);
        rotate(currentAngle);
        rect(0, 0, width / 6, 9);
        pop();
    });
}
//# sourceMappingURL=build.js.map