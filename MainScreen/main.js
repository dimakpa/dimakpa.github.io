

let canvas = document.getElementById("canvas");

// window.Telegram.WebApp.IsExpanded = True;
// window.Telegram.MainButton.color = "#FBA22FFF"

let sections = ["0.00×", "30.00×", "0.00×", "3.00×", "0.00×",
    "1.70×", "0.00×", "2.00×", "0.00×", "1.50×",
    "0.00×", "1.50×", "0.00×", "1.50×", "0.00×", "1.70×", "0.00×",
    "2.00×", "0.00×", "1.50×", "0.00×", "2.00×",
    "0.00×", "3.00×","0.00×", "2.00×", "0.00×", "2.00×", "0.00×",
    "1.50×" ];



function Wheel() {
    window.open('http://dimakpa.github.io/koleso/', '_self').focus();
}

function Plinko() {
    window.open('http://dimakpa.github.io/', '_self').focus();
}



let colors = ["#406c81", "#7e46fc", "#406c81", "#fba22f","#406c81","#d4e7f1","#406c81","#fce805",
    "#406c81","#00e304","#406c81","#00e304","#406c81","#00e304","#406c81","#d4e7f1",
    "#406c81","#fce805","#406c81","#00e304","#406c81","#fce805","#406c81","#fba22f",
    "#406c81","#fce805","#406c81","#fce805","#406c81","#00e304"];


let wheels = null;
let frame = null;
let r = null;
let cx = null;
let cy = null;

function repaint(angle) {
    if (innerWidth > innerHeight){r = Math.max(innerWidth, innerHeight) * 0.2; }
    else {r = Math.min(innerWidth, innerHeight) * 0.1;}
    if (wheels === null) {
        wheels = [];
        for (let selected=0; selected<sections.length; selected++) {
            let c = document.createElement("canvas");
            c.width = c.height = 2*r + 10;
                let ctx = c.getContext("2d"), cx = 5 + r, cy = 5 + r;
            for (let i=0; i<sections.length; i++) {
                let a0 = 2*Math.PI*i/sections.length;
                let a1 = a0 + 2*Math.PI/(i == 0 ? 1 : sections.length);
                let a = 2*Math.PI*(i+0.5)/sections.length;
                ctx.beginPath();
                ctx.moveTo(cx, cy);
                ctx.arc(cx, cy, r, a0, a1, false);
                ctx.fillStyle = colors[i % 30];
                ctx.fill();
                ctx.save();
                ctx.font = "bold " + r/(sections.length*0,35)*4 + "px serif";
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.translate(cx, cy);
                ctx.rotate(a);
                ctx.fillText(sections[i], r*0.62, 0);



                ctx.restore();
            }
            wheels.push(c);
        }
    }
    if (frame === null) {
        frame = document.createElement("canvas");
        frame.width = frame.height = 10 + 2*r*1.25 | 0;
        let ctx = frame.getContext("2d"), cx = frame.width/2, cy = frame.height/2;
        ctx.shadowOffsetX = r/80;
        ctx.shadowOffsetY = r/80;
        ctx.shadowBlur = r/40;
        ctx.shadowColor = "rgba(0,0,0,0.5)";
        ctx.beginPath();
        ctx.arc(cx, cy, r*1.07, 0, 2*Math.PI, true);
        ctx.arc(cx, cy, r*0.975, 0, 2*Math.PI, false);
        ctx.fillStyle = "#263742";
        ctx.fill();
        ctx.shadowOffsetX = r/40;
        ctx.shadowOffsetY = r/40;
        let ctx2 = frame.getContext("2d"), cx2 = frame.width/2, cy2 = frame.height/2;
        ctx2.beginPath();
        ctx2.fillStyle = "#14222f";
        ctx2.arc(cx2, cy2, r/1.13, 0, 2*Math.PI, false);
        ctx2.fill();

        let ctx3 = frame.getContext("2d"), cx3 = frame.width/2, cy3 = frame.height/2;
        ctx3.beginPath();
        ctx3.arc(cx3, cy3, r*0.35, 0, 2*Math.PI, true);
        ctx3.arc(cx3, cy3, r*0.34, 0, 2*Math.PI, false);
        ctx3.fillStyle = "#263742";
        ctx3.fill();


        ctx.translate(cx, cy);
        ctx.rotate(Math.PI - 0.2);
        ctx.beginPath();
        ctx.moveTo(- r*1.15, - r*0.06);
        ctx.lineTo(- r*0.9, 0);
        ctx.lineTo(- r*1.15, r*0.06);
        ctx.fillStyle = "#f85771";
        ctx.fill();

    }

    canvas.width = 2.5*r;
    canvas.height = 2.5*r;
    if (innerWidth > innerHeight){cx = innerWidth/1.44, cy = innerHeight/2.15; }
    else {cx = innerWidth/8, cy = innerHeight/10;}
    let ctx = canvas.getContext("2d");
    let selected = (Math.floor((- 0.2 - angle) * sections.length / (2*Math.PI))
        % sections.length);
    if (selected < 0) selected += sections.length;
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(angle);
    ctx.translate(-wheels[selected].width/2, -wheels[selected].height/2);
    ctx.drawImage(wheels[selected], 0, 0);
    ctx.restore();
    ctx.drawImage(frame, cx - frame.width/2, cy - frame.height/2);
}

function change(text, color){
    document.getElementById("simple").innerHTML=text;
    document.getElementById("simple").style.color=color;
}

function getRandomFloat(min, max) {
    return Math.random() * (max - min) + min;
}




let angle = 0, running = false;
function spinTo(winner, duration) {
    let final_angle = (-0.2) - (getRandomFloat(0.001, 0.999) + winner)*2*Math.PI/(sections.length);
    let start_angle = angle - Math.floor(angle/(2*Math.PI))*2*Math.PI - 5*2*Math.PI;
    let start = performance.now();
    function frame() {
        let now = performance.now();
        let t = Math.min(1, (now - start) / duration);
        t = 3*t*t - 2*t*t*t; // ease in out
        angle = start_angle + t * (final_angle - start_angle);
        repaint(angle);
        if (t < 1) requestAnimationFrame(frame); else{
            change(sections[winner], colors[winner]);
            running = false;
        }
    }
    requestAnimationFrame(frame);
    //change(sections[winner]);
    running = true;
}




// setTimeout(start(), 1000);

canvas.onmousedown = function() {
    if (!running) {
        change("", "#14222f")
        x = Math.random() * sections.length | 0;
        spinTo(x, 1000);
    }
};



let csz = null;
setInterval(function() {
    let sz = innerWidth + "/" + innerHeight;
    if (csz !== sz) {
        csz = sz;
        wheels = frame = null;
        repaint(angle);
    }
}, 10);


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
var click =1;
var G=1;


// Telegram.WebApp.initDataUnsafe.user.id
var balance = 5000;




let X;
let Flag = 0;
if(innerWidth >= innerHeight) {
    X = Math.min(innerWidth, innerHeight)*0.099;
}else{
    X = Math.min(innerWidth, innerHeight)*0.11;
}



var rParticle = X*0.0172;
var rPlinko = X*0.02;
function setup() {
    createCanvas(X,X);
    colorMode(HSB);
    engine = Engine.create();
    world = engine.world;
    world.gravity.y = 1;

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
                // prise_box = Number(pairs[i].bodyA.price);
                // balance = balance + (document.getElementById('input1').value*prise_box);
                // document.getElementById("balance").innerHTML = "Balance: " + balance.toString() + "$";
                G=0;
                //World.remove(particles.pop());
                //particles.shift();
                //pairs[i].destroy();
            }
            else if (labelA === 'particle' && labelB === 'box') {
                // prise_box = Number(pairs[i].bodyB.price);
                // balance = balance + (document.getElementById('input1').value*prise_box);
                // document.getElementById("balance").innerHTML = "Balance: " + balance.toString() + "$";
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
    var b = new Boundary(spacingX*(i-2)-1, y, w, X*2);
    bounds.push(b);
    var b = new Boundary(1, y, w, X*2);
    bounds.push(b);

    //боксы для подсчета
    var b = new Box(X/13/2, height-h/4, X*0.9/cols, h/3, "#1CF80D", 26);
    bounds.push(b);
    var b = new Box(X/13/2*3, height-h/4, X*0.9/cols, h/3, "#6dde00", 9);
    bounds.push(b);
    var b = new Box(X/13/2*5, height-h/4, X*0.9/cols, h/3, "#2fa101", 4);
    bounds.push(b);
    var b = new Box(X/13/2*7, height-h/4, X*0.9/cols, h/3, "#466c79", 2);
    bounds.push(b);
    var b = new Box(X/13/2*9, height-h/4, X*0.9/cols, h/3, "#31415e", 0.6);
    bounds.push(b);
    var b = new Box(X/13/2*11, height-h/4, X*0.9/cols, h/3, "#2d313a", 0.4);
    bounds.push(b);
    var b = new Box(X/13/2*13, height-h/4, X*0.9/cols, h/3, "#1b1f2a", 0.2);
    bounds.push(b);
    var b = new Box(X/13/2*15, height-h/4, X*0.9/cols, h/3, "#2d313a", 0.4);
    bounds.push(b);
    var b = new Box(X/13/2*17, height-h/4, X*0.9/cols, h/3, "#31415e", 0.6);
    bounds.push(b);
    var b = new Box(X/13/2*19, height-h/4, X*0.9/cols, h/3, "#466c79", 2);
    bounds.push(b);
    var b = new Box(X/13/2*21, height-h/4, X*0.9/cols, h/3, "#2fa101", 4);
    bounds.push(b);
    var b = new Box(X/13/2*23, height-h/4, X*0.9/cols, h/3, "#6dde00", 9);
    bounds.push(b);
    var b = new Box(X/13/2*25, height-h/4, X*0.9/cols, h/3, "#1CF80D", 26);
    bounds.push(b);
}

function RandomParticle(min, max){
    return Math.random()* (max - min) + min;
}

function newParticle() {
    if (document.getElementById('input2').value == 1){
        var x = RandomParticle(X/2 - X*0.05, X/2 + X*0.05);
    }else if(document.getElementById('input2').value == 2){
        var x = RandomParticle(X/2 - X*0.09, X/2 + X*0.09);
    }else if(document.getElementById('input2').value == 3){
        var x = RandomParticle(X/2 - X*0.14, X/2 + X*0.14);
    }else if(document.getElementById('input2').value == 4){
        var x = RandomParticle(X/2 - X*0.19, X/2 + X*0.19);
    }else if(document.getElementById('input2').value == 5){
        var x = RandomParticle(X/2 - X*0.23, X/2 + X*0.23);
    }else if(document.getElementById('input2').value == 6){
        var x = RandomParticle(X/2 - X*0.27, X/2 + X*0.27);
    }
    //var x = RandomParticle(X/2 - X*0.3, X/2 + X*0.3);
    // //var x = RandomParticle(X/2 - X*0.05, X/2 + X*0.05);
    var p = new Particle(x, X*0.03, rParticle);
    particles.push(p);
}

// function changebalance(){
//     document.getElementById("balance").innerHTML = "Balance: " + balance.toString() + "$";
// }

function mousePressed(){
    click++;
    Flag = 1;
}
//
// function search_id(){
//     // const fs = require('fs');
//     fs.readFile(FILE_LOCATION, function (err, data) {
//         if (err) throw err;
//         if(data.includes('5012628435')){
//             console.log(data)
//         }
//     });
// }

//старт программы по клику
function start(){
    // //проверка баланса
    // var balance_check = document.getElementById('input1').value + (document.getElementById('input2').value *document.getElementById('input1').value)/10;
    // if(balance===0 || balance < 0 || balance - document.getElementById('input1').value - (document.getElementById('input2').value *document.getElementById('input1').value)/10 <=0){//|| balance_check >= balance){
    //     Flag = 0;
    // }else{
        //ding.play();
        //click++;
        //повышение шанса на выигрыш
        //balance = balance - document.getElementById('input1').value - (document.getElementById('input2').value *document.getElementById('input1').value)/10;
        //changebalance();
        //Flag = 1;
        //changebalance();
    //}
}

// function back() {
//     window.open('http://dimakpa.github.io/MainScreen', '_self').focus();
// }


function draw() {
    if(particles[0]){
        particles[0].show();
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

