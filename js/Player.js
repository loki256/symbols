//
// Player functions and classes
//

require(["Config"])

// -------------------------
// Position class
// -------------------------
Symbols.Player = Class({
    initialize: function(config) {

        this.reset(config.position);
        this.size = config.size;
        this.color = config.color;
        this.speed = config.speed;
    },

    draw: function(ctx) {
        ctx.save();
        var canvas_context = Symbols.canvas_context;
//        ctx.translate(this.position.x, this.position.y);
        canvas_context.setStrokeStyle(this.color);
//        canvas_context.setFillStyle(this.color);
        var rect = this.getBoardRect();
        ctx.strokeRect(rect.x, rect.y, rect.width, rect.height);
        //ctx.beginPath();
        //ctx.arc(0, 0, this.radius, 0, Math.PI*2, true);
        //ctx.stroke();
        ctx.restore();
    },

    getBoardRect: function() {
        var pos_x = this.position.x - Math.floor(this.size.width / 2);
        var pos_y = this.position.y - Math.floor(this.size.height / 2);
        return new Symbols.Rectangle(new Symbols.Position(pos_x, pos_y), this.size);
    },

    reset: function(position) {
        this.position = position;
        this.fixed_destination = false;
        this.destination = this.position;
        this.velocity = new Symbols.Velosity(0, 0, 0);
    },

    move: function() {
        this.moveToDestination();
        this.position.recalculate(this.velocity);
        //Symbols.addDebug("player position: " + this.position.debug());
    },

    stop: function() {
        if (!this.fixed_destination)
        {
            this.destination = this.position;
        }
    },

    changeDestination: function(x, y, fixed_destination) {
        if (fixed_destination || !this.fixed_destination)
        {
            this.destination = new Symbols.Position(x, y);
            this.fixed_destination = fixed_destination;
        }
    },

    clearFixed: function() {
        this.fixed_destination = false;
    },

    moveToDestination: function() {
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

//        Symbols.addDebug("distance: " + dist.toFixed(2));
//        Symbols.addDebug("velocity dv: " + vx.toFixed(3) + " " + vy.toFixed(3));
    }

});

