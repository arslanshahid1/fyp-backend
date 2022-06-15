const express = require('express');
let router = express.Router();
var Bookings = require('../../models/bookings');

//get all bookings
router.get('/', async (req, res) => {
  //pagination
  let page = Number(req.query.page ? req.query.page : 1);
  let perPage = Number(req.query.perPage ? req.query.perPage : 10);
  let skipRecords = perPage * (page - 1);

  let bookings = await Bookings.find().skip(skipRecords).limit(perPage);
  return res.send(bookings);
});

//get single booking
router.get('/:id', async (req, res) => {
  try {
    let booking = await Bookings.find({ userId: req.params.id });

    if (!booking)
      return res.status(400).send('Booking with given id does not exist');

    return res.json(booking);
  } catch (error) {
    console.log(error);
    return res.status(400).send('Invalid ID');
  }
});

//update single booking
router.put('/:id', async (req, res) => {
  let booking = await Bookings.findById(req.params.id);
  booking.bookingStatus = true;
  //booking.email = req.body.email;
  await booking.save();
  return res.send(booking);
});

//delete single booking
router.delete('/:id', async (req, res) => {
  let booking = await Bookings.findByIdAndDelete(req.params.id);
  return res.send(booking);
});

//insert a booking
router.post('/', async (req, res) => {
  const {
    fname,
    lname,
    email,
    phone,
    eventType,
    menuStyle,
    guests,
    packageName,
    eventDate,
    eventTime,
    bookingTime,
    userId,
    bookingStatus,
  } = req.body;

  console.log(eventTime);

  let booking = new Bookings();
  booking.fname = fname;
  booking.lname = lname;
  booking.email = email;
  booking.phone = phone;
  booking.eventType = eventType;
  booking.menuStyle = menuStyle;
  booking.guests = guests;
  booking.package = packageName;
  booking.eventDate = eventDate;
  booking.eventTime = eventTime;
  booking.bookingTime = bookingTime;
  booking.userId = userId;
  booking.bookingStatus = bookingStatus;

  console.log(booking);

  await booking.save();
  return res.send(booking);
});

module.exports = router;
