const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const mongodbErrorHandler = require('mongoose-mongodb-errors');
const passportLocalMongoose = require('passport-local-mongoose');

//for form data validation
const validator = require('validator');
// for profile gravatar generation
const md5 = require('md5');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: "Please enter a name!"
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        validate: [validator.isEmail, 'Invalid Email address'],
        required: "Please enter an email address!"
    }
});

userSchema.virtual('gravatar').get(function() {
   const hash = md5(this.email);
   return `https://gravatar.com/avatar/${hash}?s=200`; 
});

userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });
userSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('User', userSchema);
