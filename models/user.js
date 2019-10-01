const Mongoose = require('mongoose');

const Schema = Mongoose.Schema;
const bcrypt = require('bcryptjs');
/******************EMAIL***************/

let emailLengthChecker = (email) => {
    if (!email) {
        return false;
    } else {
        if (email.length < 8 || email.length > 40) {
            return false;
        } else {
            return true;
        }
    }
};

// Validate Function to check if valid e-mail format
let validEmailChecker = (email) => {
    if (!email) {
        return false;
    } else {
        const regExp = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
        return regExp.test(email);
    }
};


const emailValidators = [{
    validator: emailLengthChecker,
    message: 'E-mail must at least 5 characters'
},
{
    validator: validEmailChecker,
    message: 'Must be a valid e-mail'
}];

/******************Username***************/

let usernameLengthChecker = (username) => {
    if (!username) {
        return false;
    } else {
        if (username.length < 3 || username.length > 25) {
            return false;
        } else {
            return true;
        }
    }
};

let validUsernameChecker = (username) => {
    if (!username) {
        return false;
    } else {
        const regExp = new RegExp(/^[a-zA-Z0-9]+$/);
        return regExp.test(username);
    }
};

const usernameValidators = [{
    validator: usernameLengthChecker,
    message: 'Username must at least 4 characters'
},
{
    validator: validUsernameChecker,
    message: 'Must be a valid username'
}];


/******************PASSWORD *****************/

let passwordLengthChecker = (password) => {
    if (!password) {
      return false;
    } else {
      if (password.length < 8 || password.length > 35) {
        return false;
      } else {
        return true;
      }
    }
  };

let validPassword = (password) => {
    if (!password) {
      return false;
    } else {
      const regExp = new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/);
      return regExp.test(password);
    }
  };

const passwordValidators = [
    {
      validator: passwordLengthChecker,
      message: 'Password must be at least 8 characters but no more than 35'
    },
    {
      validator: validPassword,
      message: 'Must have at least one uppercase, lowercase, special character, and number'
    }
  ];

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: emailValidators
    },
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: usernameValidators
    },
    password: {
        type: String,
        required: true,
        validate: passwordValidators
    }
});

/**
 * Password hash middleware.
 */
userSchema.pre('save', function save(next) {
    const user = this;
    if (!user.isModified('password')) {
        return next();
    }
    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            return next(err);
        }
        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) {
                return next(err);
            }
            user.password = hash;
            next();
        });
    });
});
/**
 * Helper method for validating user's password.
 */
/*
userSchema.methods.comparePassword = function comparePassword(password, cb) {
    bcrypt.compare(password, this.password, (err, isMatch) => {
        cb(err, isMatch);
    });
};
*/ 
// Methods to compare password to encrypted password upon login
userSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.password); // Return comparison of login password to password in database (true or false)
  };

module.exports = Mongoose.model('User', userSchema)