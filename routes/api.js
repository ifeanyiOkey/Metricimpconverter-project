'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();
  app.route('/api/convert').get((req, res) => {
    let input = req.query.input;
    let initNum;
    // catch errors (e.g. double decimal) on number input
    try {
      initNum = convertHandler.getNum(input);
    } catch (err) {
      console.log(err);
      res.json('invalid number');
    }
    let initUnit = convertHandler.getUnit(input);
    let returnUnit = convertHandler.getReturnUnit(initUnit);
    let spellOutUnit = convertHandler.spellOutUnit(returnUnit);
    let returnNum = convertHandler.convert(initNum, initUnit);
    let string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

    

    if (initNum == 'invalid number' && initUnit == 'invalid unit') 
      return res.json('invalid number and unit');
    
    if (initNum == 'invalid number') return res.json('invalid number');
    if (initUnit == 'invalid unit') return res.json('invalid unit');
    
    let result = { initNum, initUnit, returnNum, returnUnit, string }
    return res.json(result);
    
  })

};
