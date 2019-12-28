var express = require('express');
var mongoose = require('mongoose');
var cons = require('consolidate');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');

var app = express();
app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/node_modules'));

//Passport config
require('./config/passport')(passport);

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


//Session
app.use(session({
    secret: 'salainen',
    resave: true,
    saveUninitialized: true,

}));

//Passport
app.use(passport.initialize());
app.use(passport.session());

//Flash
app.use(flash());

//Messages
app.use((req, res, next) =>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

//Routes
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));
app.use("/ottelut", require("./routes/ottelut"));



var PORT = process.env.PORT || 3002;

app.listen(PORT, console.log("Serveri pyörii portissa " + PORT));