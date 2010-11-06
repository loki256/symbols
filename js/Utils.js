//
// Utils functions and classes
//

Symbols.DebugInfo = function() {

    this.enabled = true;
    this.style = "12pt Arial";
    this.position = { "x":600, "y":20 };

    this.text = new Array();
    this.const_text = new Array();

    this.draw = function(ctx) {
        if (this.enabled)
        {
            ctx.save();
            ctx.font = this.style;
            var x = this.position.x;
            var y = this.position.y;
            this.const_text.each(function (item, index) {
                    ctx.fillText(item, x, y);
                    y += 20;
                });
            while (this.text.length > 0) {
                ctx.fillText(this.text.shift(), this.position.x, y);
                y += 20;
            }
            ctx.restore();
        }
    };
};


Symbols.DebugInfo.prototype.addDebug = function(text) {
    this.text.push(text);
};

Symbols.DebugInfo.prototype.addConstDebug = function(text) {
    this.const_text.push(text);
};




// Get random int between 0 and value
Symbols.Rand = function(val) {
    return Math.floor(Math.random() * (val + 1));
}

