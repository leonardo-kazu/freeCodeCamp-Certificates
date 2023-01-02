const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);
let id;
suite('Functional Tests', () => {
  suite('POST Requests', () => {
    test('Create an issue with every field: POST request to /api/issues/{project}', (done) => {
      chai
        .request(server)
        .post('/api/issues/apitest')
        .send({
          issue_title: 'Testing 123',
          issue_text: 'This is a test issue',
          created_by: 'Jonh Doe',
          assigned_to: 'Jonathan Donaven',
          status_text: "We don't know what is happening",
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.issue_title, 'Testing 123');
          assert.equal(res.body.issue_text, 'This is a test issue');
          assert.equal(res.body.created_by, 'Jonh Doe');
          assert.equal(res.body.assigned_to, 'Jonathan Donaven');
          assert.equal(res.body.status_text, "We don't know what is happening");
          assert.equal(res.body.open, true);
          id = res.body._id;
          done();
        });
    });
    test('Create an issue with only required fields: POST request to /api/issues/{project}', (done) => {
      chai
        .request(server)
        .post('/api/issues/apitest')
        .send({
          issue_title: 'Testing required',
          issue_text: 'Only what is needed',
          created_by: 'Jona Doe',
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.issue_title, 'Testing required');
          assert.equal(res.body.issue_text, 'Only what is needed');
          assert.equal(res.body.created_by, 'Jona Doe');
          assert.equal(res.body.assigned_to, '');
          assert.equal(res.body.status_text, '');
          assert.equal(res.body.open, true);
          done();
        });
    });
    test('Create an issue with missing required fields: POST request to /api/issues/{project}', (done) => {
      chai
        .request(server)
        .post('/api/issues/apitest')
        .send({ issue_title: 'Failed POST' })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.error, 'required field(s) missing');
          done();
        });
    });
  });
  suite('GET requests', () => {
    test('View issues on a project: GET request to /api/issues/{project}', (done) => {
      chai
        .request(server)
        .get('/api/issues/apitest')
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.isArray(res.body);
          done();
        });
    });
    test('View issues on a project with one filter: GET request to /api/issues/{project}', (done) => {
      chai
        .request(server)
        .get('/api/issues/apitest?open=true')
        .end((err, res) => {
          // Here is the thing, we could do more testing, but the probleam is that since we'll do then again for freecodecamp, there are chanced the
          // searches will be differente, the results etc, testing the get requests are more of, do the res back arrays
          assert.equal(res.status, 200);
          assert.isArray(res.body);
          done();
        });
    });
    test('View issues on a project with multiple filters: GET request to /api/issues/{project}', (done) => {
      chai
        .request(server)
        .get('/api/issues/apitest?open=true&created_by=Jonh%20Doe')
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.isArray(res.body);
          done();
        });
    });
  });
  suite('PUT requests', () => {
    test('Update one field on an issue: PUT request to /api/issues/{project}', (done) => {
      chai
        .request(server)
        .put('/api/issues/apitest')
        .send({
          _id: id,
          open: true,
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.result, 'successfully updated');
          assert.equal(res.body._id, id);
          done();
        });
    });
    test('Update multiple fields on an issue: PUT request to /api/issues/{project}', (done) => {
      chai
        .request(server)
        .put('/api/issues/apitest')
        .send({
          _id: id,
          assigned_to: 'Marwa',
          status_text: 'it works',
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.result, 'successfully updated');
          assert.equal(res.body._id, id);
          done();
        });
    });
    test('Update an issue with missing _id: PUT request to /api/issues/{project}', (done) => {
      chai
        .request(server)
        .put('/api/issues/apitest')
        .send({
          open: true,
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.error, 'missing _id');
          done();
        });
    });
    test('Update an issue with no fields to update: PUT request to /api/issues/{project}', (done) => {
      chai
        .request(server)
        .put('/api/issues/apitest')
        .send({
          _id: id,
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.error, 'no update field(s) sent');
          assert.equal(res.body._id, id);
          done();
        });
    });
    test('Update an issue with an invalid _id: PUT request to /api/issues/{project}', (done) => {
      let fakeId = 123123123123;
      chai
        .request(server)
        .put('/api/issues/apitest')
        .send({
          _id: fakeId,
          open: true,
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.error, 'could not update');
          assert.equal(res.body._id, fakeId);
          done();
        });
    });
  });
  suite('DELETE requests', () => {
    test('Delete an issue: DELETE request to /api/issues/{project}', (done) => {
      chai
        .request(server)
        .delete('/api/issues/apitest')
        .send({ _id: id })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.result, 'successfully deleted');
          assert.equal(res.body._id, id);
          done();
        });
    });
    test('Delete an issue with an invalid _id: DELETE request to /api/issues/{project}', (done) => {
      let fakeId = 123123123123123;
      chai
        .request(server)
        .delete('/api/issues/apitest')
        .send({ _id: fakeId })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.error, 'could not delete');
          assert.equal(res.body._id, fakeId);
          done();
        });
    });
    test('Delete an issue with missing _id: DELETE request to /api/issues/{project}', (done) => {
      chai
        .request(server)
        .delete('/api/issues/apitest')
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.error, 'missing _id');
          done();
        });
    });
  });
});
