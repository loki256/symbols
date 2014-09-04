/**
 *
 * Created by georg on 9/4/14.
 */
/* global logger:true */
/* global Symbols:false */

Symbols.Logger = function() {

    "use strict";

    this.count = 0;
    this.debug = function(message) {

        var id = $$('.log')[0];
        if (undefined !== id) {
            var element = new Element("span", { "text": this.count + ": " + message });
            this.count++;
            element.grab(new Element("br", "after"));
            element.inject(id, "top");
        } else {
            console.log("id is undefined");
        }
    };

    this.clear = function() {
        console.log("clear");
        this.count = 0;
        var id = $$('.log span');
        id.destroy();
    };
};

logger = new Symbols.Logger();
