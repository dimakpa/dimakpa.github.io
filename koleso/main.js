
let canvas = document.getElementById("canvas");

let sections = ["0.00×", "30.00×", "0.00×", "4.00×", "0.00×",
    "1.70×", "0.00×", "2.00×", "0.00×", "1.50×",
    "0.00×", "1.50×", "0.00×", "1.50×", "0.00×", "1.70×", "0.00×",
    "2.00×", "0.00×", "1.50×", "0.00×", "2.00×",
    "0.00×", "4.00×","0.00×", "2.00×", "0.00×", "2.00×", "0.00×",
    "1.50×" ];

let colors = ["#406c81", "#7e46fc", "#406c81", "#fba22f","#406c81","#d4e7f1","#406c81","#fce805",
    "#406c81","#00e304","#406c81","#00e304","#406c81","#00e304","#406c81","#d4e7f1",
    "#406c81","#fce805","#406c81","#00e304","#406c81","#fce805","#406c81","#fba22f",
    "#406c81","#fce805","#406c81","#fce805","#406c81","#00e304"];

let wheels = null;
let frame = null;
let text = null;

function repaint(angle) {
    let r = Math.min(innerWidth, innerHeight) * 0.35;
    if (wheels === null) {
        wheels = [];
        for (let selected=0; selected<sections.length; selected++) {
            let c = document.createElement("canvas");
            //let b = document.getElementById("simple");
            c.width = c.height = 2*r + 10;
            //b.style = "#ff0000";
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
                if (i == selected) {
                    ctx.fillStyle = "#000000";
                } else {
                    ctx.fillStyle = "#ff0000";
                }
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
        ctx.beginPath();
        ctx.arc(cx, cy, r*1.07, 0, 2*Math.PI, true);
        ctx.arc(cx, cy, r*0.975, 0, 2*Math.PI, false);
        ctx.fillStyle = "#263742";
        ctx.fill();

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
                    ctx.moveTo(- r*1.1, - r*0.05);
                    ctx.lineTo(- r*0.9, 0);
                    ctx.lineTo(- r*1.1, r*0.05);
                    ctx.fillStyle = "#fa0000";
                    ctx.fill();


    }

    canvas.width = innerWidth;
    canvas.height = innerHeight;
    let cx = innerWidth/2, cy = innerHeight/2;
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

let audio1 = new Audio('audio1.mp3');

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
            if (sections[winner] != '0.00×') {
                audio1.play();}
            running = false;
        }
    }
    requestAnimationFrame(frame);
    //change(sections[winner]);
    running = true;
}
let x = null
canvas.onmousedown = function() {
    if (!running) {
        change("null", "#14222f")
        x = Math.random()*sections.length|0;
        spinTo(x, 1500);
    }
};


document.addEventListener('keydown', function(event) {
    if (event.code == 'Space') {
        if (!running) {
            change("null", "#14222f")
            x = Math.random()*sections.length|0;
            spinTo(x, 1500);
        }
    }
});
//repaint(angle);

let csz = null;
setInterval(function() {
    let sz = innerWidth + "/" + innerHeight;
    if (csz !== sz) {
        csz = sz;
        wheels = frame = null;
        repaint(angle);
    }
}, 10);
