const { VerletPhysics2D, VerletParticle2D, VerletSpring2D } = toxi.physics2d;
const { GravityBehavior } = toxi.physics2d.behaviors;
const { Vec2D, Rect } = toxi.geom;

let physics;


let holdParticle = null;
let isHoldingBlob = false;
let radius = 100;
let currentEmote = ""
let touchedEmote = "˶ˆᗜˆ˵"
let looseEmote = "•⩊•"
let emotes = ["╥﹏╥", "•⩊•", "〇_ｏ"]
let particles = [];
let springs = [];

let mySound;

function preload() {
  soundFormats('mp3', 'ogg');
  mySound = loadSound('/yoshi-tongue.mp3');
}

function setup() {
    createCanvas(600, 600);
    frameRate(30);
    textAlign(CENTER, CENTER)
    currentEmote = looseEmote;

    physics = new VerletPhysics2D();
    let gravity = new GravityBehavior(new Vec2D(0, 0.5)); // gravity vector
    physics.addBehavior(gravity);

    let bounds = new Rect(0, 0, width - 10, height - 10); // borders of the world
    physics.setWorldBounds(bounds);
 
    // particle forloop down here:
    let start = createVector(radius, 0)
    let particleCount = 20;
    let draaihoek = PI * 2 / particleCount
    
    // particles.push(new Particle(200, 200))
    // particles.push(new Particle(200, 300))
    // springs.push(new Spring(particles[0], particles[1], 100, 0.5))
    
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(start.x + width / 2, start.y + height / 2))
        start = p5.Vector.rotate(start, draaihoek);
    }

    // spring foorloop
    for(let i = 0; i < particles.length; i++){
        for(let j = i + 1; j < particles.length; j++){
            let a = createVector(particles[i].x, particles[i].y)
            let b = createVector(particles[j].x, particles[j].y)
            let a2b = b.sub(a);
            let distance = mag(a2b.x, a2b.y)
            springs.push(new Spring(particles[i], particles[j], distance, 0.00020))
        }
    }
}
  
function draw() {
    background("#98FBCB");
    physics.update();

    // Show all particles
    fill("#F652A0")
    stroke(0)
    beginShape()
    for (let particle of particles) {
        vertex(particle.x, particle.y)
        // particle.show();
    } 
    endShape(CLOSE)

    // Show all springs
    for (let spring of springs) {
        // spring.show();
    }

    // Lock the first particle to the mouse position when pressed
    if (isHoldingBlob) {
        currentEmote = touchedEmote;
        holdParticle.lock();
        holdParticle.x = mouseX;
        holdParticle.y = mouseY;
        holdParticle.unlock();
    } else{
        currentEmote = looseEmote
    }
    
    let middle = calculateMiddle();
    fill(0)
    textSize(30)
    text(currentEmote, middle.x, middle.y)
}

function mousePressed(){
    // console.log("Click")
    let middle = calculateMiddle();
    let mousePos = createVector(mouseX, mouseY);
    let lengte = distance(mousePos, middle);

    if(lengte < radius){
        isHoldingBlob = true;
        mySound.play();
    }
    
    let sortedParticles = particles.slice().sort((a, b)=>{
        a = createVector(a.x, a.y);
        b = createVector(b.x, b.y);
        return distance(mousePos, a) - distance(mousePos, b);
    })
    holdParticle = sortedParticles[0];
}

function distance(a, b){
    let aToB = b.sub(a);
    return aToB.mag();
}

function mouseReleased(){
    isHoldingBlob = false;
}

function calculateMiddle(){
    let sum = createVector(0, 0) 
    for(let particle of particles){
        sum.x += particle.x
        sum.y += particle.y
    }
    sum.x /= particles.length
    sum.y /= particles.length
    return sum;
}

  