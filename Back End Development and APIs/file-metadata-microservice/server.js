require('dotenv').config();
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const upload = multer();
// Setting up the app
const app = express();

app.use(cors());

// Middleware for debugging
app.use((req, res, next) => {
  console.log(`${req.method} - /${req.path} ${req.ip}`);
  next();
});

app.use(express.static('public'));

// Main get
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
  return;
});

// File analysis
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size,
  });
  return;
});

// Setting up the listener
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log(`App is listening at port ${listener.address().port}`);
});
