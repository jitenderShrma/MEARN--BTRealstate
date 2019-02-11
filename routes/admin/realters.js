const express = require('express');
const router = express.Router();
const passport = require('passport');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
//const gravatar = require('gravatar');
const Realter = require('../../modals/Realter');

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });
// @route POST '/realters'
// @route desc to add realter
// @route status private
router.post('/', upload.single('image'), (req, res) => {
  //  input field
  const newRealter = {
    name: req.body.name,
    email: req.body.email,
    image: {
      data: fs.readFileSync(req.file.path),
      contentType: req.file.mimetype
    },
    phone: req.body.phone,
    isMVP: req.body.isMVP,
    description: req.body.description
  }
  if (newRealter.isMVP == 'true') {
    Realter.findOne({ isMVP: newRealter.isMVP })
      .then(realter => {
        if (realter === null) {
          new Realter(newRealter).save()
            .then(() => res.status(200).json({ success: true }));
        } else {
          realter.isMVP = 'false';
          new Realter(realter).save()
            .then(() => {
              new Realter(newRealter).save()
                .then(() => res.status(200).json({ success: true }));
            });
        }
      })
  } else {
    new Realter(newRealter).save()
      .then(() => res.status(200).json({ success: true }));
  }
});



//  // checking for unique realter name
//  Realter.findOne({ name: newRealter.name })
//  .then(result => {
//    if (result === null) {
// } else {
//   const errors = {
//     name: 'this name already exist'
//   }
//   res.status(404).json(errors);
// }
// })

router.get('/', (req, res) => {
  const errors = {};
  Realter.find()
    .then(realters => {
      if (realters.length > 0) {
        res.status(200).json(realters)
      } else {
        errors.realters = 'No realter found';
        res.status(200).json(errors);
      }
    })
    .catch(error => console.log(error));
});

// @route GET '/realters/:name'
// @route desc to display single realter
// @route status private
router.get('/name/validate/:name', (req, res) => {
  // checking for unique realter name
  Realter.findOne({ name: req.params.name })
    .then(result => {
      if (result === null) {
        res.status(200).json({ name: true });
      } else {
        res.status(200).json({ name: 'This name already exist' });
      }
    })
});


// @route GET '/realters/:name'
// @route desc to display single realter
// @route status private
router.get('/:name', (req, res) => {
  Realter.findOne({ name: req.params.name })
    .then(realter => {
      if (realter === null) {
        const errors = {};
        errors.realter = 'No Realter found with this name';
        res.status(404).json(errors)
      } else {
        res.status(200).json(realter)
      }
    })
    .catch(error => console.log(error));
});

// @route GET '/realters/:id'
// @route desc to delete realter
// @route status private
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  const errors = {};
  Realter.findOneAndDelete({ _id: req.params.id })
    .then(() => res.status(200).json({ success: true }))
    .catch(error => res.status(404).json(error));
});
module.exports = router;