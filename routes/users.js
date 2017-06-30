var express = require('express');
var router = express.Router();
var DB = require('./database');

/* GET users listing. */
router.get('/', function (req, res, next) {
   DB.getAllUsers(function (error,users) {
        if(error) {
            return res.json({error:error});
        } else {
            return res.json(users);
        }
   })
});
module.exports = router;
