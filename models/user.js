const Mongoose = require('mongoose');

const Schema = Mongoose.Schema;
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.pre('save', (next) => {
    if (!this.isModified('password')) return next();
    try {
        bcrypt.hashSync(this.password, salt);
    } catch (err) {
        return next(err);
    }
    /*
    bcrypt.hash(userSchema.password, saltRounds, function (err, hash) {
        if (err) {
            console.log(err);

            return next(err);
        } else {
            this.password = hash;
            console.log(this.password);
            next();
        }
    });
    */

});


module.exports = Mongoose.model('User', userSchema)