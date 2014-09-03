/*
 * Varios configs for project
 */

Symbols.Config = Class({

    initialize: function() {
        // init window size
        var canvas = $('canvas');
        canvas.width = this.canvas.width;
        canvas.height = this.canvas.height;

        this.page.win_size.width = this.canvas.width;
        this.page.win_size.height = this.canvas.height;
    },

    // Symbols.SymbolMap section
    canvas: {
        width: 800,
        height: 600
    },

    page: {
        // full map is A4 format
        full_size : {
            width: 1024,
            height: Math.floor(1024 * 0.707)
        },

        /// window size equal canvas object size, set in constuctor
        win_size : {},

        line: {
            font: "22pt Courier",
            //font: "35pt Nova Square",
            left_margin: 20,
            rigth_margin: 0,
            size: {
                width: 1024,
                height: 42
            },
        },
    },


    player: {
        init_position: {
            x: 100,
            y: 100
        },
        speed: 4.5,
        color: "rgb(0, 0, 255)",
        size: {
            width: 20,
            height: 30,
        },
    }

});




