const passport = require('passport');
const crypto = require('crypto');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const {promisify} = require('es6-promisify');

exports.login = passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: 'Failed Login!',
    successRedirect: '/',
    successFlash: 'You are now logged in!'
});

exports.isLoggedIn = (req, res, next) => {
    // 1st check user is authenticated 
    if(req.isAuthenticated()) {
        return next(); // carry on they are logged in
    }
    req.flash('error', 'You must be logged in first!!!');
    res.redirect('/login');
}

exports.hasLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()) {
        return next(); //if not logged in show login/register form else redirect
    }
    req.flash('error', 'You are already logged in!!!');
    res.redirect('/profile');
};

exports.logout = (req, res) => {
    req.logout();
    req.flash('success', 'You have logged out successfully!!!');
    res.redirect('/');
};