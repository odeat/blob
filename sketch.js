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

// Particles (16 in an oval shape)
particles.push(new Particle(300, 100));  // 0
particles.push(new Particle(345, 115));  // 1
particles.push(new Particle(380, 150));  // 2
particles.push(new Particle(395, 200));  // 3
particles.push(new Particle(400, 300));  // 4
particles.push(new Particle(395, 400));  // 5
particles.push(new Particle(380, 450));  // 6
particles.push(new Particle(345, 485));  // 7
particles.push(new Particle(300, 500));  // 8
particles.push(new Particle(255, 485));  // 9
particles.push(new Particle(220, 450));  //10
particles.push(new Particle(205, 400));  //11
particles.push(new Particle(200, 300));  //12
particles.push(new Particle(205, 200));  //13
particles.push(new Particle(220, 150));  //14
particles.push(new Particle(255, 115));  //15

// Springs (connect all particles in an oval loop)
springs.push(new Spring(particles[0], particles[1], 50, 0.1));
springs.push(new Spring(particles[1], particles[2], 50, 0.1));
springs.push(new Spring(particles[2], particles[3], 50, 0.1));
springs.push(new Spring(particles[3], particles[4], 50, 0.1));
springs.push(new Spring(particles[4], particles[5], 50, 0.1));
springs.push(new Spring(particles[5], particles[6], 50, 0.1));
springs.push(new Spring(particles[6], particles[7], 50, 0.1));
springs.push(new Spring(particles[7], particles[8], 50, 0.1));
springs.push(new Spring(particles[8], particles[9], 50, 0.1));
springs.push(new Spring(particles[9], particles[10], 50, 0.1));
springs.push(new Spring(particles[10], particles[11], 50, 0.1));
springs.push(new Spring(particles[11], particles[12], 50, 0.1));
springs.push(new Spring(particles[12], particles[13], 50, 0.1));
springs.push(new Spring(particles[13], particles[14], 50, 0.1));
springs.push(new Spring(particles[14], particles[15], 50, 0.1));
springs.push(new Spring(particles[15], particles[0], 50, 0.1));

springs.push(new Spring(particles[0], particles[4], 100, 0.03));
springs.push(new Spring(particles[8], particles[12], 100, 0.03));

springs.push(new Spring(particles[0], particles[8], 80, 0.05));
springs.push(new Spring(particles[4], particles[12], 80, 0.05));
springs.push(new Spring(particles[2], particles[10], 80, 0.05));
springs.push(new Spring(particles[6], particles[14], 80, 0.05));
springs.push(new Spring(particles[3], particles[11], 80, 0.05));
springs.push(new Spring(particles[5], particles[13], 80, 0.05));
springs.push(new Spring(particles[1], particles[9], 80, 0.05));
springs.push(new Spring(particles[7], particles[15], 80, 0.05));

 

    // Add springs to the physics simulation
    for (let spring of springs) {
        physics.addSpring(spring);
    }
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
  