class Spring extends toxi.physics2d.VerletSpring2D {
    constructor(a, b, length, strength) {
        super(a, b, length, strength);
        physics.addSpring(this);
    }

    show() {
        stroke(0);
        line(this.a.x, this.a.y, this.b.x, this.b.y); // Draw the spring between particles a and b
    }
}