// 
// Core classes and functions
//

// -------------------------
// Position class
// -------------------------
Symbols.Position = function(x, y) {
    this.x = x;
    this.y = y;
};


Symbols.Position.prototype.recalculate = function(velocity) {
    this.x += velocity.vx * velocity.module;
    this.y += velocity.vy * velocity.module;
};


Symbols.Position.prototype.debug = function(velocity) {
    return ("x:" + this.x.toFixed(2) + ", y:" + this.y.toFixed(2));
};


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
Symbols.Rectangle = function(position, size) {

    this.width = 0;
    this.position = position;
    this.size = size;

    this.x = position.x;
    this.y = position.y;

    this.width = this.size.width;
    this.height = this.size.height;

    this.getCenterPosition = function() {
        return new Symbols.Position(this.position.x + this.size.width / 2, this.position.y + this.size.height / 2);
    }
};



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


