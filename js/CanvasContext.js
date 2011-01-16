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

    setStrokeStyle: function(style) {
        if (this.saved_stroke_style == style) {
            return;
        }
        this.ctx.strokeStyle = style;
        this.saved_stroke_style = style;
    },

    setFillStyle: function(style) {
        if (this.saved_fill_style == style) {
            return;
        }
        this.ctx.fillStyle = style;
        this.saved_fill_style = style;
    },

    setFont: function(new_font) {
        if (this.saved_font == new_font) {
            return;
        }
        this.ctx.font = new_font;
        this.saved_font = new_font;
    }
});

     
