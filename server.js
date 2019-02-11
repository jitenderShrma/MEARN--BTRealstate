const passport = require('passport');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const mongooseURL = require('./config/keys').mongoURI;
const path = require('path');
// passport config
require('./config/passport')(passport);

mongoose.connect(mongooseURL, { useNewUrlParser: true })
  .then(() => console.log('connect with db...'))
  .catch(error => console.log(error));

// Init app
const app = express();
 
//ejs middleware
app.set('view engine', 'ejs');
// body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

// routes files
const users = require('./routes/auth/users');
const adminProps = require('./routes/admin/props');
const props = require('./routes/ui/props');
const realter = require('./routes/admin/realters');
const inquiry = require('./routes/ui/inquiry');
const admin = require('./routes/auth/admin');

// use router files
app.use('/users', users);
app.use('/props', props);
app.use('/props', adminProps);
app.use('/realters', realter);
app.use('/inquiry', inquiry);
app.use('/admin', admin);

// // Server static assets if in production
// if (process.env.NODE_ENV === 'production') {
//   // Set static folder
//   app.use(express.static('client/build'));

//   app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
//   });
// }
//Static file declaration
app.use(express.static(path.join(__dirname, 'client/build')));

//production mode
if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
  //
  app.get('*', (req, res) => {
    res.sendfile(path.join(__dirname = 'client/build/index.html'));
  })
}
//build mode
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/public/index.html'));
})

// listen to server
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`server listen at port ${port}`));