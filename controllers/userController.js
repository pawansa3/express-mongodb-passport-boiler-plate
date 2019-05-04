const mongoose = require('mongoose');
const User = mongoose.model('User');
const { promisify } = require('es6-promisify');

exports.registerForm = (req, res) => {
    res.render('register',{ title:'Register' });
};

exports.loginForm = (req, res) => {
    res.render('login',{ title:'Login' });
};

exports.validateRegister = (req, res, next) => {
    req.sanitizeBody('name');
    req.checkBody('name', 'You must enter a Name!').notEmpty();
    req.checkBody('email', 'Not a valid Email!').isEmail();
    req.sanitizeBody('email').normalizeEmail({
        remove_dots: false,
        remove_extension: false,
        gmail_remove_subaddress: false
    });

    req.checkBody('password', 'You must enter a password!').notEmpty();
    req.checkBody('password-confirm', 'You must confirm a password!').notEmpty();
    req.checkBody('password-confirm', 'Oops! Your passwords did not match!').equals(req.body.password);

    const errors = req.validationErrors();
    if(errors) {
        req.flash('error', errors.map(err => err.msg));
        res.render('register', {title: 'Register', body: req.body, flashes: req.flash() });
        return;
    }

    next();

};

exports.register = async (req, res, next) => {
    const user = new User({
        name: req.body.name, 
        email: req.body.email 
    });
    //turn callback function into promise based function as method to promisify and obj to bind
    //use .bind to bind obj in promisify version-6
    const register = promisify(User.register.bind(User));
    await register(user, req.body.password);
    next();//pass to authcontroller to login
};

exports.getProfile = (req, res) => {
    res.render('profile', { title:'Profile' });
}
