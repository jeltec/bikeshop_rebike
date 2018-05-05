var Bike = require('../models/bikes');
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/bikesdb');
var db = mongoose.connection;

db.on('error', function(err){
    console.log('connection error', err);
});
db.once('open', function (err) {
    console.log('Connected to database');
});

router.home = function(req, res) {
    //route to handle all angular requests
    res.sendFile('../public/index.ejs'); // load our public/index.ejs file
};

router.findAll = function(req, res) {
    Bike.find({}, function(err,bikes){
        if(err)
            res.send(err);
        else
            res.json(bikes);
    })
};

router.findOne = function(req, res) {
    Bike.find({"_id" : req.params.id}, function (err,bike) {
        if(err)
            res.json({message: 'Bike not found!', errmsg: err});
        else
            res.json(bike);
    });
};

router.addBike = function(req, res) {
    var bike = new Bike();

    bike.year = req.body.year;
    bike.type = req.body.type;
    bike.brand = req.body.brand;
    bike.users = req.body.users;
    bike.gender = req.body.gender;
    bike.save(function(err){
        if(err)
            res.send(err);
        res.json({message: 'Bike Added!', data: bike});
    });
};

router.deleteBike = function(req, res) {
    Bike.findByIdAndRemove(req.params.id, function(err){
        if(err)
            res.send(err);
        else
            res.json({message:'Bike Deleted!'});
    });
}

router.incrementUsers = function(req, res) {
    Bike.findById(req.params.id, function(err,bike) {
        if (err)
            res.send(err);
        else {
            bike.users += 1;
            bike.save(function (err) {
                if (err)
                    res.send(err);
                else
                    res.json({message: 'User Incremented!', data: bike})
            });
        }
    });
}

module.exports = router;
