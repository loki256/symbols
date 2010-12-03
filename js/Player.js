//
// Player functions and classes
//

// -------------------------
// Position class
// -------------------------

Symbols.Player = function(position) {

    this.position = position;
    this.fixed_destination = false;
    this.destination = this.position;
    this.velocity = new Symbols.Velosity(0, 0, 0);

    this.size = new Symbols.Size(20, 30);

    this.color = "rgb(0, 0, 255)";
    this.speed = 3.5;

    this.draw = function(/* canvasContext */ ctx) {
        ctx.save();
//        ctx.translate(this.position.x, this.position.y);
        ctx.strokeStyle = this.color;
//        ctx.fillStyle = this.color;
        var rect = this.getBoardRect();
        ctx.strokeRect(rect.x, rect.y, rect.width, rect.height);
        //ctx.beginPath();
        //ctx.arc(0, 0, this.radius, 0, Math.PI*2, true);
        //ctx.stroke();
        ctx.restore();
    };

    this.getBoardRect = function() {
        var pos_x = this.position.x - Math.floor(this.size.width / 2);
        var pos_y = this.position.y - Math.floor(this.size.height / 2);
        return new Symbols.Rectangle(new Symbols.Position(pos_x, pos_y), this.size);
    }
};


Symbols.Player.prototype.move = function() {
    this.moveToDestination();
    this.position.recalculate(this.velocity); 

    Symbols.addDebug(this.position.debug());
};


Symbols.Player.prototype.stop = function() {
    if (!this.fixed_destination)
    {
        this.destination = this.position;
    }
};


Symbols.Player.prototype.changeDestination = function(x, y, fixed_destination) {
    if (fixed_destination || !this.fixed_destination)
    {
        this.destination = new Symbols.Position(x, y); 
        this.fixed_destination = fixed_destination;
    }
};


Symbols.Player.prototype.clearFixed = function() {
    this.fixed_destination = false;
};


Symbols.Player.prototype.moveToDestination = function() {

    // determine distance
    var px = this.position.x;
    var py = this.position.y;

    var dx = this.destination.x;
    var dy = this.destination.y;

    var dist = Math.sqrt((dx - px)*(dx - px) + (dy - py)*(dy - py));
    dist++;

    var speed = 0;
    if (dist <= 70)
    {
        this.fixed_destination = false;
        speed = this.speed / 2;
    } 
    if (dist > 70) {
        speed = this.speed;
    }
    if (dist > 200) {
        speed = this.speed * dist / 200; 
    }

    // change velocity
    var vx = (dx - px) / dist;
    var vy = (dy - py) / dist;
    this.velocity = new Symbols.Velosity(vx, vy, speed);

    Symbols.addDebug(dist.toFixed(2));
    Symbols.addDebug(vx.toFixed(3) + " " + vy.toFixed(3));
};


