var express = require("express");
var router = express.Router();
var {ensureAuthenticated} = require('../config/auth');



router.get("/", (req, res) => res.render('index'));
router.get("/jasenet", ensureAuthenticated, (req, res) =>  res.render('jasenet'));
    
 module.exports = router;