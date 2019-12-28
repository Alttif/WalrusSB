module.exports = {
    ensureAuthenticated: function(req, res, next) {
        if(req.isAuthenticated()){
            return next();
        }
        req.flash('error_msg', "Kirjaudu sisään nähdäksesi sisältö");
        res.redirect('/users/login');
    }
}