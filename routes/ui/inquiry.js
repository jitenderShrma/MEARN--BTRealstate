const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const router = express.Router();
const Inquiry = require('../../modals/Inquiry');
const validateInquiryInput = require('../../validator/inquiry');


// @route POST '/inquiry/'
// @route desc to add inquiry
// @route status public
router.post('/', (req, res) => {

  // validator
  const { isValid, errors } = validateInquiryInput(req.body);
  if (!isValid) {
    res.status(404).json(errors);
  } else {

    const newQuiry = {
      name: req.body.name,
      email: req.body.email,
      proparty: req.body.proparty,
      realter: req.body.realter,
      phone: req.body.phone,
      message: req.body.message
    }
    const errors = {};
    Inquiry.find()
      .then(inquirys => {
        if (inquirys.filter(inq => (inq.proparty === newQuiry.proparty) && (inq.email === newQuiry.email)).length > 0
        ) {
          errors.inquiry = 'You have already make inquiry for this proparty';
          res.status(404).json(errors);
        } else {
          Inquiry(newQuiry).save()
            .then(() => res.status(200).json({ success: true }))
            .catch(error => console.log(error));
        }
      })
      .catch(error => console.log(error));
  }
});


// @route GET '/inquiry/'
// @route desc to get all inquiry by email
// @route status private
router.get('/:email', passport.authenticate('jwt', { session: false }), (req, res) => {
  const errors = {};
  Inquiry.find({ email: req.params.email })
    .then(inquiry => {
      if (inquiry.length === 0) {
        errors.noinquiry = 'No inquiry found';
        res.status(404).json(errors);
      } else {
        res.status(200).json(inquiry);
      }
    })

});

// @route GET '/inquiry/all'
// @route desc to get all inquiry
// @route status private
router.get('/all/inquirys', passport.authenticate('jwt', { session: false }), (req, res) => {
  const errors = {};
  Inquiry.find()
    .then(inquiry => {
      if (inquiry.length === 0) {
        errors.noinquiry = 'No inquiry found';
        res.status(404).json(errors);
      } else {
        res.status(200).json(inquiry);
      }
    })
});

// @route GET '/inquiry/:id'
// @route desc to delete inquiry
// @route status private
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  const errors = {};
  Inquiry.findOneAndDelete({ _id: req.params.id })
    .then(() => res.status(200).json({ success: true }))
    .catch(error => res.status(404).json(error));
});
module.exports = router;