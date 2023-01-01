'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  const convertHandler = new ConvertHandler();

  // Setting up api route for conversions
  app.route('/api/convert').get((req, res) => {
    // Setting up so we can deal with any kind of case
    const data = req.query.input.toLowerCase();

    let { num, unit } = convertHandler.getData(data);
    if (!unit && !num) {
      res.send('invalid number and unit');
      return;
    } else if (!num) {
      res.send('invalid number');
      return;
    } else if (!unit) {
      res.send('invalid unit');
      return;
    }

    const { returnNum, returnUnit } = convertHandler.convert(num, unit);

    const string = convertHandler.getString(
      num,
      convertHandler.getSpelledUnit(unit),
      returnNum,
      convertHandler.getSpelledUnit(returnUnit)
    );

    if (unit == 'l') {
      unit = 'L';
    }

    res.json({
      initNum: num,
      initUnit: unit,
      returnNum: parseFloat(returnNum),
      returnUnit,
      string,
    });
  });
};
