/*
 * Global object
 * Wrapper for canvas context for optimizations
 */

// -------------------------
// CanvasContext class
// -------------------------
Symbols.CanvasContext = Class ({
    initialize: function(ctx) {
        this.ctx = ctx;
    },
    save: function() {
        this.ctx.save();
    },
    strokeStyle: function(style) {
        this.ctx.strokeStyle = style;
    },
    setFont: function(new_font) {
        if (this.saved_font == new_font) {
            return;
        }
        this.ctx.font = new_font;
        this.saved_font = new_font;
    }
});

     
