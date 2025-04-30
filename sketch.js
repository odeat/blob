const { VerletPhysics2D, VerletParticle2D, VerletSpring2D } = toxi.physics2d;
const { GravityBehavior } = toxi.physics2d.behaviors;
const { Vec2D, Rect } = toxi.geom;

let physics;

let particles = [];
let springs = [];

function setup() {
    createCanvas(600, 600);
    frameRate(30);

    physics = new VerletPhysics2D();
    let gravity = new GravityBehavior(new Vec2D(0, 0.5)); // gravity vector
    physics.addBehavior(gravity);

    let bounds = new Rect(0, 0, width - 10, height - 10); // borders of the world
    physics.setWorldBounds(bounds);
 
    // particle forloop down here:
    let start = createVector(100, 0)
    let particleCount = 8;
    let draaihoek = PI * 2 / particleCount
    
    particles.push(new Particle(200, 200))
    particles.push(new Particle(200, 300))
    springs.push(new Spring(particles[0], particles[1], 100, 0.5))
    
    // for (let i = 0; i < particleCount; i++) {
    //     particles.push(new Particle(start.x + width / 2, start.y + height / 2))
    //     start = p5.Vector.rotate(start, draaihoek);
    // }

    // // spring foorloop
    // for(let i = 0; i < particles.length; i++){
    //     for(let j = i + 1; j < particles.length; j++){
    //         let a = createVector(particles[i].x, particles[i].y)
    //         let b = createVector(particles[j].x, particles[j].y)
    //         let a2b = b.sub(a);
    //         let distance = mag(a2b.x, a2b.y)
    //         springs.push(new Spring(particles[i], particles[j], distance, 1))
    //     }
    // }
}
  
function draw() {
    background(122);
    physics.update();

    // Show all particles
    for (let particle of particles) {
        particle.show();
    }

    // Show all springs
    for (let spring of springs) {
        spring.show();
    }

    // Lock the first particle to the mouse position when pressed
    if (mouseIsPressed) {
      particles[0].lock();
      particles[0].x = mouseX;
      particles[0].y = mouseY;
      particles[0].unlock();
  }
}
  