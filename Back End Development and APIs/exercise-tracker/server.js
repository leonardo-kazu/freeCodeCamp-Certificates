require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

// Setting up ODM
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

// Setting up static assets
app.use(express.static('public'));

// Middleware for debugging
app.use((req, res, next) => {
  console.log(`${req.method} /${req.path} - ${req.ip}`);
  next();
});

// Setting up schemas
// User schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
});

// Exercise Schema
const exerciseSchema = new mongoose.Schema({
  description: { type: String, required: true },
  duration: { type: Number, required: true },
  date: { type: String },
  id: { type: String, unique: false },
});

// Setting up models
// User model
const User = mongoose.model('User', userSchema);
// Exercise model
const Exercise = mongoose.model('Exercise', exerciseSchema);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// Post to create user
app.post('/api/users', async (req, res) => {
  //Checking if right data was sent
  if (!req.body.username) {
    res.status(400).json({ error: 'Invalid Username' });
    return;
  }

  // Checking if the user exists, if so return error
  const user = await User.findOne({ username: req.body.username }).exec();
  if (user) {
    console.log(user);
    res.status(400).json({ error: 'User alredy in database' });
    return;
  }

  let newUser = new User({ username: req.body.username });
  newUser.save((err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Error Saving user' });
      return;
    }
    res.json({ username: req.body.username, _id: data._id });
  });
});

// Get to get all users
app.get('/api/users', async (req, res) => {
  User.find()
    .select({ _id: 1, username: 1 })
    .exec((err, data) => {
      if (err) {
        res.status(500).json({ error: 'Internal server error fetching users' });
        console.error(err);
        return;
      }
      res.json(data);
    });
});

// Route to send exercises and to get logs
app.post('/api/users/:_id/exercises', (req, res) => {
  // Checking for valid post request
  if (!req.params._id || !req.body.description || !req.body.duration) {
    console.log(req.body);
    res.status(400).json({ error: 'Invalid data sent' });
    return;
  }
  // Setting up date
  let date = new Date().toDateString();
  if (req.body.date) {
    date = new Date(req.body.date).toDateString();
  }
  let newExercise = new Exercise({
    description: req.body.description,
    duration: req.body.duration,
    date: date,
    id: req.params._id,
  });
  // Saving and searching for the user so we can display the info
  newExercise.save((err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    User.findById(data.id, (err, user) => {
      res.status(200).json({
        username: user.username,
        description: data.description,
        duration: data.duration,
        date: data.date,
        _id: user._id,
      });
      return;
    });
  });
});
app.get('/api/users/:_id/logs', async (req, res) => {
  // Finding data
  const id = req.params._id;
  let log = await Exercise.find({ id: id }).exec();
  let user = await User.findOne({ _id: id }).exec();
  log = log.map((element) => {
    return {
      description: element.description,
      duration: element.duration,
      date: element.date,
    };
  });

  // checking for time delimeters
  console.log(req.query);
  let start = new Date(0);
  let finish = Date.now();
  if (req.query.from) {
    start = new Date(req.query.from);
  }
  if (req.query.to) {
    finish = new Date(req.query.to);
  }
  let count = Number(req.query.limit) || log.length;
  // Sorting Dates
  log.sort((a, b) => {
    if (new Date(a.date) > new Date(b.date)) {
      return 1;
    } else if (new Date(a.date) < new Date(b.date)) {
      return -1;
    } else {
      return 0;
    }
  });
  // Filtering valid dates and count amount
  let total = 0;
  log = log.filter((element, index) => {
    if (new Date(element.date) >= start && new Date(element.date) <= finish && total != count) {
      total++;
      return element;
    }
  });
  count = log.length;

  res.json({
    username: user.username,
    count: count,
    _id: user._id,
    log: log,
  });
  return;
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log(`App listening at port ${listener.address().port}`);
});
