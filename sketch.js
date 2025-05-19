const { VerletPhysics2D, VerletParticle2D, VerletSpring2D } = toxi.physics2d;
const { GravityBehavior } = toxi.physics2d.behaviors;
const { Vec2D, Rect } = toxi.geom;

let physics;

let color = "#F652A0"
let randomColors = ["#66c5cc", "#f6cf71", "#dcb0f2", "#dcb0f2", "#87c55f", "#9eb9f3", "#fe88b1", "#8be0a4", "#b497e7"]

let holdParticle = null; 
let isHoldingBlob = false;
let radius = 100;
let currentEmote = ""
let jumpEmote = "˶ˆᗜˆ˵"
let touchedEmote = "˶ˆᗜˆ˵"
let looseEmote = "•⩊•"
let emotes = ["╥﹏╥", "￢з￢", "•⩊•", "◍ ꒳ ◍", "˵¯͒〰¯͒˵", "⇀‸↼‶", "❍ᴥ❍", "=＾● ⋏ ●＾=", "ー_ーゞ", "◐ω◑", "≧▽≦", "⁀⊙෴☉⁀"];
let isJumping = false;

let particles = [];
let springs = [];

// sounds
let mySound; // *mlem* 
let ouchSound; // ow
let backgroundMusic;

let hasHitBorder = false;

// loading the mp3's
function preload() {
  soundFormats('mp3', 'ogg');
  mySound = loadSound('yoshi-tongue.mp3');
  ouchSound = loadSound('yoshi-pam.mp3');
  backgroundMusic = loadSound('Versus.mp3');
  backgroundMusic.amp(0.1)
}

sadBlob.addEventListener("click",()=>{
    console.log("jump")
    let jumpForce = -10; // negatieve waarde = omhoog
    for (let particle of particles) {
        particle.addForce(new Vec2D(0, jumpForce));       
    }
    mySound.play();
})

happyBlob.addEventListener("click",()=>{
    looseEmote = random(emotes)
})

colorChangeBlob.addEventListener("click",()=>{
    color = random(randomColors)
})

function setup() {
    let canvas = createCanvas(600, 600);
    canvas.parent('canvas-container'); // Attach canvas to the containery
    backgroundMusic.play();
    frameRate(30);
    textAlign(CENTER, CENTER);
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

        // *pam* sound effect als borders worden aangeraakt (maar niet de bodem border)
    let hittingBorder = false;

    for (let particle of particles) {
        if (
            particle.x <= 0 || 
            particle.x + 10 >= width || 
            particle.y <= 0 // bovenrand
        ) {
            hittingBorder = true;
            break; // 1 particle is genoeg
        }
    }

    if (hittingBorder && !hasHitBorder) {
        ouchSound.play();
        hasHitBorder = true;
    } else if (!hittingBorder && hasHitBorder) { 
        hasHitBorder = false;
    }
    
    fill(color)
    stroke(0)

    beginShape()
    for (let particle of particles) {
        vertex(particle.x, particle.y)
        // particle.show();
    } 
    endShape(CLOSE)

    // forloop to show all springs if needed
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

    let margin = 2;
let touchingGround = false;

for (let particle of particles) {
    if (particle.y >= height - margin) {
        touchingGround = true;
        break;
    }
}

if (isJumping && touchingGround && !isHoldingBlob) {
    isJumping = false;
    currentEmote = looseEmote;
}

    text(currentEmote, middle.x, middle.y)
}

function mousePressed(){
    let middle = calculateMiddle();
    let mousePos = createVector(mouseX, mouseY);
    let lengte = distance(mousePos, middle);

    if (lengte < radius) {
    isHoldingBlob = true;
    mySound.play();

    // laat blob springen
    let jumpForce = -10; 
    for (let particle of particles) {
        particle.addForce(new Vec2D(0, jumpForce));
    }

    isJumping = true;
    currentEmote = jumpEmote;
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

  