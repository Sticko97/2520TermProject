const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

passport.use(new LocalStrategy({
        usernameField: 'email'
    },
    function(email, password, done) {
        User.findOne({ email: email }, function(err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: 'Incorrect email.' });
            }
            if (!user.validatePassword(password)) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        });
    }
));

exports.login = function(req, res) {
    res.render('auth/login', { title: 'Login' });
};

exports.register = function(req, res) {
    res.render('auth/register', { title: 'Register' });
};

exports.loginSubmit = passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash: true
});

exports.registerSubmit = function(req, res, next) {
    const { email } = req.body;
    const user = new User({ email });

    user.hashPassword();

    user.save(function(err) {
        if (err) { return next(err); }
        res.redirect('/dashboard');
    });
};
