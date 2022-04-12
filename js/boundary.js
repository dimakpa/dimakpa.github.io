
function Boundary(x, y, w, h) {
    var options = {
        isStatic: true
    };
    this.body = Bodies.rectangle(x, y, w, h, options);
    this.body.label = 'boundary';
    this.w = w;
    this.h = h;
    World.add(world, this.body);
}

Boundary.prototype.show = function() {
    fill(160, 11, 35);
    stroke(0, 10, 75);
    var pos = this.body.position;
    push();
    translate(pos.x, pos.y);
    rectMode(CENTER);
    rect(0, 0, this.w, this.h);
    pop();
};


function Box(x, y, w, h, color_box, price) {
    var options = {
        isStatic: true
    };
    this.body = Bodies.rectangle(x, y, w, h, options);
    this.body.label = 'box';
    this.body.price = price;
    this.w = w;
    this.h = h;
    this.color_box = color_box;
    World.add(world, this.body);
}

Box.prototype.show = function() {
    fill(this.color_box);
    stroke(0, 10, 75);
    var pos = this.body.position;
    push();
    translate(pos.x, pos.y);
    rectMode(CENTER);
    rect(0, 0, this.w, this.h);
    pop();
};
