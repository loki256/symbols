// 
// Core classes and functions
//

// -------------------------
// Position class
// -------------------------
Symbols.Position = new Class({

    initialize: function(x, y) {
        this.x = x;
        this.y = y;
    },
    recalculate: function(velocity) {
        this.x += velocity.vx * velocity.module;
        this.y += velocity.vy * velocity.module;
    },
    add: function(position) {
        this.x += position.x;
        this.y += position.y;
    }
});

Symbols.Position.implement({
    debug: function(velocity) {
        return ("x:" + this.x.toFixed(2) + ", y:" + this.y.toFixed(2));
    }
});


Symbols.addPosition = function(pos1, pos2) {
    return new Symbols.Position(pos1.x + pos2.x, pos1.y + pos2.y);
};


// -------------------------
// Size class
// -------------------------
Symbols.Size = function(width, height) {
    this.width = width;
    this.height = height;
};


// -------------------------
// Rectangle class
// -------------------------
Symbols.Rectangle = Class({

    initialize: function(position, size) {
        this.position = position;
        this.size = size;
        this.__defineGetter__("x", function() {
            return this.position.x;
        });
        this.__defineGetter__("y", function() {
            return this.position.y;
        });
        this.__defineGetter__("width", function() {
            return this.size.width;
        });
        this.__defineGetter__("height", function() {
            return this.size.height;
        });
        this.__defineGetter__("right", function() {
            return this.position.x + this.size.width;
        });
        this.__defineGetter__("bottom", function() {
            return this.position.y + this.size.height;
        });
    },

    getCenterPosition: function() {
        return new Symbols.Position(this.position.x + this.size.width / 2, this.position.y + this.size.height / 2);
    },

    clone: function() {
        var position = Object.clone(this.position); 
        var size = Object.clone(this.size); 
        return new Symbols.Rectangle(position, size);
    }
});


// -------------------------
// Velosity class
// -------------------------
Symbols.Velosity = function(vx, vy, module) {
    this.vx = vx;
    this.vy = vy;
    this.module = module;

    this.reset = function() {
        this.vx = 0;
        this.vy = 0;
        this.module = 0;
    };
};


