//
// Utils functions and classes
//


// Get random int between 0 and value
Symbols.Rand = function(val) {
    return Math.floor(Math.random() * (val + 1));
}


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
    };

    reader.onerror = function(evt) {
        alert("error reading file");
    };

    reader.readAsText(file);
};


