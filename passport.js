var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcryptjs');

var User = require('./models/Users');

module.exports = function(passport){
    passport.use(
        new LocalStrategy({ usernameField: "email" }, (email, password, password2, done) => {

        })
    );
}