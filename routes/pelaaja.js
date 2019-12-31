var express = require("express");
var router = express.Router();
var Pelaaja = require("../models/Pelaaja");
var url = require('url');
var {ensureAuthenticated} = require('../config/auth');



//Pelaajan lisäys
router.post("/pelaaja", ensureAuthenticated, (req, res) =>{
    var {nimi, pelinumero, katisyys, pelipaikka, motto} = req.body;

    Pelaaja.findOne({pelinumero: pelinumero}).then(pelaaja => {
        if (pelaaja) {   

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
            newPelaaja.save()
            .then(pelaaja => {
                res.redirect(url.format({
                    pathname:"/jasenet",
                    query: {
                      
                     }
                  }));
            })
            .catch(err => console.log(err));
}
});
});

//Pelaajien haku
router.get("/pelaajaHaku", (req, res) =>{
    var {_id, nimi, pelinumero, katisyys, pelipaikka, motto} = req.body;

    Pelaaja.find({}).then(pelaaja => {
        if (pelaaja) {       
            res.send(pelaaja)
        } else{
            res.send(null);
    }})
            .catch(err => console.log(err));
});
//pelaaja haku numerolla
router.get("/muokkaaPelaaja/:pelinumero", (req, res) =>{
    var pelinumero = req.params.pelinumero;

    Pelaaja.find({pelinumero: pelinumero}).then(pelaaja => {
        if (pelaaja) {       
            res.send(pelaaja)
        } else{
            res.send(null);
    }})
            .catch(err => console.log(err));
});
router.post("/muokkaaPelaajaa", ensureAuthenticated, (req, res) =>{
    var {nimi, pelinumero, katisyys, pelipaikka, motto} = req.body;
    Pelaaja.updateOne(
        {pelinumero: pelinumero},
        {
                nimi: nimi,
                pelinumero: pelinumero,
                katisyys: katisyys,
                pelipaikka: pelipaikka,
                motto: motto
            
        }

    ).then(pelaaja => {
        res.redirect(url.format({
            pathname:"/jasenet",
            query: {
                
             }
          }));
    })
    .catch(err => console.log(err));

        
});

//Pelaajan Poisto

router.post("/poistaPelaaja/:pelinumero", ensureAuthenticated, function(req, res){
    var pelinumero = req.params.pelinumero;
    Pelaaja.findOneAndDelete({pelinumero: pelinumero}).then(poisto =>{
        res.redirect(url.format({
            pathname:"/jasenet",
            query: {
              
             }
          }));
    })
    .catch(err => console.log(err));
})
module.exports = router;