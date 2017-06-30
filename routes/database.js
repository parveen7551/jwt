var MongoDB = require('mongodb').Db;
var Server = require('mongodb').Server;
var dbName = 'jwt';

var db = new MongoDB(dbName, new Server('localhost', 27017, {auto_reconnect: true}), {w: 1});
db.open(function (e, d) {
    if (e) {
        console.log(e);
    } else {
        console.log('connected to database :: ' + dbName);
    }
});

var user = db.collection('user');

exports.getUser = function (userData, callback) {

    user.findOne({email:userData.email},function (error, user) {
        if (error) {
            callback(error,null);
        } else {
            callback(null,user);
        }
    });
};

exports.getAllUsers = function (callback) {

    user.find({}).toArray(function (error, users) {
        if (error) {
            callback(error,null);
        } else {
            callback(null,users);
        }
    });
};

