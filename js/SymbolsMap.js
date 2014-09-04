
require(["Line", "Symbol", "Config", "utils/Logger"]);

// -------------------------
// SymbolMap class
// -------------------------
// FIXME Change to Page class
Symbols.SymbolsMap = Class({

    initialize: function(config) {

        this.config = config;

        this.rect = new Symbols.Rectangle(
            new Symbols.Position(0, 0),
            new Symbols.Size(
                this.config.full_size.width,
                this.config.full_size.height
                )
            );

        this.win_rect = new Symbols.Rectangle(
            new Symbols.Position(0, 0),
            new Symbols.Size(
                this.config.win_size.width,
                this.config.win_size.height
                )
            );

        this.style = this.config.color;

        this.position = this.rect.position;
        this.size = this.rect.size;

        // constants (yet)
        this.line_size = new Symbols.Size(this.size.width, 22);
        this.reduce_count = 10;

        this.line_list = [];
    },

    /// methods
    //
    addText : function(text) {
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
            logger.debug(e + ", current line numbers: " + this.line_list.length);
            this.is_full = true;
        }
    },


    addNewLine : function() {
        var lines = this.line_list.length;
        if ((lines + 1) * this.line_size.height > this.size.height) {
            throw "Too many lines";
        }
        this.line_list.push(new Symbols.Line(this.config.line));
        return this.line_list.getLast();
    },


    moveWindow : function(delta_position) {
        if ((delta_position.x > 0) && (this.win_rect.right >= this.rect.right)) {
            delta_position.x = 0;
        }
        if ((delta_position.x < 0) && (this.win_rect.x <= this.rect.x)) {
            delta_position.x = 0;
        }
        if ((delta_position.y > 0) && (this.win_rect.bottom >= this.rect.bottom)) {
            delta_position.y = 0;
        }
        if ((delta_position.y < 0) && (this.win_rect.y <= this.rect.y)) {
            delta_position.y = 0;
        }
        this.win_rect.position.add(delta_position);
    },


    clear : function() {
        this.is_full = false;
        this.line_list.length = 0; 
    },


    draw : function(ctx) {

//        ctx.drawImage(Symbols.paper,
//                      this.win_rect.position.x,
//                      this.win_rect.position.y,
//                      this.win_rect.size.width,
//                      this.win_rect.size.height,
//                      0,
//                      0,
//                      this.win_rect.size.width,
//                      this.win_rect.size.height
//                      );

        var canvas_context = Symbols.canvas_context;
        //canvas_context.setFillStyle(this.style)
        //ctx.fillRect(this.rect.x, this.rect.y, this.rect.width, this.rect.height);

        var line_list = this.getLinesInRect(this.win_rect);
        var current_height = 0;
        if (line_list.offset) {
            current_height += line_list.offset;
        }
        line_list.each(function(line, index) {
            var win = {
                x: this.win_rect.x,
                width:this.win_rect.width
                };
            var position = new Symbols.Position(0, current_height);
            line.drawWindow(position, win, ctx);
            current_height += line.size.height;
        // TODO Why this ?
        }, this);
    },


    reduceSymbolsPower : function() {
        this.reduce_count--; 
        if (this.reduce_count <= 0) {
            this.line_list.each(function(line, index) {
                line.decreasePower();
            });
            this.reduce_count = 10;
        }
    },
   

    getLinesInRect : function(rect) {

        var lines_list = [];

        var y_point = rect.y > 0 ? rect.y : 0;

        var first_line = Math.floor(y_point / this.line_size.height);
        var tmp = ((first_line + 1) * this.line_size.height) - y_point;
        var line_num = Math.ceil((rect.height - tmp) / this.line_size.height);

        // error here
        // test negative index
        for (var i = first_line; i <= (first_line + line_num); i++) {
            if ((i >= 0) && (i < this.line_list.length)) {
                lines_list.push(this.line_list[i]);
            }
        }

        //if (!lines_list.empty())
        //{
        lines_list.offset = (first_line * this.line_size.height) - rect.y;
        //}

        return lines_list;
    },


    getSymbolsInRect : function(rect) {

        // bug
        var real_rect = rect.clone();
        real_rect.position.add(this.win_rect.position);

        var symbol_list = [];
        this.getLinesInRect(real_rect).each(function (line) {
            symbol_list.append(line.getSymbolsInWindow(real_rect.x, real_rect.width));
        });
        return symbol_list;
    }
});

