var mongoose = require('mongoose');

var ContactUsSchema = mongoose.Schema({
  name: String,
  email: String,
  phone: Number,
  message: String,
  messageTime: String,
});

var ContactSchema = mongoose.model('Contact', ContactUsSchema);

module.exports = ContactSchema;
