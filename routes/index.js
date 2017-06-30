var express = require('express');
var router = express.Router();
var DB = require('./database');
var jwt = require('jsonwebtoken');
var config = require('../config');

router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.post('/authenticate', function (req, res, next) {

    DB.getUser(req.body, function (error, user) {
        if (error) {
            throw  error;
        }
        if (!user) {
            return res.json({success: false, message: 'User not found.'});
        } else if (user) {
            if (user.password != req.body.password) {
                return res.json({success: false, message: 'Wrong password.'});
            }
            //Signing the token
            var token = jwt.sign(user, config.jwtSecret, {
                expiresIn: "2 days"
            });

            res.json({
                success: true,
                token: token
            });
        }
    });
});

module.exports = router;
