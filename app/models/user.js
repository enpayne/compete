var mongoose = require('mongoose');

var userSchema = mongoose.Schema({

    local            : {
        email        : String,
        password     : String
    },
    facebook         : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },

    tournaments      : [{ type: mongoose.Schema.Types.ObjectId, ref : 'Tournament'}]

});

module.exports = mongoose.model('User', userSchema);
