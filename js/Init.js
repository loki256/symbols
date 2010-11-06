//
// Symbols main code
//

// global namespace
var Symbols;

if (!Symbols) {
    Symbols = { 
        version: "0.1"
    };
}


Symbols.init = function() {
    var canvas = document.getElementById('canvas');

    Symbols.ctx = canvas.getContext('2d');
    if (!Symbols.ctx) {
        alert("Canvas not supported");
        return;
    }

    canvas.addEventListener("mousemove", Symbols.onMouseMove, false);
    canvas.addEventListener("mouseout", Symbols.onMouseOut, false);
    canvas.addEventListener("dblclick", Symbols.onDblClick, false);
    canvas.addEventListener("click", Symbols.onClick, false);

    Symbols.debug = new Symbols.DebugInfo();
    Symbols.addDebug = function(text) {
        Symbols.debug.addDebug(text);
    };

    Symbols.addConstDebug = function(text) {
        Symbols.debug.addConstDebug(text);
    };

    Symbols.player = new Symbols.Player(new Symbols.Position(400, 300));
    Symbols.map = new Symbols.SymbolsMap(new Symbols.Position(0, 0), 800, 600);

    Symbols.map.addText("Hello there, ");
    for (var i = 0; i < 2500; i++) {
        Symbols.map.addText("l");
    }

    setInterval(Symbols.mainLoop, 50);
};


Symbols.mainLoop = function() {

    var s = Symbols;
    var ctx = Symbols.ctx;

    ctx.clearRect(0, 0, 800, 600);

    s.map.draw(ctx);
    s.debug.draw(ctx);
    s.player.draw(ctx);

    s.player.move();
    s.map.reduceSymbolsPower();

    var player_rect = s.player.getBoardRect();
    s.map.getSymbolsInRect(player_rect);

};


Symbols.onMouseMove = function(ev) {
    var x = ev.clientX;
    var y = ev.clientY;
    Symbols.player.changeDestination(x, y);
};


Symbols.onMouseOut = function(ev) {
    Symbols.player.stop();
};


Symbols.onClick = function(ev) {
    var x = ev.clientX;
    var y = ev.clientY;
    Symbols.player.clearFixed();
    Symbols.player.changeDestination(x, y, false);
};


Symbols.onDblClick = function(ev) {
    var x = ev.clientX;
    var y = ev.clientY;
    Symbols.player.changeDestination(x, y, true);
};


