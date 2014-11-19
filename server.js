var express = require('express');
var app     = express();
var mongoose = require('mongoose');
var passport = require('passport');

require('./app/routes')(app, passport);
require('./app/user')(app, mongoose);

mongoose.connect('localhost:compete');

app.use(express.static('public'));

app.listen(8080);
console.log('Magic happens on 8080');