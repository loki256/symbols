/*
 * main game logic here
 */

Symbols.SimpleProveder = function(str) {
    this.list = Array.from(str);
    for (var i = 0; i < 1500; i++) {
        this.list.push("d");
    }
    this.getNextSymbol = function() {
        return this.list.shift();
    }
};


Symbols.RequestProvider = function(resource_name) {
    this.str = "";
    this.index = 0;

    var request = new Request({
        url: resource_name,
        async: false,
        onSuccess: function(responseText, responseXML) {
            this.str = responseText;
        }.bind(this)}).get();

    this.getNextSymbol = function() {
        return this.str[this.index++];
    }
}


// EventManager class
Symbols.EventManager = Class({

    initialize: function() {
        this.resetMap(new Symbols.RequestProvider("resources/level1.txt"));
        this.resetPlayer();
        this.initEvents();
    },

    resetMap: function(symbolsProveder) {
        Symbols.map.clear();
        do {
            var ch = symbolsProveder.getNextSymbol();
            if (ch) {
                Symbols.map.addText(ch);
            }
        } while (ch);
    },

    resetPlayer: function(position) {
        if (!position) {
            position = new Symbols.Position(400, 300);
        }
        Symbols.player.reset(position);
    },

    //
    // private functions
    //
    addTactEvent: function(tact_number, func) {
        if (!this.event_list) {
            this.event_list = [];
        }
        this.event_list.push({tact_value: tact_number, tact_count: 0, callback: func});
    },

    runTactEvents: function() {
        if (!this.event_list) {
            return;
        }
        this.event_list.each(function (ev) {
            if (ev.tact_count == ev.tact_value) {
                ev.callback();
                ev.tact_count = 0;
            } else {
                ev.tact_count++;
            }
        });
    },

    initEvents: function() {

            // move window of map when player reach some side (1/4 of width, height)
        this.addTactEvent(0, function() {
            var delta_position = {x:0, y:0};
            var wquarter = Symbols.map.win_rect.width / 4;
            if (Symbols.player.position.x >= (Symbols.map.win_rect.width - wquarter)) {
                delta_position.x = 1;
            }
            if (Symbols.player.position.x <= wquarter) {
                delta_position.x = -1;
            }

            var hquarter = Symbols.map.win_rect.height / 4;
            if (Symbols.player.position.y >= (Symbols.map.win_rect.height - hquarter)) {
                delta_position.y = 1;
            }
            if (Symbols.player.position.y <= hquarter) {
                delta_position.y = -1;
            }

            Symbols.map.moveWindow(delta_position);
        });

            // max power of symbols, when player reach them
        this.addTactEvent(0, function() {
            var symbol_list = Symbols.map.getSymbolsInRect(Symbols.player.getBoardRect());
            symbol_list.each(function (symbol, index) {
                symbol.maxPower()
            });
        });

            // reduce symbol power in time
        this.addTactEvent(10, function() {
            Symbols.map.reduceSymbolsPower();
        });
    }
});

