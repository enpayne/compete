var express = require('express');
var app     = express();
var redis   = require("redis"), client = redis.createClient();

client.on("error", function (err) {
    console.log("Error " + err);
});

app.use(express.static('public'));

app.get('/', function(req, res) {
    res.sendfile('./public/src/views/index.html');
});


app.get('/api/players', function(req, res) {
   var players = [
       {
           name : "nick",
           score : 7
       },
       {
           name : "pete",
           score : 5
       }
   ]

    res.json(players);
});


app.listen(8080);
console.log('Magic happens on 8080');