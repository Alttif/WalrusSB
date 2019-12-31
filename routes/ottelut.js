var express = require("express");
var router = express.Router();
var Ottelu = require("../models/Ottelu");
var url = require('url');
var {ensureAuthenticated} = require('../config/auth');



//Ottelun lisäys
router.post("/ottelu", ensureAuthenticated, (req, res) =>{
    var {vastustaja, aika, kotipeli, lopputulos} = req.body;

    Ottelu.findOne({aika: aika}).then(ottelu => {
        if (ottelu) {   
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
router.get("/seuraavaOttelu", (req, res) =>{
    var nyt = Date.now();
    Ottelu.aggregate([
        {
            $project : {
                myDate : 1,
                otherData : 1,
                difference : {
                    $abs : {
                        $subtract : [new Date(), "$aika"]
                    }
                }
            }
        },
        {
            $sort : {difference : 1}
        },
        {
            $limit : 1
        }
        ])
    .then(ottelu =>{
        Ottelu.findOne({_id: ottelu[0]._id}).then(otteluu =>{
            res.send(otteluu);
        })
    })
    .catch(err => console.log(err));
});

//Otteluiden haku
router.get("/OtteluHaku", (req, res) =>{
    var {vastustaja, aika, kotipeli, lopputulos} = req.body;

    Ottelu.find({}).then(ottelu => {
        if (ottelu) {       
            res.send(ottelu)
        } else{
            res.send(null);
    }})
            .catch(err => console.log(err));
});

//Ottelun haku numerolla
router.get("/muokkaaOttelu/:id", (req, res) =>{
    var id = req.params.id;

    Ottelu.findOne({_id: id}).then(ottelu => {
        if (ottelu) {       
            res.send(ottelu)
        } else{
            res.send(null);
    }})
            .catch(err => console.log(err));
});

//Ottelun Muokkaus
router.post("/ottelunMuokkaus", ensureAuthenticated, (req, res) =>{
    var {_id, vastustaja, aika, kotipeli, lopputulos} = req.body;

    Ottelu.updateOne(
        {_id: _id},
        {
            vastustaja: vastustaja,
            aika: aika,
            kotipeli: kotipeli,
            lopputulos: lopputulos
            
        }

    ).then(ottelu => {
        res.redirect(url.format({
            pathname:"/jasenet",
            query: {
                
             }
          }));
    })
    .catch(err => console.log(err));

        
});

//Ottelun Poisto
router.post("/poistaOttelu/:id", ensureAuthenticated, function(req, res){
    var id = req.params.id;
    
    Ottelu.findOneAndDelete({_id: id}).then(poisto =>{
        res.redirect(url.format({
            pathname:"/jasenet",
            query: {
              
             }
          }));
    })
    .catch(err => console.log(err));
})
 module.exports = router;