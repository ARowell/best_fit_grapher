var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 50;
let canvasW = canvas.width;
let canvasH = canvas.height;
let xMin = -10
let xMax = 10
let yMin = -10
let yMax = 10
let xScale = canvasW / (xMax - xMin)
let yScale = canvasH / (yMax - yMin)
let points = {x: [], y: []}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawAxes();
    drawPoint(1, 1);
    drawPoint(1, 4);
    drawLinear(1, 1);
    drawQuadratic(1, 0, -1);
    drawAllPoints();
    console.log(math.sqrt(9));
}

function drawPoint(x, y) {
    ctx.beginPath();
    ctx.arc(scaleX(x), scaleY(y), 5, 0, Math.PI*2);
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
    points.x.push(parseInt(document.getElementById("addx").value));
    points.y.push(parseInt(document.getElementById("addy").value));
    document.getElementById("addx").value = "";
    document.getElementById("addy").value = "";
    draw();
}


draw();