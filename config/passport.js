var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var User = require('../models/User');

module.exports = function(passport){
    passport.use(
        new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
            
            User.findOne({email: email})
            .then(user =>{
                if(!user){
                    return done(null, false, { message: "Sähköpostiosoitetta ei ole rekiseröity!"});
                }
                
                bcrypt.compare(password, user.password, (err, isMatch)=>{
                    if(err) throw err;

                    if(isMatch){
                        return done(null, user);
                    }else {
                        return done(null, false, {message: "Virheellinen salasana"});
                    }
                });

            })
            .catch(err => console.log(err));
        })
    );
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });

}