class Body {
    constructor(x, y, mass) {
        this.pos = createVector(x, y);
        this.mass = mass;

        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
        this.offScreen = false;
    }

    checkCollision(w, h, c) {
        if ((this.pos.x >= w) || (this.pos.x <= 0)) {
            this.vel.x *= -1;
        }
        if ((this.pos.y >= h)) {
            this.vel.y *= -1 * c;
        }

        if ((this.pos.y <= 0)) {
            this.vel.y *= -1;
        }
    }

    checkOffScreen(w, h) {
        if ((this.pos.x >= w + 250) || (this.pos.x <= -250)) {
            this.offScreen = true;
        }
        if ((this.pos.y >= h + 250) || (this.pos.y <= -250)) {
            this.offScreen = true
        }
    }

    applyForce(force) {
        let f = p5.Vector.div(force, this.mass);
        this.acc.add(f);
    }

    applyExternalForce(density) {
        let g = createVector(0, 0.01);
        let f = createVector(this.vel.x, this.vel.y);
        f.normalize();
        f.mult(-1);
        f.mult(0.001);
        let d = createVector(this.vel.x, this.vel.y);
        d.normalize();
        d.mult(density);
        d.mult(-0.5);
        let mulFact = this.vel.mag();
        d.mult(mulFact * mulFact);

        this.applyForce(g);
        this.applyForce(f);
        // this.applyForce(d);
    }

    move(w, h, density, c) {
        this.checkOffScreen(w, h);
        this.checkCollision(w, h, c);
        this.applyExternalForce(density);
        this.vel.add(this.acc);
        this.pos.add(this.vel);
    }

    draw() {
        fill(255, 0, 0);
        stroke(145, 10, 120);
        ellipse(this.pos.x, this.pos.y, this.mass, this.mass);
    }
}
