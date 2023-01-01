function ConvertHandler() {
  this.getData = (input) => {
    // Searching for the unit and seeing if it is valid trough a regex
    const unitIndex = input.search(/[a-z]/);
    let unit = input.slice(unitIndex);
    if (!unit.match(/^((l)|(gal)|(lbs)|(kg)|(mi)|(km))$/)) {
      unit = null;
    }

    // If we have a valid unit we can get the numeric part
    let num;
    const bar = input.slice(0, unitIndex).match(/\//);
    if (bar) {
      const barIndex = input.slice(0, unitIndex).search(/\//);
      const first = parseFloat(input.slice(0, barIndex));
      const second = parseFloat(input.slice(barIndex + 1));
      num = first / second;
      if (!input.slice(0, unitIndex).match(/^[0-9.]+\/[0-9.]+$/g)) {
        num = null;
      }
    } else {
      num = parseFloat(input.slice(0, unitIndex));
      if (!input.slice(0, unitIndex).match(/^[0-9]+\.[0-9]+$/)) {
        num = null;
      }
    }
    if (isNaN(num)) {
      num = 1;
    }
    return { num: num, unit: unit };
  };

  this.convert = (initNum, initUnit) => {
    // Conversion constants
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    let returnUnit;
    let returnNum;

    // Switch case for every possible unit case
    switch (initUnit) {
      case 'l':
        returnNum = initNum / galToL;
        returnUnit = 'gal';
        break;

      case 'gal':
        returnNum = initNum * galToL;
        returnUnit = 'L';
        break;

      case 'kg':
        returnNum = initNum / lbsToKg;
        returnUnit = 'lbs';
        break;

      case 'lbs':
        returnNum = initNum * lbsToKg;
        returnUnit = 'kg';
        break;

      case 'km':
        returnNum = initNum / miToKm;
        returnUnit = 'mi';
        break;

      case 'mi':
        returnNum = initNum * miToKm;
        returnUnit = 'km';
        break;
    }

    returnNum = returnNum.toFixed(5);
    return { returnNum, returnUnit };
  };

  this.getSpelledUnit = (unit) => {
    let result;
    switch (unit) {
      case 'L':
        result = 'liters';
        break;

      case 'l':
        result = 'liters';
        break;

      case 'gal':
        result = 'gallons';
        break;

      case 'kg':
        result = 'kilograms';
        break;

      case 'lbs':
        result = 'pounds';
        break;

      case 'km':
        result = 'kilometers';
        break;

      case 'mi':
        result = 'miles';
        break;
    }
    return result;
  };

  this.getString = (initNum, initUnit, returnNum, returnUnit) => {
    return `${initNum} ${initUnit} converts to ${returnNum} ${returnUnit}`;
  };
}

module.exports = ConvertHandler;
