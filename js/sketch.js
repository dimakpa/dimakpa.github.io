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
var rows = 10;
var buttoon
var click =1;
var balance = 5000;
var G=1;

var ding;
// function preload(){
//     ding = loadSound('audio1.mp3');
// }

let X;
let Flag = 0;
if(innerWidth >= innerHeight) {
    X = Math.min(innerWidth, innerHeight) * 0.9;
}else{
    X = Math.min(innerWidth, innerHeight);
}

var rParticle = X*0.024;
var rPlinko = X*0.013;
function setup() {
    createCanvas(X,X);
    colorMode(HSB);
    engine = Engine.create();
    world = engine.world;
    world.gravity.y = 0.5;

    //рассмотрение столкновения с полом
    function collision(event) {
        //console.log(event);
        var pairs = event.pairs;
        for (var i = 0; i < pairs.length; i++) {
            var labelA = pairs[i].bodyA.label;
            var labelB = pairs[i].bodyB.label;
            let prise_box;
            console.log(labelA, labelB);
            if (labelA === 'box' && labelB === 'particle') {
                prise_box = Number(pairs[i].bodyA.price);
                balance = balance + (document.getElementById('input1').value*prise_box);
                document.getElementById("balance").innerHTML = "Balance: " + balance.toString() + "$";
                G=0;
                //World.remove(particles.pop());
                //particles.shift();
                //pairs[i].destroy();
            }
            else if (labelA === 'particle' && labelB === 'box') {
                prise_box = Number(pairs[i].bodyB.price);
                balance = balance + (document.getElementById('input1').value*prise_box);
                document.getElementById("balance").innerHTML = "Balance: " + balance.toString() + "$";
                G=0;
                //World.remove(pairs[i].bodyA);
                //particles.shift();
            }
        }
    }

    Events.on(engine, 'collisionStart', collision);

    newParticle();
    var spacingX = width / cols;
    var spacingY = width / cols;
    for (var j = 0; j < rows; j++) {
        for (var i = 0; i < cols + 1; i++) {
            var x = i * spacingX;
            if (j % 2 === 0) {
                x += spacingX / 2;
            }
            var y = spacingY + j * spacingY +30;
            var p = new Plinko(x, y, rPlinko);
            plinkos.push(p);
        }
    }

    var b = new Boundary(width /2, height + X*0.07, width, X*0.07);
    bounds.push(b);
    for (var i = 0; i < cols+2; i++) {
        var x = i * spacingX;
        var h = X*0.04;
        var w = h/30;
        var y = height - h / 2;
        var b = new Boundary(x, y, w, h);
        bounds.push(b);
    }
    var b = new Boundary(spacingX*(i-2)-1, y, w, X*2);
    bounds.push(b);
    var b = new Boundary(1, y, w, X*2);
    bounds.push(b);

    //боксы для подсчета
    var b = new Box(X/13/2, height-h/4, X*0.9/cols, X*0.1915/3, "#1CF80D", 26);
    bounds.push(b);
    var b = new Box(X/13/2*3, height-h/4, X*0.9/cols, X*0.1915/3, "#6dde00", 9);
    bounds.push(b);
    var b = new Box(X/13/2*5, height-h/4, X*0.9/cols, X*0.1915/3, "#2fa101", 4);
    bounds.push(b);
    var b = new Box(X/13/2*7, height-h/4, X*0.9/cols, X*0.1915/3, "#466c79", 2);
    bounds.push(b);
    var b = new Box(X/13/2*9, height-h/4, X*0.9/cols, X*0.1915/3, "#31415e", 0.6);
    bounds.push(b);
        var b = new Box(X/13/2*11, height-h/4, X*0.9/cols, X*0.1915/3, "#2d313a", 0.4);
    bounds.push(b);
    var b = new Box(X/13/2*13, height-h/4, X*0.9/cols, X*0.1915/3, "#1b1f2a", 0.2);
    bounds.push(b);
    var b = new Box(X/13/2*15, height-h/4, X*0.9/cols, X*0.1915/3, "#2d313a", 0.4);
    bounds.push(b);
    var b = new Box(X/13/2*17, height-h/4, X*0.9/cols, X*0.1915/3, "#31415e", 0.6);
    bounds.push(b);
    var b = new Box(X/13/2*19, height-h/4, X*0.9/cols, X*0.1915/3, "#466c79", 2);
    bounds.push(b);
    var b = new Box(X/13/2*21, height-h/4, X*0.9/cols, X*0.1915/3, "#2fa101", 4);
    bounds.push(b);
    var b = new Box(X/13/2*23, height-h/4, X*0.9/cols, X*0.1915/3, "#6dde00", 9);
    bounds.push(b);
    var b = new Box(X/13/2*25, height-h/4, X*0.9/cols, X*0.1915/3, "#1CF80D", 26);
    bounds.push(b);
}

function RandomParticle(min, max){
    return Math.random()* (max - min) + min;
}

function newParticle() {
    if (document.getElementById('input2').value == 1){
        var x = RandomParticle(X/2 - X*0.05, X/2 + X*0.05);
    }else if(document.getElementById('input2').value == 2){
        var x = RandomParticle(X/2 - X*0.09, X/2 + X*0.052);
    }else if(document.getElementById('input2').value == 3){
        var x = RandomParticle(X/2 - X*0.14, X/2 + X*0.057);
    }else if(document.getElementById('input2').value == 4){
        var x = RandomParticle(X/2 - X*0.19, X/2 + X*0.4);
    }else if(document.getElementById('input2').value == 5){
        var x = RandomParticle(X/2 - X*0.23, X/2 + X*0.069);
    }else if(document.getElementById('input2').value == 6){
        var x = RandomParticle(X/2 - X*0.27, X/2 + X*0.077);
    }
     //var x = RandomParticle(X/2 - X*0.3, X/2 + X*0.3);
    // //var x = RandomParticle(X/2 - X*0.05, X/2 + X*0.05);
    var p = new Particle(x, X*0.03, rParticle);
    particles.push(p);
}

function changebalance(){
    document.getElementById("balance").innerHTML = "Balance: " + balance.toString() + "$";

}
//старт программы по клику
function start(){
    //проверка баланса
    var balance_check = document.getElementById('input1').value + (document.getElementById('input2').value *document.getElementById('input1').value)/10;
    if(balance===0 || balance < 0 || balance - document.getElementById('input1').value - (document.getElementById('input2').value *document.getElementById('input1').value)/10 <=0){//|| balance_check >= balance){
            Flag = 0;
    }else {
    //ding.play();
    click++;
    //повышение шанса на выигрыш
    balance = balance - document.getElementById('input1').value - (document.getElementById('input2').value *document.getElementById('input1').value)/10;
    changebalance();
        Flag = 1;
        changebalance();
    }
}

function back() {
    window.open('http://dimakpa.github.io/MainScreen', '_self').focus();
}


function draw() {
    if(particles[0]){
        //particles[0].show();
    }
    //background("#28525c");
    background("#FFE4B5");
    if (Flag === 1) {
        newParticle();
        Flag =0;
    }
    Engine.update(engine, 1000 / 30);
    for (var i = 0; i < particles.length; i++) {
        particles[i].show();
        if (particles[i].isOffScreen() || G === 0) {
            World.remove(world, particles[i].body);
            particles.splice(i, 1);
            i--;
            G=1;
        }
    }
    for (var i = 0; i < plinkos.length; i++) {
        plinkos[i].show();
    }
    for (var i = 0; i < bounds.length; i++) {
        bounds[i].show();
    }

}
