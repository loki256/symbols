// -------------------------
// Line class
// -------------------------

require(["Symbol", "Config"]);

Symbols.Line = function(config) {

    this.config = config;

    this.size = this.config.size;
    this.font = this.config.font;

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
        var left_margin = this.config.left_margin
        var symbol_position = new Symbols.Position(0, 0);
        symbol_position.add(position);
        this.symbol_list.each(function(symbol, index) {
            symbol.draw(symbol_pos, ctx);
            symbol_pos.x += symbol.size.width;
        });
    };


    this.drawWindow = function(position, line_window, ctx) {
        var symbol_list = this.getSymbolsInWindow(line_window.x, line_window.width);
        if (symbol_list.length == 0) {
            return;
        }
        var draw_position = new Symbols.Position(0, 0);
        draw_position.add(position);
        if (symbol_list.offset) {
            draw_position.x += symbol_list.offset 
        }
        symbol_list.each(function(symbol) {
            symbol.draw(draw_position, ctx);
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
        var first_symbol_pos;

        var x_pos = 0;
        var symbol_list = [];
        this.symbol_list.each(function(symbol, index) {
            if (
                ((x_pos >= x) && (x_pos <= (x + width))) || 
                ((x >= x_pos) && (x <= (x_pos + symbol.size.width)))
                )
                {
                if (first_symbol_pos === undefined) {
                    first_symbol_pos = x_pos;
                }
                symbol_list.push(symbol);
            }
            x_pos += symbol.size.width;
        });

        // get offset
        if (first_symbol_pos !== undefined) {
            symbol_list.offset = first_symbol_pos - x; 
        }
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

