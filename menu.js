function Button(x, y, w, h) {
    var options = {
        isStatic: true
    };
    this.body = Bodies.rectangle(x, y, w, h, options);
    this.body.label = 'button';
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.button = false;
    this.revealed = true;
    World.add(world, this.body);
}

// Button.prototype.show = function() {
//     fill(255);
//     stroke(255);
//     var pos = this.body.position;
//     push();
//     translate(pos.x, pos.y);
//     rectMode(CENTER);
//     rect(0, 0, this.w, this.h);
//     pop();
// };

Button.prototype.show = function() {
    fill(127);
    stroke(23);
    var a;
    var pos = this.body.position;
    if(this.revealed === false){
        a = rect(this.x-52, this.y-28, 105, 55 );
        a.strokeStyle="red";
    }else if(this.revealed === true){

    }
    push();
    translate(pos.x, pos.y);
    rectMode(CENTER);
    rect(0, 0, this.w, this.h);
    pop();
};

Button.prototype.contains = function(x, y) {
    return(x>this.x-53 && x<this.x-53 + this.w && y>this.y-27 && this.y<this.y+77);
};

Button.prototype.revealF = function() {
    this.revealed = false;
};

Button.prototype.revealT = function() {
    this.revealed = true;
};