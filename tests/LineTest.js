//
//
var LineTest;

if (!LineTest) {
    LineTest = {}
}

LineTest.start = function() {
    Symbols.preInit();
    LineTest.map = new Symbols.SymbolsMap(
        new Symbols.Rectangle(                  /// full size
            new Symbols.Position(0, 0),
            new Symbols.Size(250, 80)
        ),
        new Symbols.Rectangle(                  /// window
            new Symbols.Position(0, 0),
            new Symbols.Size(250, 80)
        )
    );

    var canvas = document.getElementById('canvas');

    LineTest.ctx = canvas.getContext('2d');
    if (!LineTest.ctx) {
        alert("Canvas not supported");
        return;
    }

    LineTest.map.addText("This is simple test");
    setInterval(LineTest.mainLoop, 50);
};


LineTest.mainLoop = function() {
    var ctx = LineTest.ctx;
    ctx.clearRect(0, 0, 800, 600);
    LineTest.map.draw(ctx);
    LineTest.map.moveWindow({x:0, y:-1});
};

