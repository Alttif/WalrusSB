var express = require('express');
var mongoose = require('mongoose');
var cons = require('consolidate');
var flash = require('connect-flash');
var session = require('express-session');

var app = express();
app.use(express.static(__dirname + '/views'));



// Mongo config
var db = require('./config/keys').MongoURI;

//Tietokantayhteys
mongoose.connect(db, {useNewUrlParser: true})
    .then(() => console.log("Tietokantayhteys luotu.."))
    .catch(err => console.log(err));

//Handlebars engine
app.engine('html', cons.handlebars);
app.set('view engine', 'html');

//Bodyparser
app.use(express.urlencoded({ extended: false }));

app.use(session({
    secret: 'salainen',
    resave: true,
    saveUninitialized: true,

}));

app.use(flash());

//Routes
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));



var PORT = process.env.PORT || 3002;

app.listen(PORT, console.log("Serveri pyörii portissa " + PORT));