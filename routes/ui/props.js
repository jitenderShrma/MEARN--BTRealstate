const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const router = express.Router();
const Prop = require('../../modals/Prop');
const grid = require('gridfs-stream');
const mongoURL = 'mongodb://jitender:jitender1@ds237858.mlab.com:37858/rest_api';

// @route GET '/props/listing'
// @route desc to get listing
// @route status public
router.get('/listing', (req, res) => {
  const errors = {};
  Prop.find()
    .sort({ '_id': -1 })
    .then(props => {
      if (props.length > 0) {
        const newArr = props.filter(prop => prop.isPublish);
        res.status(200).json(newArr);
      } else {
        errors.listing = 'No list found';
        res.status(200).json(errors);
      }
    })
    .catch(error => res.status(404).json(error));
});
// @route GET '/props/listing/admin'
// @route desc to get listing(publish && unPublish) for admin
// @route status private
router.get('/listing/adminuser', passport.authenticate('jwt', {session: false}), (req, res) => {
  const errors = {};
  Prop.find()
    .sort({ '_id': -1 })
    .then(props => {
      if (props.length > 0) {
        res.status(200).json(props);
      } else {
        errors.listing = 'No list found';
        res.status(200).json(errors);
      }
    })
    .catch(error => res.status(404).json(error));
});

// @route GET '/props/lists'
// @route desc to get lists for home page
// @route status public
router.get('/lists', (req, res) => {
  const errors = {};
  Prop.find()
    .sort({ '_id': -1 }).limit(3)
    .then(props => {
      if (props.length > 0) {
        res.status(200).json(props);
      } else {
        errors.listing = 'No list found';
        res.status(200).json(errors);
      }
    })
    .catch(error => console.log(error));
});

// gridfs using with mongodb
const conn = mongoose.createConnection(mongoURL);
let gfs;
conn.once('open', function () {
  gfs = grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});


// @route GET '/props/listing'
// @route desc to get image
// @route status public
router.get('/listing/:filename', (req, res) => {
  const readStream = gfs.createReadStream({ filename: req.params.filename });
  readStream.pipe(res);
});

// @route POST '/props/listing/filter'
// @route desc to filter listing
// @route status public
router.post('/listing/filter', (req, res) => {

  //check for unique title
  Prop.find()
    .then(props => {
      if (!props) {
        const errors = {};
        errors.listing = 'No listing found';
      } else {

        // filtering
        const newSearch = {
          keyword: req.body.keyword,
          price: req.body.price,
          city: req.body.city,
          states: req.body.states,
          badrooms: req.body.badrooms,
        }
        // filtering
        function isFilter(value) {
          if (value == '' || value == '0' || value == null) {
            return false;
          } else {
            return true;
          }
        }
        // badrooms filter
        const isEqualOrGrater = function (listValueNum, searchValueNum) {
          if (Number.parseInt(listValueNum) >= Number.parseInt(searchValueNum)) {
            return true;
          } else {
            return false;
          }
        }

        // state filter
        const isEqual = (state, i) => {
          if (this.state.listing.lists[i].address.state.toLowerCase() == state.toLowerCase()) {
            return true;
          } else {
            return false;
          }
        }
        let filteredList = props.filter((list, index) =>
          (isFilter(newSearch.badrooms) ? isEqualOrGrater(list.specification.badrooms, newSearch.badrooms) : true) &&
          (isFilter(newSearch.price) ? (isEqualOrGrater(list.price, newSearch.price)) : true) &&
          (isFilter(newSearch.states) ? (list.address.state.toLowerCase() === newSearch.states.toLowerCase()) : true) &&
          (isFilter(newSearch.city) ? (list.address.city.toLowerCase() === newSearch.city.toLowerCase()) : true)
        );

        res.status(200).json(filteredList);
      }
    })
    .catch(error => console.log(error));
});

// @route POST '/props/title/:title_name'
// @route desc to get list by its title
// @route status public
router.get('/title/:title_name', (req, res) => {
  const title = req.params.title_name;
  
  //check for unique title
  Prop.findOne({ title: title })
    .then(list => {
      if (list === null) {
        const errors = {};
        errors.listing = 'No listing found with this title';
        res.status(404).json(errors)
      } else {
        res.status(200).json(list);
      }
    })
    .catch(error => console.log(error));
});


module.exports = router;