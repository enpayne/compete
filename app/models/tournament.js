var mongoose = require('mongoose');

var tournamentSchema = mongoose.Schema({
        name : String,
        gameType : String,
        area : String,
        players : String
});

module.exports = mongoose.model('Tournament', tournamentSchema);
