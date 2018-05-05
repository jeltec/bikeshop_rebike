var User = require('../models/users');
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/userdb');

var db = mongoose.connection;

db.on('error', function (err) {
    console.log('connection error', err);
});
db.once('open', function () {
    console.log('connected to database');
});


router.signUp = function(req, res) {
            var user = new User();
            user.firstname = req.body.firstname;
            user.lastname = req.body.lastname;
            user.save(function(err){
                if(err)
                    res.send(err);
                res.json({message: 'User Added!', data: user});
            });
}

router.deleteUser = function(req, res) {
    User.findByIdAndRemove(req.params.id, function(err) {
        if (err)
            res.send(err);
        else
            res.json({ message: 'User Deleted!', data: User});
    });
}


module.exports = router;



/*var express = require('express');
var router = express.Router();



GET users listing.
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


module.exports = router;*/
