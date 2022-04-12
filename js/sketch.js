var Engine = Matter.Engine,
    World = Matter.World,
    Events = Matter.Events,
    Bodies = Matter.Bodies;

var engine;
var world;
var particles = [];
var plinkos = [];
var bounds = [];
var cols = 13;
var rows = 9;
var buttoon


let Flag = 0;
let X = Math.min(innerWidth, innerHeight) * 0.9;
var rParticle = X*0.0172;
var rPlinko = X*0.02;
function setup() {
    createCanvas(X,X);
    colorMode(HSB);
    engine = Engine.create();
    world = engine.world;
    world.gravity.y = 1;

    function collision(event) {
        var pairs = event.pairs;
        for (var i = 0; i < pairs.length; i++) {
            var labelA = pairs[i].bodyA.label;
            var labelB = pairs[i].bodyB.label;
            //var labelC = pairs[i].bodyC.label;
            console.log(labelA, labelB)
            if (labelA == 'boundary' && labelB == 'plinko') {
                //ding.play();
            }
            if (labelA == 'plinko' && labelB == 'boundary') {
                //ding.play();
            }
        }
    }

    Events.on(engine, 'collisionStart', collision);

    newParticle();
    var spacingX = width / (cols);
    var spacingY = width / cols;
    for (var j = 0; j < rows; j++) {
        for (var i = 0; i < cols + 1; i++) {
            var x = i * spacingX;
            if (j % 2 == 0) {
                x += spacingX / 2;
            }
            var y = spacingY + j * spacingY +30;
            var p = new Plinko(x, y, rPlinko);
            plinkos.push(p);
        }
    }

    var b = new Boundary(width /2, height + X*0.03, width, X*0.07);
    bounds.push(b);
    for (var i = 0; i < cols+2; i++) {
        var x = i * spacingX;
        var h = X*0.1915;
        var w = h/30;
        var y = height - h / 2;
        var b = new Boundary(x, y, w, h);
        bounds.push(b);
    }
    var b = new Boundary(spacingX*(i-2), y, w, X*2);
    bounds.push(b);
    var b = new Boundary(0, y, w, X*2);
    bounds.push(b);

}

function RandomParticle(min, max){
    return Math.random()* (max - min) + min;
}

function newParticle() {
    var x = RandomParticle(X/2 - X*0.05, X/2 + X*0.05);
    var p = new Particle(x, X*0.03, rParticle);
    particles.push(p);
}

function mousePressed(){
    Flag = 1;
}

document.addEventListener('keydown', function(event) {
    if (event.code == 'Space') {
        Flag = 1;
    }
});

function draw() {
    particles[0].show();
    background("#FFE4B5");
    if (Flag === 1) {
        newParticle();
        Flag =0;
    }
    Engine.update(engine, 1000 / 30);
    for (var i = 0; i < particles.length; i++) {
        particles[i].show();
        if (particles[i].isOffScreen()) {
            World.remove(world, particles[i].body);
            particles.splice(i, 1);
            i--;
        }
    }
    for (var i = 0; i < plinkos.length; i++) {
        plinkos[i].show();
    }
    for (var i = 0; i < bounds.length; i++) {
        bounds[i].show();
    }

}
