const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', () => {
  suite('Number manipulation', () => {
    test('convertHandler should correctly read a whole number input.', () => {
      assert.isOk(convertHandler.getData('2mi').num);
    });
    test('convertHandler shoudl correctly read a decimal number input.', () => {
      assert.isOk(convertHandler.getData('2.3mi').num);
    });
    test('convertHandler should correctly read a fractional input', () => {
      assert.isOk(convertHandler.getData('2/3mi').num);
    });
    test('convertHandler should correctly read a fractional input with a decimal.', () => {
      assert.isOk(convertHandler.getData('2.3/3mi').num);
    });
    test('convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3).', () => {
      assert.isNotOk(convertHandler.getData('3/2/3mi').num);
    });
  });

  suite('Input validation', () => {
    test('convertHandler should correctly default to a numerical input of 1 when no numerical input is provided.', () => {
      assert.deepEqual(convertHandler.getData('mi').num, 1);
    });
    test('convertHandler should correctly read each valid input unit.', () => {
      assert.isOk(convertHandler.getData('gal').unit);
      assert.isOk(convertHandler.getData('l').unit);
      assert.isOk(convertHandler.getData('mi').unit);
      assert.isOk(convertHandler.getData('km').unit);
      assert.isOk(convertHandler.getData('lbs').unit);
      assert.isOk(convertHandler.getData('kg').unit);
    });
    test('convertHandler should correctly return an error for an invalid input unit.', () => {
      assert.isNotOk(convertHandler.getData('g').unit);
    });
    test('convertHandler should return the correct return unit for each valid input unit.', () => {
      assert.deepEqual(convertHandler.convert(1, 'gal').returnUnit, 'L');
      assert.deepEqual(convertHandler.convert(1, 'l').returnUnit, 'gal');
      assert.deepEqual(convertHandler.convert(1, 'kg').returnUnit, 'lbs');
      assert.deepEqual(convertHandler.convert(1, 'lbs').returnUnit, 'kg');
      assert.deepEqual(convertHandler.convert(1, 'km').returnUnit, 'mi');
      assert.deepEqual(convertHandler.convert(1, 'mi').returnUnit, 'km');
    });
    test('convertHandler should correctly return the spelled-out string unit for each valid input unit.', () => {
      assert.deepEqual(convertHandler.getSpelledUnit('L'), 'liters');
      assert.deepEqual(convertHandler.getSpelledUnit('gal'), 'gallons');
      assert.deepEqual(convertHandler.getSpelledUnit('kg'), 'kilograms');
      assert.deepEqual(convertHandler.getSpelledUnit('lbs'), 'pounds');
      assert.deepEqual(convertHandler.getSpelledUnit('km'), 'kilometers');
      assert.deepEqual(convertHandler.getSpelledUnit('mi'), 'miles');
    });
  });

  suite('Conversion', () => {
    test('convertHandler should correctly convert gal to L.', () => {
      assert.deepEqual(convertHandler.convert(1, 'gal').returnNum, '3.78541');
    });
    test('convertHandler should correctly convert L to gal.', () => {
      assert.deepEqual(convertHandler.convert(1, 'l').returnNum, '0.26417');
    });
    test('convertHandler should correctly convert mi to km.', () => {
      assert.deepEqual(convertHandler.convert(1, 'mi').returnNum, '1.60934');
    });
    test('convertHandler should correctly convert km to mi.', () => {
      assert.deepEqual(convertHandler.convert(1, 'km').returnNum, '0.62137');
    });
    test('convertHandler should correctly convert lbs to kg.', () => {
      assert.deepEqual(convertHandler.convert(1, 'lbs').returnNum, '0.45359');
    });
    test('convertHandler should correctly convert kg to lbs.', () => {
      assert.deepEqual(convertHandler.convert(1, 'kg').returnNum, '2.20462');
    });
  });
});
