var Engine = Matter.Engine,
    World = Matter.World,
    Events = Matter.Events,
    Bodies = Matter.Bodies;

var engine;
var world;
var particles = [];
var plinkos = [];
var bounds = [];
var cols = 11;
var rows = 10;
var buttoon

let Flag = 0;

function setup() {
    createCanvas(600, 700);
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
    var spacingX = width / (cols+4);
    var spacingY = width / cols;
    for (var j = 0; j < rows; j++) {
        for (var i = 0; i < cols + 1; i++) {
            var x = i * spacingX;
            if (j % 2 == 0) {
                x += spacingX / 2;
            }
            var y = spacingY + j * spacingY;
            var p = new Plinko(x, y, 12);
            plinkos.push(p);
        }
    }

    var b = new Boundary(width /2, height + 50, width, 100);
    bounds.push(b);
    for (var i = 0; i < cols+1; i++) {
        var x = i * spacingX;
        var h = 100;
        var w = 10;
        var y = height - h / 2;
        var b = new Boundary(x, y, w, h);
        bounds.push(b);
    }
    var b = new Boundary(spacingX*i, y, w, 1300);
    bounds.push(b);
    var b = new Boundary(0, y, w, 1300);
    bounds.push(b);
    buttoon = new Button(spacingX*i+63, y, 100, 50);
    bounds.push(buttoon);
}

function RandomParticle(min, max){
    return Math.random()* (max - min) + min;
}

function newParticle() {
    var x = RandomParticle(250, 350);
    var p = new Particle(x, 0, 7);
    particles.push(p);
}

function mousePressed(){
    Flag = 0;
    if(buttoon.contains(mouseX, mouseY)){
        buttoon.revealT();
        Flag = 1;

    }
}

function draw() {
    background(51)
    particles[0].show();
    background(0, 0, 0);
    if (Flag === 1) {
        newParticle();
        buttoon.revealF();
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