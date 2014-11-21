var Tournament = require('./models/tournament');

module.exports = function(app, passport) {
    app.get('/', function(req, res) {
        res.sendfile('./public/src/views/index.html');
    });

    var sendJson = function(err, res, json) {
        if (err) {
            res.send(err);
        } else {
            res.json(json);
        }
    }

    app.get('/api/tournaments', function(req, res) {
        Tournament.find(function(err, tournaments) {
          sendJson(err, res, tournaments);

       });
    });

    app.get('/api/tournaments/:tournament_id', function(req, res) {
        Tournament.findOne({
            _id : req.params.tournament_id
        }, function(err, tournament) {
            sendJson(err, res, tournament);
        });
    });

    app.delete('/api/tournaments/:tournament_id', function(req, res) {
        Tournament.remove({
            _id : req.params.tournament_id
        }, function(err, tournament) {
            sendJson(err, res, tournament);
        });
    });

    app.put('/api/tournaments/:tournament_id', function(req, res) {
        var tournamentId = req.params.tournament_id;

        Tournament.findById(tournamentId, function(err, tournament) {
            tournament.name = req.body.name;
            tournament.gameType = req.body.gameType;
            tournament.area = req.body.area;

            tournament.save(function(err, tournament) {
               sendJson(err, res, tournament);
            });
        });

    });

    app.post('/api/tournaments', function(req, res) {
       Tournament.create({
            name : req.body.name,
            gameType : req.body.gameType,
            area : req.body.area,
            players : '0'
        }, function(err, tournament) {
           if (err) {
               res.send(err);
               return;
           }

           Tournament.find(function(err, tournaments) {
               sendJson(err, res, tournaments);
           });
       });

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


