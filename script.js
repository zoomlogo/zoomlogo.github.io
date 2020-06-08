var bodies = [];
var density = 0.01;
var slider;

function setup() {
    createCanvas(700, 700);
    slider = createSlider(0, 2, 1, 0.01);
}

function draw() {
    background(0);
    for (let i = 0; i < bodies.length; i++) {
        let body = bodies[i];
        let c = slider.value();
        let ts = 30;
        fill(0, 255, 0);
        textSize(ts);
        text(c, width - 45 - ts, 35);

        body.checkCollision();
        body.move(width, height, 0.01, c);
        body.draw();
        if (body.offScreen) {
            bodies.splice(i, 1);
        }
    }
    // console.log(bodies);
}

function mousePressed() {
    let x = mouseX;
    let y = mouseY;
    let m = random(10, 50);
    let newBody = new Body(x, y, m);
    bodies.push(newBody);
}
