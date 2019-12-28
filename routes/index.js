var express = require("express");
var router = express.Router();
var {ensureAuthenticated} = require('../config/auth');



router.get("/", (req, res) => res.render('index'));
router.get("/jasenet", ensureAuthenticated, (req, res) => {
    var viesti = req.query.viesti;
    if(viesti){
        res.render('jasenet', {viesti: viesti});
    }
    else{
        res.render('jasenet');
    }
});
    


 module.exports = router;