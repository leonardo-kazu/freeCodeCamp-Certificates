'use strict';

const mongoose = require('mongoose');

// Setting up the DB
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const libraryDB = mongoose.connection.useDb('Personal_Library');

const bookSchema = new mongoose.Schema({
  title: { required: true, type: String },
  commentcount: { required: false, type: Number, default: 0 },
  comments: { required: false, type: [String] },
});

const Book = libraryDB.model('Book', bookSchema);

module.exports = (app) => {
  app.use((req, res, next) => {
    console.log(`${req.method} /${req.path}`);
    next();
  });
  app
    .route('/api/books')
    .get(async (req, res) => {
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
      let docs = await Book.find();
      if (docs.length <= 0) {
        res.send('no book exists');
        return;
      }
      res.json(docs);
    })

    .post(async (req, res) => {
      //response will contain new book object including atleast _id and title
      let title = req.body.title;
      if (!title) {
        res.send('missing required field title');
        return;
      }
      const book = new Book({ title: title });
      book.save((err, doc) => {
        if (err) {
          console.error(err);
          res.json({ error: 'Internal server ERROR' });
          return;
        }
        res.json({ _id: doc._id, title: doc.title });
        return;
      });
    })

    .delete(async (req, res) => {
      //if successful response will be 'complete delete successful'
      await Book.deleteMany();
      res.send('complete delete successful');
    });

  app
    .route('/api/books/:id')
    .get((req, res) => {
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
      let bookid = req.params.id;
      Book.findById(bookid, (err, doc) => {
        if (err || !doc) {
          res.send('no book exists');
          return;
        }
        res.json(doc);
      });
    })

    .post(async (req, res) => {
      //json res format same as .get
      let bookid = req.params.id;
      let comment = req.body.comment;
      if (!comment) {
        res.send('missing required field comment');
        return;
      }
      let doc = await Book.findById(bookid);
      if (!doc) {
        res.send('no book exists');
        return;
      }
      doc.comments.push(comment);
      doc.commentcount++;
      await doc.save();
      res.json(doc);
    })

    .delete((req, res) => {
      //if successful response will be 'delete successful'
      let bookid = req.params.id;
      Book.findByIdAndDelete(bookid, (err, doc) => {
        if (err || !doc) {
          res.send('no book exists');
          return;
        }
        res.send('delete successful');
      });
    });
};
