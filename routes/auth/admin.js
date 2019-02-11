const passport = require('passport');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../modals/User');
const validateLoginInput = require('../../validator/login');

// @route GET '/admin/login'
// @route desc for login admin
// @route status private
router.post('/login', (req, res) => {

  const { isValid, errors } = validateLoginInput(req.body);
  // if errors
  if (!isValid) {
    res.status(404).json(errors);
  } else {
    const errors = {};
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({ email: email })
      .then(user => {
        if (user === null || user.isAdmin === false) {
          errors.email = 'Email not found';
          res.status(404).json(errors);
        } else {
          // checking for password
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
              // sign token
              const payload = {
                id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin
              }
              jwt.sign(
                payload,
                'secret',
                { expiresIn: 3600 },
                (err, token) => {
                  if (err) throw err;
                  res.status(200).json({ token: 'Bearer ' + token });
                }
              );
            } else {
              errors.password = 'Incurrect password';
              res.status(404).json(errors);
            }
          })
        }
      })
      .catch(error => console.log(error));
  }
});

// @route GET '/admin/register'
// @route desc for register admin
// @route status public
router.post('/register', (req, res) => {
  // const { isValid, errors } = validateRegisterInput(req.body);

  // // if errors
  // if (!isValid) {
  //   res.status(404).json(errors);
  // } else {
    // taken user field
    const newUser = {
      name: req.body.name,
      email: req.body.email,
      isAdmin: true,
      password: req.body.password
    }
    // check if user exist
    User.findOne({ email: newUser.email })
      .then(user => {
        const errors = {};
        if (user != null) {
          errors.email = 'Email already exist';
          res.status(400).json(errors);
        } else {
          // gen salt
          bcrypt.genSalt(10, (err, salt) => {
            if (err) throw err;
            // hash password
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              // save to db..
              User(newUser).save()
                .then(() => {
                  res.status(200).json({ success: true })
                })
                .catch(error => console.log(error));
            })
          });
        }
      });
  // }
});

module.exports = router;