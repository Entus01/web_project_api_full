const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        const urlRegex = /^(https?:\/\/)(www\.)?[\w\-]+(\.[\w\-]+)+([\/][\w\-._~:/?%#\[\]@!$&'()*+,;=]*)?#?$/;
        return urlRegex.test(v);
      }
    }
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    default: []
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('card', cardSchema);