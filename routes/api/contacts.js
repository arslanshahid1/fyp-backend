const express = require('express');
let router = express.Router();
var ContactUs = require('../../models/contact');

//get all contact messages
router.get('/', async (req, res) => {
  //pagination
  let page = Number(req.query.page ? req.query.page : 1);
  let perPage = Number(req.query.perPage ? req.query.perPage : 10);
  let skipRecords = perPage * (page - 1);

  let contactMessages = await ContactUs.find();
  return res.send(contactMessages);
});

//get single contact message
router.get('/:email', async (req, res) => {
  try {
    let contactMessage = await ContactUs.find({ email: req.params.email });

    if (!contactMessage)
      return res.status(400).send('Booking with given email does not exist');

    return res.json(contactMessage);
  } catch (error) {
    console.log(error);
    return res.status(400).send('Invalid email');
  }
});

//insert a contact message
router.post('/', async (req, res) => {
  const { name, email, phone, message, messageTime } = req.body;

  let contactMessage = new ContactUs();
  contactMessage.name = name;
  contactMessage.email = email;
  contactMessage.phone = phone;
  contactMessage.message = message;
  contactMessage.messageTime = messageTime;

  console.log(contactMessage);

  await contactMessage.save();
  return res.send(contactMessage);
});

module.exports = router;
