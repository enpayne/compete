module.exports = function(app, passport) {
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

    app.get('/api/tournaments', function(req, res) {
       var tournaments = [
           {
               name : "Flange Gilet",
               type : "Tabletennis",
               area : "Wettingen",
               players : 5
           }
       ]
        res.json(tournaments);
    });

    app.get('/tournaments', function(req, res) {
       res.sendfile('./public/src/views/partials/tournaments-list.html');
    });

    app.get('/tournaments/create', function(req, res) {
       res.sendfile('./public/src/views/partials/tournaments-create.html');
    });

    app.get('/profile', isLoggedIn, function(req, res) {
        res.json(req.user); // get the user out of session and pass to template
    });

    app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email'}));

    // handle the callback after facebook has authenticated the user
    app.get('/auth/facebook/cb',
        passport.authenticate('facebook', {
            successRedirect : '/tournaments',
            failureRedirect : '/'
        }));

    // route for logging out
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
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


