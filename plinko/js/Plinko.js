function Plinko(x, y, r) {
    var options = {
        restitution: 1,
        friction: 0,
        isStatic: true
    };
    this.body = Bodies.circle(x, y, r, options);
    this.body.label = 'particle';
    this.r = r;
    World.add(world, this.body);
}

Plinko.prototype.show = function() {
    noStroke();
    //fill("#FFE4B5")
    fill("#28525c");
    var pos = this.body.position;
    push();
    translate(pos.x, pos.y);
    ellipse(0, 0, this.r * 2);
    pop();
};
