var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 50;
let canvasW = canvas.width;
let canvasH = canvas.height;
let xMin = -10;
let xMax = 10;
let yMin = -10;
let yMax = 10;
let xScale = canvasW / (xMax - xMin);
let yScale = canvasH / (yMax - yMin);
let points = {x: [], y: []};
let functionType = "linear";
let lineOn = false;

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawAxes();
    drawAllPoints();

    if (lineOn) {
        if (functionType === "linear") {
            graphLinearLOBF();
        }
    }
}

function drawPoint(x, y) {
    ctx.beginPath();
    ctx.arc(scaleX(x), scaleY(y), 7, 0, Math.PI*2);
    ctx.fillStyle = "Blue";
    ctx.fill();
    ctx.closePath();
}

function drawAllPoints() {
    for(i = 0; i <= points.x.length; i++){
        drawPoint(points.x[i], points.y[i])
    }
}

function drawVerticalLine(x, color = "Black", thickness = 2) {
    ctx.beginPath(); 
    ctx.rect(x - (thickness / 2), 0, thickness, canvasH)
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
}

function drawHorizontalLine(y, color = "Black", thickness = 2) {
    ctx.beginPath(); 
    ctx.rect(0, y - (thickness / 2), canvasW, thickness)
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
}

function drawLinear(m, b) {
    // y = mx + b
    x = xMin;
    y = m * x + b;
    ctx.moveTo(scaleX(x), scaleY(y))
    for (x = xMin; x <= xMax; x += 1/xScale) {
        y = m * x + b;
        ctx.lineTo(scaleX(x), scaleY(y));
        ctx.stroke();
    }
}

function drawQuadratic(a, b, c) {
    // y = ax^2 + bx + c
    x = xMin;
    y = a * x * x + b * x + c;
    ctx.moveTo(scaleX(x), scaleY(y))
    for (x = xMin; x <= xMax; x += 1/xScale) {
        y = a * x * x + b * x + c;
        ctx.lineTo(scaleX(x), scaleY(y));
        ctx.stroke();
    }
}

function scaleX (x) {
    return (canvasW / 2) + xScale * x
}

function scaleY (y) {
    return (canvasH / 2) + yScale * y * -1
}

function drawAxes () {
    for (i = xMin; i <= xMax; i++) {
        drawVerticalLine(scaleX(i), "#505050", 1) 
    }

    for (i = yMin; i <= yMax; i++) {
        drawHorizontalLine(scaleY(i), "#505050", 1)
    }
    drawVerticalLine(scaleX(0), color = "Black", thickness = 4)
    drawHorizontalLine(scaleY(0), color = "Black", thickness = 4)
}

function addPoint() {
    let x = parseFloat(document.getElementById("addx").value);
    let y = parseFloat(document.getElementById("addy").value);
    if (!isNaN(x) && !isNaN(y)) {
        points.x.push(x);
        points.y.push(y);
    }
    
    document.getElementById("addx").value = "";
    document.getElementById("addy").value = "";
    draw();
}

function graphLinearLOBF() {
    let a = math.ones([points.x.length, 2]);
    let b = math.ones([points.y.length, 1]);
    for (i = 0; i < points.x.length; i++) {
        a = math.subset(a, math.index(i, 0), points.x[i]);
        b = math.subset(b, math.index(i, 0), points.y[i]);
    }

    beta = math.multiply( math.inv(math.multiply(math.transpose(a), a)), math.multiply(math.transpose(a), b));
    drawLinear(math.subset(beta, math.index(0, 0)), math.subset(beta, math.index(1, 0)));
}

function toggleLOBF() {
    lineOn = !lineOn;
    draw();
}


draw();