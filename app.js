var express = require('express');
var path = require('path');

var port = process.env.PORT || 5000;
var app = express();

['images', 'js', 'css', 'resources'].forEach(function(item) {
    console.log(item);
    app.use('/' + item, express.static(path.join(__dirname, item), {maxAge: 2592000000}));
});

app.get('/', function(request, response) {
    response.sendfile(path.join(__dirname, 'index.html'));
});

app.listen(port);
