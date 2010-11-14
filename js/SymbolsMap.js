// 
// Symbol object
//

// -------------------------
// SymbolPower class
// -------------------------
Symbols.SymbolPower = function() {
    this.max_value = 50;
    this._value = Symbols.Rand(this.max_value);

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
        return "rgb(255, " + color + ", " + color + ")";
    };
};


// -------------------------
// Symbol class
// -------------------------
Symbols.Symbol = function(size, font, symbol) {

    this.size = size;
    this.symbol = symbol;
    this.font = font;

    this._power = new Symbols.SymbolPower();

    this.draw = function(position, ctx) {
        ctx.save();
        var rect = new Symbols.Rectangle(position, this.size);
        ctx.strokeStyle = this._power.getStyle();
        ctx.fillStyle = this._power.getStyle();
        ctx.strokeRect(rect.x + 1, rect.y + 1, rect.width - 1, rect.height - 1);
        ctx.font = this.font;
        ctx.fillText(this.symbol, position.x, position.y + this.size.height);
        ctx.restore();
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


// -------------------------
// SymbolLine class
// -------------------------
Symbols.SymbolLine = function(size) {

    this.size = size;
    this.font = "22pt Courier";

    this.current_width = 0;
    this.symbol_list = new Array();

    // throw on can't add
    this.addChar = function(ch) {
        var char_width = this.calcCharWidth(ch);
        if ((char_width + this.current_width) > this.size.width) {
            return false;
        }
        this.current_width += char_width;

        var symbol_size = new Symbols.Size(char_width, this.size.height);
        this.symbol_list.push(new Symbols.Symbol(symbol_size, this.font, ch));
        return true;
    };


    this.draw = function(position, ctx) {
        var line_position = new Symbols.Position(0, 0);
        this.symbol_list.each(function(symbol, index) {
            var symbol_pos = Symbols.addPosition(line_position, position);
            symbol.draw(symbol_pos, ctx);
            line_position.x += symbol.size.width;
        });
    };


    this.drawWindow = function(position, line_window, ctx) {
        var symbol_list = this.getSymbolsInWindow(line_window.x, line_window.width);
        if (symbol_list.length == 0) {
            return;
        }
        var draw_position = new Symbols.Position(0, 0);
        symbol_list.each(function(symbol) {
            var symbol_pos = Symbols.addPosition(draw_position, position);
            symbol.draw(symbol_pos, ctx);
            draw_position.x += symbol.size.width;
        });
    };

    
    this.decreasePower = function() {
        this.symbol_list.each(function(symbol, index) {
            symbol.decreasePower();
        });
    }


    this.maxPower = function() {
        this.symbol_list.each(function(symbol, index) {
                symbol.maxPower();
        });
    }


    this.getSymbolsInWindow = function(x, width) {
        var x_pos = 0;
        var symbol_list = [];
        this.symbol_list.each(function(symbol, index) {
                if ((x_pos >= x) && (x_pos <= (x + width))) {
                    symbol_list.push(symbol);
                } else if ((x >= x_pos) && (x <= (x_pos + symbol.size.width))) {
                    symbol_list.push(symbol);
                }
                x_pos += symbol.size.width;
            });
        return symbol_list;
    }


    this.calcCharWidth = function(ch) {
        // !! used global context here
        var ctx = Symbols.ctx;
        ctx.save();
        ctx.font = this.font;
        var measure = ctx.measureText(ch);
        var width = measure.width;
        ctx.restore();
        return width;
    }
}


// -------------------------
// SymbolMap class
// -------------------------
Symbols.SymbolsMap = function(full_rect, win_rect) {

    this.rect = full_rect;
    this.position = full_rect.position;
    this.size = full_rect.size;

    this.win_rect = win_rect;
    this.win_size = win_rect.size;
    this.win_position = win_rect.position;

    this.reduce_count = 10;
    this.style = "rgba(0, 255, 0, 0.2)";

    this.line_size = new Symbols.Size(this.size.width, 22);
    this.line_list = new Array();

    /// methods
    //
    this.addText = function(text) {
        if (this.is_full) {
            return;
        }
        try {
            var line = this.line_list.getLast();
            if (!line) {
                line = this.addNewLine();
            }

            for (var i = 0; i < text.length; i++) {
                var ch = text.charAt(i);
                if (!line.addChar(ch)) {
                    // line is full ?
                    line = this.addNewLine();
                    if (!line.addChar(ch)) {
                        throw "Can't add char";
                    }
                }
            }
        } catch (e) {
            Symbols.addConstDebug(e + ", current line numbers: " + this.line_list.length);
            this.is_full = true;
        }
    };


    this.addNewLine = function() {
        var lines = this.line_list.length;
        if ((lines + 1) * this.line_size.height > this.size.height) {
            throw "Too many lines";
        }
        this.line_list.push(new Symbols.SymbolLine(this.line_size));
        return this.line_list.getLast();
    }


    this.moveWindow = function(delta) {
        this.win_rect.x += delta.x;
        this.win_rect.y += delta.y;
    }


    this.draw = function(ctx) {
        ctx.save();

/*      ctx.fillStyle = this.style = "rgba(0, 0, 255, 0.4)";
        ctx.fillRect(
            this.rect.x, this.rect.y,
            this.rect.width, this.rect.height);
*/

        ctx.fillStyle = this.style = "rgba(0, 255, 0, 0.4)";
        ctx.fillRect(
            0, 0,
            this.win_rect.width, this.win_rect.height);

        var current_height = 0;
        var line_list = this.getLinesInRect(this.win_rect);
        line_list.each(function(line, index) {
            var position = new Symbols.Position(0, current_height);
            var win = {x: this.win_rect.x, width:this.win_rect.width};
            line.drawWindow(position, win, ctx);
            current_height += line.size.height;
        }, this);
        ctx.restore();
    };


    this.reduceSymbolsPower = function() {
        this.reduce_count--; 
        if (this.reduce_count <= 0) {
            this.line_list.each(function(line, index) {
                line.decreasePower();
            });
            this.reduce_count = 10;
        }
    }
   

    this.getLinesInRect = function(rect) {

        var lines_list = [];

        var first_line = Math.floor(rect.y / this.line_size.height);
        var tmp = ((first_line + 1) * this.line_size.height) - rect.y;
        var line_num = Math.ceil((rect.height - tmp) / this.line_size.height);

        for (var i = first_line; i <= (first_line + line_num); i++) {
            lines_list.push(this.line_list[i]);
        }
        return lines_list;
    }


    this.getSymbolsInRect = function(rect) {

        var symbol_list = [];
        this.getLinesInRect(rect).each(function (line) {
            symbol_list.append(line.getSymbolsInWindow(rect.x, rect.width));
        })
        return symbol_list;
    }

}

