const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Jacques Cousteau'
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Explorador'
  },
  avatar: {
    type: String,
    default: 'https://practicum-content.s3.us-west-1.amazonaws.com/resources/moved_avatar_1604080799.jpg',
    validate: {
      validator: function(v) {
        return validator.isURL(v);
      }
    }
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function(v) {
        return validator.isEmail(v);
      }
    }
  },
  password: {
    type: String,
    required: true,
    select: false
  }
});

userSchema.statics.findUserByCredentials = function(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Usuario no encontrado'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Usuario no encontrado'));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);