const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const Prop = require('../../modals/Prop');
const crypto = require('crypto');
const GridFsStorage = require('multer-gridfs-storage');
const grid = require('gridfs-stream');
const mongoURL = 'mongodb://jitender:jitender1@ds237858.mlab.com:37858/rest_api';

// gridfs using with mongodb
const conn = mongoose.createConnection(mongoURL);
let gfs;
conn.once('open', function () {
  gfs = grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});
// storage engine
const storage = new GridFsStorage({
  url: mongoURL,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads'
        };
        resolve(fileInfo);
      });
    });
  }
});

const upload = multer({ storage });
const image = upload.fields([
  {
    name: 'image0',
    maxCount: 1
  },
  {
    name: 'image1',
    maxCount: 1
  },
  {
    name: 'image2',
    maxCount: 1
  },
  {
    name: 'image3',
    maxCount: 1
  },
  {
    name: 'image4',
    maxCount: 1
  }
]);


// @route POST '/props/listing'
// @route desc to add listing
// @route status private
router.post('/listing', image, (req, res) => {
  const newList = {
    realter: req.body.realter,
    title: req.body.title,
    address: {
      street: req.body.street,
      city: req.body.city,
      zipcode: req.body.zipcode,
      state: req.body.state
    },
    price: req.body.price,
    specification: {
      badrooms: req.body.badrooms,
      garage: req.body.garage,
      sqft: req.body.sqft,
      lot_size: req.body.lot_size,
      bathrooms: req.body.bathrooms
    },
    image0: req.files['image0'][0].filename,
    image1: req.files['image1'][0].filename,
    image2: req.files['image2'][0].filename,
    image3: req.files['image3'][0].filename,
    image4: req.files['image4'][0].filename,
    isPublish: req.body.isPublish
  }
  // save in db...
  new Prop(newList).save()
    .then(() => res.status(200).json({ success: true }))
    .catch(error => console.log(error));
})

// @route GET '/props/title/validate/:title'
// @route desc to validate title
// @route status private
router.get('/title/validate/:title', (req, res) => {
  Prop.findOne({ title: req.params.title })
    .then(result => {
      if (result === null) {
        res.status(200).json({ title: true })
      } else {
        res.status(200).json({ title: 'title already exist' });
      }
    });
})
// @route get '/props/listing'
// @route desc to display view
// @route status public
router.get('/index', (req, res) => {
  res.render('index')
});

// @route get '/props/unpublish/save'
// @route desc to unpublish listing
// @route status private
router.post('/unpublish/save', (req, res) => {
  let isExist = function(item){
    for(let i = 0; i < req.body.length; i++){
      if(req.body[i]._id == item._id){
        return req.body[i].isPublish;
      }
    }
  }
  for(let i = 0; i < req.body.length; i++){
    Prop.findOne({_id: req.body[i]._id})
      .then(result => {
        result.isPublish = req.body[i].isPublish;
        Prop(result).save()
          .then(() => res.status(200).json({success: true}))
      })
  }
  
});

module.exports = router;
