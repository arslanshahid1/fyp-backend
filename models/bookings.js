var mongoose = require('mongoose');

var bookingSchema = mongoose.Schema({
  fname: String,
  lname: String,
  email: String,
  phone: Number,
  eventType: String,
  menuStyle: String,
  guests: Number,
  package: String,
  eventDate: String,
  eventTime: String,
  bookingTime: String,
  userId: String,
  bookingStatus: Boolean,
});

var Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
