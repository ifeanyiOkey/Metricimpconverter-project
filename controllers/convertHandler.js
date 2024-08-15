function ConvertHandler() {
  
  this.getNum = function(input) {
    let result = 1;
    
    let num = input.match(/^[\d./]+/g);
    // console.log(num.toString().match(/(\.)/));

    if (num != null) {
      // check double fraction
      let chkFrac = num[0].split('/');
      console.log(chkFrac);
      if (chkFrac.length > 2) result = 'invalid number';

      // catch errors (e.g. double decimal) on number input
      try {
        result = eval(num.toString());
      } catch (e) {
        if (e instanceof SyntaxError) {
          result = 'invalid number';
          console.warn('Error: '+e.message);
        }
      } 
    }
    let answer = Math.round((result + Number.EPSILON)*100000)/100000;
    if (answer == NaN) result = 'invalid number';
    console.log(result);
    return result;
    
  };
  
  this.getUnit = function(input) {
    let result;

    let unitIndex = input.search(/[a-zA-z]/);
    result = input.slice(unitIndex).toLowerCase();

    if (result == 'gal' || result == 'l' || result == 'mi'
      || result == 'km' || result == 'lbs' || result == 'kg') {
        result = result;
      } else {
        result = 'invalid unit'
      }
    if (result == 'l') result = 'L';
    
    // console.log(result);
    
    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    let result;

    switch (initUnit) {
      case 'gal':
        result = 'L';
        break;
      case 'L':
        result = 'gal';
        break;
      case 'mi':
        result = 'km';
        break;
      case 'km':
        result = 'mi';
        break;
      case 'lbs':
        result = 'kg';
        break;
      case 'kg':
        result = 'lbs';
        break;
      default:
        result = 'invalid unit'
    }
    // console.log(result);
    return result;
  };

  this.spellOutUnit = function(unit) {
    let result = 'invalid unit';

    switch (unit) {
      case 'gal':
        result = 'gallons';
        break;
      case 'L':
        result = 'liters';
        break;
      case 'mi':
        result = 'miles';
        break;
      case 'km':
        result = 'kilometers';
        break;
      case 'lbs':
        result = 'pounds';
        break;
      case 'kg':
        result = 'kilogram';
        break;
    }
    // console.log(result);
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result ;

    switch (initUnit) {
      case 'gal':
        result = initNum * galToL;
        break;
      case 'L':
        result = initNum / galToL;
        break;
      case 'lbs':
        result = initNum * lbsToKg;
        break;
      case 'kg':
        result = initNum / lbsToKg;
        break;
      case 'mi':
        result = initNum * miToKm;
        break;
      case 'km':
        result = initNum / miToKm;
        break;
    }
    return result = Math.round((result + Number.EPSILON)*100000)/100000;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result;

    result = 
    `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;

    console.log('Getstring: '+result);
    
    return result;
  };
  
}

module.exports = ConvertHandler;
