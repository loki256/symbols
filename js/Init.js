//
// Symbols main code
//

// global namespace
var Symbols;

if (!Symbols) {
    Symbols = { 
        version: "0.1",
    };
}


// Create context
// add debug objects
Symbols.preInit = function() {

    var canvas = document.getElementById('canvas');

    Symbols.ctx = canvas.getContext('2d');
    if (!Symbols.ctx) {
        throw ("Canvas not supported");
    }

    Symbols.debug = new Symbols.DebugInfo();
    Symbols.addDebug = function(text) {
        Symbols.debug.addDebug(text);
    };
    Symbols.addConstDebug = function(text) {
        Symbols.debug.addConstDebug(text);
    }
}


Symbols.init = function() {

    try {
        Symbols.preInit();
    } catch (e) {
        alert(e);
        return;
    }

    var canvas = document.getElementById('canvas');

    canvas.addEventListener("mousemove", Symbols.onMouseMove, false);
    canvas.addEventListener("mouseout", Symbols.onMouseOut, false);
    canvas.addEventListener("dblclick", Symbols.onDblClick, false);
    canvas.addEventListener("click", Symbols.onClick, false);

//    Symbols.addDebug = function(text) {
//        Symbols.debug.addDebug(text);
//    };

//    Symbols.addConstDebug = function(text) {
//        Symbols.debug.addConstDebug(text);
//    };

    Symbols.player = new Symbols.Player(new Symbols.Position(400, 300));

    Symbols.map = new Symbols.SymbolsMap(
        new Symbols.Rectangle(                  /// full size
            new Symbols.Position(0, 0),
            new Symbols.Size(800, 600)
        ),
        new Symbols.Rectangle(                  /// window
            new Symbols.Position(0, 0),        
            new Symbols.Size(640, 480)
        )
    );

    Symbols.map.addText("Hello there, ");
    for (var i = 0; i < 2500; i++) {
        Symbols.map.addText("d");
    }

    //Symbols.addTactEvent(0, function() {
    //    Symbols.map.moveWindow({x:1, y:0})}
    //);

    Symbols.addTactEvent(0, function() {
        var symbol_list = Symbols.map.getSymbolsInRect(
            Symbols.player.getBoardRect());
        symbol_list.each(function (symbol, index) {
                symbol.maxPower() });
        }
    );


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
    //s.map.reduceSymbolsPower();

    Symbols.runTactEvents();


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


Symbols.addTactEvent = function(tact_number, func) {
    if (!Symbols.event_list) {
        Symbols.event_list = [];
    }
    Symbols.event_list.push({tact_value: tact_number, tact_count: 0, callback: func});
};


Symbols.runTactEvents = function() {
    if (!Symbols.event_list) {
        return;
    }
    Symbols.event_list.each(function (ev) {
        if (ev.tact_count == ev.tact_value) {
            ev.callback();
            ev.tact_count = 0;
        } else {
            ev.tact_count++;
        }
    });
};

