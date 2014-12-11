var mongoose = require('mongoose');

var tournamentSchema = mongoose.Schema({
        name : String,
        gameType : String,
        area : String,
        players : String,
        startDate : Date,
        endDate : Date,
        _owner : { type : mongoose.Schema.Types.ObjectId, ref : 'User'}
});

module.exports = mongoose.model('Tournament', tournamentSchema);
