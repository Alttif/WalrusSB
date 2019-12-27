const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');

router.get("/login", (req, res) => res.render("index"));

router.get("/register", (req, res) => res.render("register"))

router.post("/register", (req, res) => {
    const { name, email, password, password2 } = req.body;
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
            //Salasanan salaus

            bcrypt.genSalt(10, (err, salt) => 
            bcrypt.hash(newUser.password, salt, (err, hash) =>{
                if(err) throw err;

                newUser.password = hash;
            newUser.save()
            .then(user => {
                res.redirect('index');
            })
            .catch(err => console.log(err));
        }));
            }
        });


        
       
    }
});

 module.exports = router;