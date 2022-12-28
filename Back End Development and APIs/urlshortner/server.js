require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const dns = require('dns');

const app = express();

// Setting up the ODM
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

// Useful for debugging
// app.use((req, res, next) => {
//   console.log(`${req.method} /${req.path} - ${req.ip}`);
//   console.log(req.body);
//   next();
// });

const urlSchema = new mongoose.Schema({
  url: { type: String, unique: true },
  shortUrl: { type: Number, unique: true },
});

const Url = mongoose.model('Url', urlSchema);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
  return;
});

app.post('/api/shorturl', async (req, res) => {
  // Checking if the random value is valid
  // could have counted how many we have in the database and incremented from there
  // would have been better for scalability
  let valid = false;
  let short = 1;
  while (!valid) {
    short = Math.floor(Math.random() * 10000);
    try {
      let data = await Url.findOne({ shortUrl: short }).exec();
      if (!data) {
        valid = true;
      }
    } catch (err) {
      console.log(err);
      valid = false;
    }
  }

  // setting up the url for dns lookup
  let url = req.body.url.replace(/http[s]?\:\/\//, '').replace(/\/(.+)?/, '');

  // looking up if it's a valid website
  dns.lookup(url, (err, address) => {
    if (err) {
      console.error(err);
      res.json({ error: 'invalid url' });
      return;
    }
    if (!address) {
      res.json({ error: 'invalid url' });
      return;
    } else {
      let newUrl = new Url({ url: req.body.url, shortUrl: short });
      newUrl.save((err, data) => {
        if (err) {
          console.error(err);
        }
        console.log(data);
        res.json({ original_url: req.body.url, short_url: short });
      });
      return;
    }
  });
});

app.get('/api/shorturl/:short', async (req, res) => {
  // if no params are send
  if (req.params.short == undefined) {
    res.json({ error: 'No short URL found for the given input' });
    return;
  }

  // finding and redirecting to the valid url
  let data = await Url.findOne({ shortUrl: parseInt(req.params.short) }).exec();
  if (data) {
    res.redirect(data.url);
    return;
  }
  res.json({ error: 'No short URL found for the given input' });
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log(`App is listening at port: ${listener.address().port}`);
});
