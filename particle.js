class Particle extends toxi.physics2d.VerletParticle2D {
    constructor(x, y) {
        super(x, y);
        this.r = 8;
        physics.addParticle(this);
    }

    show() {
        fill("#F652A0");
        circle(this.x, this.y, this.r * 2);
    }
}