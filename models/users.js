var mongoose = require('mongoose');
var usersSchema = new mongoose.Schema({
    firstname: {
        type: String,
        trim: true
    },
    lastname:{
        type: String,
        trim: true
    }
});


module.exports = mongoose.model('User', usersSchema)