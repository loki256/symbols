// -------------------------
// SymbolPower class
// -------------------------


Symbols.SymbolPower = function() {
    this.max_value = 50;
    //this._value = Symbols.Rand(this.max_value);
    this._value = this.max_value - 1;

    this.increase = function() {
        this._value++;
        if (this._value > this.max_value) {
            this._value = this.max_value;
        }
    };

    this.decrease = function() {
        this._value--;
        if (this._value <= 1) {
            this._value = 1;
        }
    };

    this.setMax = function() {
        this._value = this.max_value;
    };

    this.getStyle = function() {
        var color = Math.round((255 / this.max_value) * (this.max_value - this._value));
        return [color, color, color].rgbToHex();
    };
};

