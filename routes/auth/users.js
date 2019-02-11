const passport = require('passport');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const gravatar = require('gravatar');
const User = require('../../modals/User');
const validateRegisterInput = require('../../validator/register');
const validateLoginInput = require('../../validator/login');


// @route GET '/users/register'
// @route desc for register user
// @route status public
router.post('/register', (req, res) => {
  const { isValid, errors } = validateRegisterInput(req.body);

  // if errors
  if (!isValid) {
    res.status(404).json(errors);
  } else {
    // take user field
    const avatar = gravatar.url(req.body.email, { s: '200', r: 'pg', d: '404' });
    const newUser = {
      name: req.body.name,
      email: req.body.email,
      avatar: avatar,
      password: req.body.password
    }
    // check if user exist
    User.findOne({ email: newUser.email })
      .then(user => {
        if (user) {
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
  }
});

// @route GET '/users/login'
// @route desc for login user
// @route status public
router.post('/login', (req, res) => {

  const { isValid, errors } = validateLoginInput(req.body);
  // if errors
  if (!isValid) {
    res.status(404).json(errors);
  } else {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({ email: email })
      .then(user => {
        if (!user) {
          errors.email = 'User not found with this email';
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
                avatar: user.avatar
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

// @route GET '/users/all'
// @route desc to verify user
// @route status private
router.get('/all', passport.authenticate('jwt', { session: false }), (req, res) => {
  if(req.user.isAdmin === true){
    User.find().then(users => res.status(200).json(users));
  } else {
    const errors = {
      notAdmin:'you are not admin user'
    }
    res.status(404).json(errors);
  }
});

// @route GET '/auth/verify'
// @route desc to verify user
// @route status private
router.get('/verify', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json('verifyed');
});

module.exports = router;