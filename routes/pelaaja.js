var express = require("express");
var router = express.Router();
var Pelaaja = require("../models/Pelaaja");
var url = require('url');
var {ensureAuthenticated} = require('../config/auth');



//Ottelun lisäys
router.post("/pelaaja", ensureAuthenticated, (req, res) =>{
    var {nimi, pelinumero, katisyys, pelipaikka, motto} = req.body;

    Pelaaja.findOne({pelinumero: pelinumero}).then(pelaaja => {
        if (pelaaja) {   
            console.log(aika);    

            res.redirect(url.format({
                pathname:"/jasenet",
                query: {
                   viesti: "Pelinumerolla löytyi jo pelaaja!"
                 }
              }));
        } else{
            var newPelaaja = new Pelaaja({
                nimi,
                pelinumero,
                katisyys,
                pelipaikka,
                motto
            });
            console.log(newPelaaja);
            newPelaaja.save()
            .then(pelaaja => {
                res.redirect(url.format({
                    pathname:"/jasenet",
                    query: {
                        viesti: "Pelaaja lisättiin onnistuneesti!"
                     }
                  }));
            })
            .catch(err => console.log(err));
}
});
});
module.exports = router;