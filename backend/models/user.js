const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        const urlRegex = /^(https?:\/\/)(www\.)?[\w\-]+(\.[\w\-]+)+([\/][\w\-._~:/?%#\[\]@!$&'()*+,;=]*)?#?$/;
        return urlRegex.test(v);
      }
    }
  }
})

module.exports = mongoose.model('user', userSchema);