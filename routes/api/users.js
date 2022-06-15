const express = require('express');
const router = express.Router();
let User = require('../../models/user');
var bcrypt = require('bcryptjs');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const config = require('config');

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  let user = await User.findOne({ email: email });
  if (user) {
    res.send({ message: 'User with given email already exists.' }).status(400);
    return;
  }

  user = new User();
  user.name = name;
  user.email = email;
  user.password = password;
  let salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();
  res.send(_.pick(user, ['name', 'email']));
});

router.post('/login', async (req, res) => {
  let user = await User.findOne({ email: req.body.email });

  if (user) {
    let isValid = await bcrypt.compare(req.body.password, user.password);
    if (!isValid) {
      res.send({ message: 'Invalid password.' }).status(400);
      return;
    } else {
      let token = jwt.sign(
        { _id: user._id, name: user.name },
        config.get('jwtPrivateKey')
      );
      let id = user.id;
      res.send({ token, id });
    }
  } else {
    res.send({ message: 'User does not exist.' }).status(400);
    return;
  }
});
module.exports = router;
