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

// other modules
require(["CanvasContext", "Config", "utils/DebugInfo", "SymbolsMap", "Player", "EventManager"]);

// Create context
// add debug objects
Symbols.preInit = function() {

    var canvas = $('canvas');
    Symbols.canvas = canvas;

    Symbols.paper = $('paper_id');

    Symbols.ctx = canvas.getContext('2d');
    if (!Symbols.ctx) {
        throw ("Canvas not supported");
    }

    Symbols.canvas_context = new Symbols.CanvasContext(Symbols.ctx);

    Symbols.debug = new Symbols.DebugInfo();
    Symbols.addDebug = Symbols.debug.addDebug.bind(Symbols.debug);
    Symbols.addConstDebug = Symbols.debug.addConstDebug.bind(Symbols.debug);
};


Symbols.init = function() {

    try {
        Symbols.preInit();
    } catch (e) {
        console.error("Can't preinit symbols" + e);
        return;
    }

    var canvas = document.getElementById('canvas');

    canvas.addEventListener("mousemove", Symbols.onMouseMove, false);
    canvas.addEventListener("mouseout", Symbols.onMouseOut, false);
    canvas.addEventListener("mouseover", Symbols.onMouseOver, false);
    canvas.addEventListener("dblclick", Symbols.onDblClick, false);
    canvas.addEventListener("click", Symbols.onClick, false);

    var config = new Symbols.Config();

    Symbols.map = new Symbols.SymbolsMap(config.page);
    Symbols.player = new Symbols.Player(config.player);

    Symbols.event_manager = new Symbols.EventManager();

    Symbols.mainLoopInterval = setInterval(Symbols.mainLoop, 50);
    Symbols.isRunning = true;
};


Symbols.mainLoop = function() {

    var ctx = Symbols.ctx;
    var canvas = $('canvas');

    ctx.save();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.restore();

    Symbols.map.draw(ctx);
    Symbols.debug.draw(ctx);
    Symbols.player.draw(ctx);
    Symbols.player.move();

    Symbols.event_manager.runTactEvents();
};


Symbols._getMouseCoordinates = function(ev) {
    var x = ev.clientX - Symbols.canvas.getBoundingClientRect().left;
    var y = ev.clientY - Symbols.canvas.getBoundingClientRect().top;
    return {"x":x, "y":y}
}


Symbols.onMouseMove = function(ev) {
    var point = Symbols._getMouseCoordinates(ev);
    Symbols.player.changeDestination(point.x, point.y);
};


Symbols.onMouseOut = function(ev) {
    console.log("onMouseOut");
    if (Symbols.isRunning) {
        Symbols.player.stop();
        clearInterval(Symbols.mainLoopInterval);
        Symbols.isRunning = false;
        console.log("isRunning: " + Symbols.isRunning);
    }
};

Symbols.onMouseOver = function(ev) {
    console.log("onMouseOver");
    if (!Symbols.isRunning) {
        Symbols.mainLoopInterval = setInterval(Symbols.mainLoop, 50);
        Symbols.isRunning = true;
        console.log("isRunning: " + Symbols.isRunning);
    }
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

