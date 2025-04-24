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

    let bounds = new Rect(0, 0, width - 10, height -10 ); // define the bounds of the physics world
    physics.setWorldBounds(bounds);

    // particles
    particleA = new Particle(325, 285);
    particleB = new Particle(320, 385);
    particleC = new Particle(150, 485);

    // springs
    spring1 = new Spring(particleA, particleB, 100, 0.5); // px lengte, 0.5 sterkte
    spring2 = new Spring(particleB, particleC, 100, 0.5);
    spring3 = new Spring(particleA, particleC, 100, 0.5);

    // Add springs to the physics simulation
    physics.addSpring(spring1);
    physics.addSpring(spring2);
    physics.addSpring(spring3);
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

    particleA.show(); 
    particleB.show(); 
    particleC.show(); 

    line(particleA.x, particleA.y, particleB.x, particleB.y); // line between particles
    line(particleB.x, particleB.y, particleC.x, particleC.y);
    line(particleA.x, particleA.y, particleC.x, particleC.y);
  }
  