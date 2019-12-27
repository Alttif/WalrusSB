var express = require("express");
var router = express.Router();
var bcrypt = require('bcryptjs');
var User = require('../models/User');

router.get("/login", (req, res) => res.render("index"));

router.get("/register", (req, res) => res.render("register"))

router.post("/register", (req, res) => {
    var { name, email, password, password2 } = req.body;
    let errors = [];

    if (!name || !email || !password || !password2){
        errors.push({ msg: "Täytä kaikki kentät!"});
    }
    if (password !== password2){
        errors.push({ msg: "Salasanat eivät täsmää!"});
    }
    if (password.length < 6){
        errors.push({ msg: "Salasanan oltava vähintään 6 merkkiä!"});
    }
    if (errors.length > 0) {
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        });
    } else {
        User.findOne({ email: email }, function(err, user) { console.log(user)}).then(user => {
            if (user) {               
                errors.push({msg: "Sähköposti on jo kannassa!"});
                res.render('register', {
                    errors,
                    name,
                    email,
                    password,
                    password2
                });
            } else{
                var newUser = new User({
                    name,
                    email,
                    password
                });
                console.log(newUser);
                res.send("hello");
            }
        });
        
       
    }
});

 module.exports = router;