var mongoose = require('mongoose');

var bikeSchema = new mongoose.Schema({
    year: Number,
    type: String,
    brand: String,
    users: {type: Number, default: 0},
    gender: String
});

module.exports =  mongoose.model('Bike', bikeSchema)
