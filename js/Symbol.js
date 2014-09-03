//
// One symbol
//

require(["Core", "Power"]);

// -------------------------
// Symbol class
// -------------------------
Symbols.Symbol = function(size, font, symbol) {

    this.size = size;
    this.symbol = symbol;
    this.font = font;

    this._power = new Symbols.SymbolPower();

    this.draw = function(position, ctx) {
        var ctx = Symbols.ctx;
        var canvas_context = Symbols.canvas_context;

        //canvas_context.save();
        canvas_context.setStrokeStyle(this._power.getStyle());
        // debug, uncommet to see rectangle
        //ctx.strokeRect(position.x + 1, position.y + 1, this.size.width - 1, this.size.height - 1);
        canvas_context.setFont(this.font);
        canvas_context.setFillStyle(this._power.getStyle());
        ctx.fillText(this.symbol, position.x, position.y + this.size.height);
        //canvas_context.restore();
        //ctx.restore();
    };

    this.decreasePower = function() {
        this._power.decrease();
    };

    this.increasePower = function() {
        this._power.increase();
    };

    this.maxPower = function() {
        this._power.setMax();
    };
};

