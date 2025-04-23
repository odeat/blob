const { VerletPhysics2D, VerletParticle2D, VerletSpring2D } = toxi.physics2d;
const { GravityBehavior } = toxi.physics2d.behaviors;
const { Vec2D, Rect } = toxi.geom;

let physics;
let particleA, particleB, particleC;

function setup() {
    createCanvas(600, 600);
    frameRate(30);

    physics = new VerletPhysics2D();
    let gravity = new GravityBehavior(new Vec2D(0,1));
    physics.addBehavior(gravity);

    let bounds = new Rect(0, 0, width, height);
    physics.setWorldBounds(bounds);

// Particles
    particleA = new VerletParticle2D(285, 285);
    physics.addParticle(particleA);

    particleB = new VerletParticle2D(286, 385);
    physics.addParticle(particleB);

  particleC = new VerletParticle2D(286, 485);
    physics.addParticle(particleC);

    spring1 = new VerletSpring2D(particleA, particleB, 100, 0.5); // px lengte, 0.5 sterkte\
    physics.addSpring(spring1);

    spring2 = new VerletSpring2D(particleB, particleC, 100, 0.5);
    physics.addSpring(spring2);
  }
  
  function draw() {
    background(122);
    physics.update();
  
    if(mouseIsPressed) {
      particleA.lock(); // locks particleA to the mouse position    particleA.lock(); // locks particleA to the mouse position
      particleA.x = mouseX;
      particleA.y = mouseY;
      particleA.unlock(); // unlocks particleA 
    }

    fill("#F652A0"); // colors of the particles
    circle(particleA.x, particleA.y, 15);
    circle(particleB.x, particleB.y, 15);
    circle(particleC.x, particleC.y, 15);

    line(particleA.x, particleA.y, particleB.x, particleB.y); // line between particles
    line(particleB.x, particleB.y, particleC.x, particleC.y);
    line(particleA.x, particleA.y, particleC.x, particleC.y);
  }
  