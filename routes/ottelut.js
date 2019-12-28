var express = require("express");
var router = express.Router();
var Ottelu = require("../models/Ottelu");
var url = require('url');



//Ottelun lisäys
router.post("/ottelu", (req, res) =>{
    var {vastustaja, aika, kotipeli, lopputulos} = req.body;

    Ottelu.findOne({vastustaja: vastustaja}).then(ottelu => {
        if (ottelu) {   
            console.log(aika);    

            res.redirect(url.format({
                pathname:"/jasenet",
                query: {
                   viesti: "Valitulle päivälle löytyy jo ottelu tietokannasta!"
                 }
              }));
        } else{
            var newOttelu = new Ottelu({
                vastustaja,
                aika,
                kotipeli,
                lopputulos
            });
            console.log(newOttelu);
            newOttelu.save()
            .then(user => {
                res.redirect(url.format({
                    pathname:"/jasenet",
                    query: {
                        viesti: "Ottelu lisättiin onnistuneesti!"
                     }
                  }));
            })
            .catch(err => console.log(err));
}
});
});

//Seuraavan ottelun haku
router.get("/suraavaOttelu", (req, res) =>{
    var nyt = new Date.now();

    Ottelut.find({
        aika: {$lt: nyt}
    })
});

 module.exports = router;