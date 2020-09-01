class Billard {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;
    }
}

function drawBillard(b) {
    ctx.fillStyle = 'rgb(0, 255, 0)';
    ctx.beginPath();
    ctx.arc(b.x, b.y, 50, 0, Math.PI * 2, false);
    ctx.fill();
}

function drawLine() {
    ctx.beginPath();
    ctx.moveTo(heldMouseX, heldMouseY);
    ctx.lineTo(mouseX, mouseY);
    ctx.stroke(); 
}

function updatePhysics(b) {
}

function clearSim() {
    ctx.clearRect(0, 0, width, height);
}

function drawSim() {
    billard.forEach(drawBillard);
    if (isMouseHeld) {
        drawLine();
    }
}

function updateSim() {
    billard.forEach(updatePhysics);
    clearSim();
    drawSim();
}

function mouseHold(e) {
    isMouseHeld = true;
    heldMouseX = e.clientX;
    heldMouseY = e.clientY;
}

function mouseRelease() {
    isMouseHeld = false;
}

const canvas = document.querySelector('.canvas');
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');

var isMouseHeld = false;
var heldMouseX, heldMouseY; 
canvas.addEventListener('mousedown', mouseHold, false);
canvas.addEventListener('mouseup', mouseRelease, false);
onmousemove = function(e){
    mouseX = e.clientX;
    mouseY = e.clientY;
}

billard = [new Billard(100,100), new Billard(400,100)];
interval = setInterval(updateSim, 20);
