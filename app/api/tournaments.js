var Tournament = require('../models/tournament');

module.exports = function(app, passport, User) {

    var sendJson = function(err, res, json) {
        if (err) {
            res.send(err);
        } else {
            res.json(json);
        }
    };

    app.get('/api/tournaments', function(req, res) {
        Tournament.find()
            .populate('_owner')
            .exec(function(err, tournaments) {
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
            tournament.startDate = req.body.startDate;
            tournament.endDate = req.body.endDate;
            tournament.description = req.body.description;

            tournament.save(function(err, tournament) {
                sendJson(err, res, tournament);
            });
        });
    });

    app.post('/api/tournaments', isLoggedIn,  function(req, res) {

        var userId = req.user.facebook.id;

        User.findOne({ 'facebook.id' : userId }, function(err, user) {
            if (err)
                return done(err);

            if (user) {
                Tournament.create({
                    name : req.body.name,
                    gameType : req.body.gameType,
                    area : req.body.area,
                    startDate : req.body.startDate,
                    endDate : req.body.endDate,
                    description: req.body.description,
                    players : '0',
                    _owner : user._id
                }, function(err, tournament) {
                    if (err) {
                        res.send(err);
                        return;
                    }

                    console.log('created tournament: ' + tournament);
                    user.tournaments.push(tournament._id);
                    sendJson(err, res, tournament);
                });


            }
        });
    });
};

function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}