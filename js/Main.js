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

    Symbols.canvas_context = new Symbols.CanvasContext(Symbols.ctx); 

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

    Symbols.map = new Symbols.SymbolsMap(
        new Symbols.Rectangle(                  /// full size
            new Symbols.Position(0, 0),
            new Symbols.Size(1024, 768)
        ),
        new Symbols.Rectangle(                  /// window
            new Symbols.Position(0, 0),        
            new Symbols.Size(800, 600)
        )
    );
    Symbols.player = new Symbols.Player();
    Symbols.event_manager = new Symbols.EventManager();

    setInterval(Symbols.mainLoop, 50);
};


Symbols.mainLoop = function() {

    var ctx = Symbols.ctx;

    ctx.clearRect(0, 0, 800, 600);

    Symbols.map.draw(ctx);
    Symbols.debug.draw(ctx);
    Symbols.player.draw(ctx);
    Symbols.player.move();

    Symbols.event_manager.runTactEvents();
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


//
// uploadFile function 
// debug only
//
Symbols.uploadFile = function(input) {

    var file = input.files[0];
    if (!file) {
        console.log("No file");
        return;
    }
    var reader = new FileReader();

    reader.onload = function(evt) {
        Symbols.event_manager.resetMap(new Symbols.SimpleProveder(evt.target.result))
        Symbols.event_manager.resetPlayer();
        //console.log(str);
    };

    reader.onerror = function(evt) {
        alert("error reading file");
    };

    reader.readAsText(file);
};

