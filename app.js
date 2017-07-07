var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var jwt = require('jsonwebtoken');

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var config = require('./config');

var app = express();


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', routes);

app.use(function (req, res, next) {

    //var token = req.body.token || req.query.token || req.headers['x-access-token'];
    var token =  req.headers['authorization'].split('Bearer ')[1];
    


    if (token && token.trim()) {
        // verifies secret and checks exp
        jwt.verify(token, config.jwtSecret, function (err, decoded) {
            if (err) {
                return res.json({success: false, message: 'Failed to authenticate token.'});
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }
});



app.use('/api/users', users);


var port = process.env.PORT || 8000;

app.listen(port);

console.log('server started at : ' + port);


module.exports = app;
