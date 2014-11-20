var express         = require('express');
var app             = express();
var mongoose        = require('mongoose');
var passport        = require('passport');
var cookieParser    = require('cookie-parser');
var session         = require('express-session');

mongoose.connect('localhost:tournamator');

app.use(express.static('public'));
app.use(cookieParser());
app.use(session({ secret: 'tournamatorsecret' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

require('./app/routes')(app, passport);
require('./config/passport')(passport);

app.listen(8080);
console.log('Magic happens on 8080');