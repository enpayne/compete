var express         = require('express');
var app             = express();
var mongoose        = require('mongoose');
var passport        = require('passport');
var cookieParser    = require('cookie-parser');
var session         = require('express-session');
var bodyParser      = require('body-parser');

mongoose.connect('localhost:tournamator');

app.use(express.static('public'));
app.use(cookieParser());
app.use(session({ secret: 'tournamatorsecret' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(bodyParser());

require('./app/routes')(app, passport);
require('./config/passport')(passport);

var port = 8081;
app.listen(port);
console.log('Server is running on port ' + port);