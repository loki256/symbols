//
// Print varios info (for debugging)
//

Symbols.DebugInfo = function() {

    this.enabled = false;

    if (!this.enabled) {
        this.draw = function(ctx) {};
        this.addConstDebug = function(text) {};
        this.addDebug = function(text) {};
        return;
    }

    this.style = "15pt Arial";
    this.position = { x:100, y:100 };

    this.text = new Array();
    this.const_text = new Array();

    var canvas = document.createElement("canvas");
    canvas.id = "debug";
    canvas.width = "100";
    canvas.height = "100";
    document.body.appendChild(canvas)

    this.draw = function(ctx) {
        if (this.enabled)
        {
            //ctx.save();
            var canvas_context = Symbols.canvas_context;
            canvas_context.setFont(this.style);

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
            //ctx.restore();
        }
    };

    this.addDebug = function(text) {
        this.text.push(text);
    };

    this.addConstDebug = function(text) {
        this.const_text.push(text);
    };
};

