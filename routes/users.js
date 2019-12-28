var express = require("express");
var router = express.Router();
var bcrypt = require('bcryptjs');
var User = require('../models/User');
var passport = require('passport');

router.get("/login", (req, res) => res.render("login"));

router.get("/register", (req, res) => res.render("register"))


//rekisteröinnin käsittely
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
        
        User.findOne({email: email}).then(user => {
            if (user) {               
                errors.push({msq: "Sähköposti on jo kannassa!"});
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
            //Salasanan salaus

            bcrypt.genSalt(10, (err, salt) => 
            bcrypt.hash(newUser.password, salt, (err, hash) =>{
                if(err) throw err;

                newUser.password = hash;

            req.flash('success_msg', "Rekisteröinti onnistui, voit nyt kirjautua sisään");    
            newUser.save()
            .then(user => {
                res.redirect('/users/login');
            })
            .catch(err => console.log(err));
        }));
            }
        });


        
       
    }
});

//Login käsittely
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/jasenet',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
});

//logout käsittely
router.get('/logout', (req, res) =>{
    req.logout();
    req.flash('success_msg', "Kirjauduit ulos");
    res.render('index', {viesti: "Sinut kirjattiin ulos onnistuneesti!"});
});
 module.exports = router;