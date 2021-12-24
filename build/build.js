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
var horizontalLinesSlider, verticalLinesSlider, lineThicknessSlider, backgroundColorPicker, evenLinesColorPicker, oddLinesColorPicker, hSliderValue, hSliderP, vSliderValue, vSliderP, lineThicknessValue, lineThicknessP, currentXValue, currentYValue;
function initInteractiveElements() {
    horizontalLinesSlider = createSlider(1, 51, 4).size(400).parent('sliders');
    hSliderP = createP(horizontalLinesSlider.value().toString()).parent('sliders');
    verticalLinesSlider = createSlider(1, 51, 4).size(400).parent('sliders');
    vSliderP = createP(verticalLinesSlider.value().toString()).parent('sliders');
    lineThicknessSlider = createSlider(1, 20, 5).size(400).parent('sliders');
    lineThicknessP = createP(lineThicknessSlider.value().toString()).parent('sliders');
    backgroundColorPicker = createColorPicker('#da2127').class('bgColorPicker').parent('bgPicker');
    createP('cor do fundo').parent('bgPicker').class('pickerText');
    evenLinesColorPicker = createColorPicker('#000000').class('evenLinesColorPicker').parent('evenPicker');
    createP('cor das linhas em colunas ímpares').parent('evenPicker').class('pickerText');
    oddLinesColorPicker = createColorPicker('#FFFFFF').class('oddLinesColorPicker').parent('oddPicker');
    createP('cor das linhas em colunas pares').parent('oddPicker').class('pickerText');
}
var boasfestas;
var logo;
function preload() {
    boasfestas = loadImage('../assets/boas-festas.svg');
    logo = loadImage('../assets/logo.svg');
}
var currentAngle = 0;
var targetAngle = 90;
var gridXCenterCoords = [];
var canvasSize = 800;
var evenLines = [];
var oddLines = [];
var lineSize;
var wWidth;
var wHeight;
var theta;
var N_FRAMES = 120;
var cycle = 120;
var vLines = [];
var hLines = [];
function setup() {
    wWidth = windowWidth;
    wHeight = windowHeight;
    noStroke();
    createCanvas(windowHeight, windowHeight - 100).parent('canvasDiv');
    angleMode(DEGREES);
    imageMode(CENTER);
    initInteractiveElements();
}
function draw() {
    document.getElementById("body").style.backgroundColor = backgroundColorPicker.color();
    hSliderValue = horizontalLinesSlider.value();
    vSliderValue = verticalLinesSlider.value();
    lineThicknessValue = lineThicknessSlider.value();
    hSliderP.html('colunas: ' + hSliderValue.toString());
    vSliderP.html('linhas: ' + vSliderValue.toString());
    lineThicknessP.html('grossura das linhas: ' + lineThicknessValue.toString());
    lineSize = (height / hSliderValue) > (width / vSliderValue) ? width / vSliderValue : (height / hSliderValue);
    if (hSliderValue !== currentXValue || vSliderValue !== currentYValue || windowWidth !== wWidth || windowHeight !== wHeight) {
        currentYValue = vSliderValue;
        currentXValue = hSliderValue;
        get2DGridCenterPoints(hSliderValue, vSliderValue);
    }
    var t = (frameCount % N_FRAMES) / N_FRAMES;
    if (t === 0) {
        currentAngle = targetAngle;
    }
    t = easeInOutQuad(t);
    var theta = map(t, 0, 1, currentAngle, targetAngle);
    background(backgroundColorPicker.color());
    rectMode(CENTER);
    evenLines.forEach(function (vector) {
        push();
        fill(evenLinesColorPicker.color());
        translate(vector.x, vector.y);
        rotate(theta);
        rect(0, 0, lineThicknessSlider.value(), lineSize);
        pop();
    });
    oddLines.forEach(function (vector, i) {
        if (i === 1) {
            push();
            translate(vector.x, vector.y);
            rotate(theta);
            logo.resize(lineSize - 10, 0);
            image(logo, 0, 0);
            pop();
        }
        else if (i === 2) {
            push();
            translate(vector.x, vector.y);
            rotate(theta);
            boasfestas.resize(lineSize - 10, 0);
            image(boasfestas, 0, 0);
            pop();
        }
        else {
            push();
            fill(oddLinesColorPicker.color());
            translate(vector.x, vector.y);
            rotate(theta);
            rect(0, 0, lineSize, lineThicknessSlider.value());
            pop();
        }
    });
    if (((frameCount % cycle) / cycle) === 0) {
        targetAngle += 90;
    }
    push();
    textSize(20);
    text(hSliderValue, 0, 0);
    fill(0);
    pop();
}
function easeInOutExpo(x) {
    return x === 0 ? 0 : x === 1 ? 1 : x < 0.5 ? pow(2, 20 * x - 10) / 2 : (2 - pow(2, -20 * x + 10)) / 2;
}
function easeInOutQuad(x) {
    return x < 0.5 ? 2 * x * x : 1 - pow(-2 * x + 2, 2) / 2;
}
function windowResized() {
    resizeCanvas(windowHeight, windowHeight - 100);
}
//# sourceMappingURL=build.js.map