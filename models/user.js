const Mongoose = require('mongoose');

const Schema = Mongoose.Schema;
const bcrypt = require('bcrypt');

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
    if (!this.isModified('password')) {
        return next();
    } else {
        bcrypt.hash(this.password, null, null, (err, hash) => {
            if (err) {
                return next(err);
            } else {
                this.password = hash;
                next();
            }
        })
    }
});

module.exports = Mongoose.model('User', userSchema)