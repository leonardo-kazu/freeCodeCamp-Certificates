'use strict';

const mongoose = require('mongoose');

// Setting up the DB
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const issuesDB = mongoose.connection.useDb('issue_tracker');

// Issue Schema
const issueSchema = new mongoose.Schema({
  project: { type: String, required: true },
  issue_title: { type: String, required: true },
  issue_text: { type: String, required: true },
  created_on: { type: Date, default: new Date(Date.now()) },
  updated_on: { type: Date, default: new Date(Date.now()) },
  created_by: { type: String, required: true },
  assigned_to: { type: String, default: '' },
  open: { type: Boolean, default: true },
  status_text: { type: String, default: '' },
});

// Instantiating the model
const Issue = issuesDB.model('Issue', issueSchema);

module.exports = (app) => {
  app
    .route('/api/issues/:project')
    .get(async (req, res) => {
      const project = req.params.project;
      const queries = req.query;
      let filter = { project: project };
      let doc = await Issue.find(filter).where(queries);
      res.json(doc);
    })
    .post((req, res) => {
      // Getting the project in question
      const project = req.params.project;

      // Checking for valid req.body
      if (!req.body.issue_title && !req.body.issue_text && !req.body.created_by) {
        res.json({ error: 'required field(s) missing' });
        return;
      }

      // Creating new issue
      const issue = new Issue({
        project: project,
        issue_title: req.body.issue_title,
        issue_text: req.body.issue_text,
        created_by: req.body.created_by,
        assigned_to: req.body.assigned_to,
        status_text: req.body.status_text,
      });
      console.log('ghre');
      // Saving new issue and responding to the client
      issue.save((err, data) => {
        console.log(data);
        if (err) {
          console.error(err);
          res.json({ error: err });
          return;
        }
        res.json({
          _id: data._id,
          issue_title: data.issue_title,
          issue_text: data.issue_text,
          created_on: data.created_on,
          updated_on: data.updated_on,
          created_by: data.created_by,
          assigned_to: data.assigned_to,
          open: data.open,
          status_text: data.status_text,
        });
      });
    })
    .put(async (req, res) => {
      // Getting the project in question
      const project = req.params.project;

      // Checking for one _id
      if (!req.body._id) {
        res.json({ error: 'missing _id' });
        return;
      }

      // Checking for updatable fields
      if (
        !req.body.issue_title &&
        !req.body.issue_text &&
        !req.body.created_by &&
        !req.body.assigned_to &&
        !req.body.status_text &&
        !req.body.open
      ) {
        res.json({ error: 'no update field(s) sent', _id: req.body._id });
        return;
      }

      // Searching for the issue
      let filter = { project: project, _id: req.body._id };

      // Setting up places to be updated
      let update = {
        issue_title: req.body.issue_title,
        issue_text: req.body.issue_text,
        created_by: req.body.created_by,
        assigned_to: req.body.assigned_to,
        status_text: req.body.status_text,
        open: req.body.open,
      };

      // Deleting places which aren't being updated
      Object.keys(update).forEach((key) => {
        if (update[key] === '' || update[key] === null) {
          delete update[key];
        }
      });

      // Finding and updating
      await Issue.findOneAndUpdate(filter, update, (err, data) => {
        if (err) {
          res.json({ error: 'could not update', _id: req.body._id });
          return;
        }
        res.json({ result: 'successfully updated', _id: req.body._id });
      });
    })

    .delete((req, res) => {
      let project = req.params.project;
      if (!req.body._id) {
        res.json({ error: 'missing _id' });
        return;
      }
      Issue.deleteOne({ project: project, _id: req.body._id }, (err, data) => {
        if (err || data.deletedCount == 0) {
          res.json({ error: 'could not delete', _id: req.body._id });
          return;
        }

        res.json({ result: 'successfully deleted', _id: req.body._id });
      });
    });
};
