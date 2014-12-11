var User = require('./models/user')
var gameTypes = require('./models/gameTypes.js')

module.exports = function(app, passport) {
    require('./api/tournaments.js')(app, passport, User);

    app.get('/', function(req, res) {
        res.sendfile('./public/src/views/index.html');
    });

    var sendJson = function(err, res, json) {
        if (err) {
            res.send(err);
        } else {
            res.json(json);
        }
    };

    app.get('/api/gameTypes', function(req, res) {
       res.send(gameTypes);
    });

    app.get('/profile', isLoggedIn, function(req, res) {
        res.json(req.user); // get the user out of session and pass to template
    });

    app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email'}));

    // handle the callback after facebook has authenticated the user
    app.get('/auth/facebook/cb',
        passport.authenticate('facebook', {
            successRedirect : '/',
            failureRedirect : '/'
        }));

    // route for logging out
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    app.get('/api/user', function(req, res) {
        res.json(req.user);
    });
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}


