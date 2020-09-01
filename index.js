class Ball {
    static get RADIUS() { return 50; }
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
    ctx.arc(b.x, b.y, Ball.RADIUS, 0, Math.PI * 2, false);
    ctx.fill();
}

function drawLine() {
    ctx.beginPath();
    ctx.moveTo(heldMouseX, heldMouseY);
    ctx.lineTo(mouseX, mouseY);
    ctx.stroke(); 
}

function updatePhysics(b) {
    b.x += b.vx;
    b.y += b.vy;
    b.vx *= FRICTION_FACTOR;
    b.vy *= FRICTION_FACTOR;
}

function clearSim() {
    ctx.clearRect(0, 0, width, height);
}

function drawSim() {
    ball.forEach(drawBillard);
    if (isMouseHeld) {
        drawLine();
    }
}

function updateSim() {
    ball.forEach(updatePhysics);
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
    ball.forEach(hitClicked);
    function hitClicked(b) { //pythagorean theorm is used to see if a ball was clicked
        if ( Math.sqrt((Math.abs(heldMouseX - b.x) ** 2) + (Math.abs(heldMouseY - b.y) ** 2)) < Ball.RADIUS ) {
            b.vx += (b.x - mouseX) * HIT_FACTOR;
            b.vy += (b.y - mouseY) * HIT_FACTOR;
            return;
        }
    }
}

const canvas = document.querySelector('.canvas');
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');

const HIT_FACTOR = 0.10;
const FRICTION_FACTOR = 0.95;
var isMouseHeld = false;
var heldMouseX, heldMouseY; 
canvas.addEventListener('mousedown', mouseHold, false);
canvas.addEventListener('mouseup', mouseRelease, false);
onmousemove = function(e){
    mouseX = e.clientX;
    mouseY = e.clientY;
}

ball = [new Ball(100,100), new Ball(400,100)];
interval = setInterval(updateSim, 20);
