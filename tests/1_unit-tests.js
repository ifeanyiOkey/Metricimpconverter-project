const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
    test('correctly read a whole number input', () => {
        assert.equal(convertHandler.getNum('37km'), 37);
    });
    test('correctly read a decimal number input', () => {
        assert.equal(convertHandler.getNum('3.7kg'), 3.7);
    });
    test('correctly read a fractional input', () => {
        assert.equal(convertHandler.getNum('2/5l'), 0.4);
    });
    test('correctly read a fractional input with a decimal', () => {
        assert.equal(convertHandler.getNum('2.5/2lbs'), 1.25);
    });
    test('correctly return an error on a double-fraction', () => {
        assert.equal(convertHandler.getNum('3/2/3gal'), 'invalid number');
    });
    test('correctly default to a numerical input of 1 when no numerical input is provided', () => {
        assert.equal(convertHandler.getNum('l'), 1);
    });
    // test('correctly read each valid input unit', () => {
    //     assert.equal(convertHandler.getUnit('gal'), 'gal') ||
    //     assert.equal(convertHandler.getUnit('mi'), 'mi') ||
    //     assert.equal(convertHandler.getUnit('l'), 'L') ||
    //     assert.equal(convertHandler.getUnit('km'), 'km') ||
    //     assert.equal(convertHandler.getUnit('lbs'), 'lbs') ||
    //     assert.equal(convertHandler.getUnit('kg'), 'kg')
    // })
    test('correctly read each valid input unit', () => {
        let input = ['mi', 'km', 'gal', 'l', 'lbs', 'kg', 'MI', 'KM', 'GAL', 'L', 'LBS', 'KG'];
        let result = ['mi', 'km', 'gal', 'L', 'lbs', 'kg', 'mi', 'km', 'gal', 'L', 'lbs', 'kg'];
        for (let i = 0; i < input.length; i++){
            assert.equal(convertHandler.getUnit(input[i]), result[i]); 
        }
    });
    test('correctly return an error for an invalid input unit', () => {
        assert.equal(convertHandler.getUnit('3lp'), 'invalid unit');
    });
    test('return the correct return unit for each valid input unit', () => {
        let input = ['gal', 'mi', 'L', 'km', 'lbs', 'kg'];
        let result = ['L', 'km', 'gal', 'mi', 'kg', 'lbs'];
        for (let i = 0; i < input.length; i++) {
            assert.equal(convertHandler.getReturnUnit(input[i]), result[i]);
        }
    });
    test('correctly return the spelled-out string unit for each valid input unit', () => {
        let input = ['gal', 'mi', 'L', 'km', 'lbs', 'kg'];
        let result = ['gallons', 'miles', 'liters', 'kilometers', 'pounds', 'kilograms'];
        for (let i = 0; i < input.length; i++) {
            assert.equal(convertHandler.spellOutUnit(input[i]), result[i]);
        }
    });
    test('correctly convert gal to L', () => {
        assert.equal(convertHandler.convert(3.9, 'gal'), 14.7631);
    });
    test('correctly convert L to gal', () => {
        assert.equal(convertHandler.convert(9, 'L'), 2.37755);
    });
    test('correctly convert mi to km', ()=> {
        assert.equal(convertHandler.convert(60/2, 'mi'), 48.2802);
    });
    test('correctly convert km to mi', () => {
        assert.equal(convertHandler.convert(13.5/1.8, 'km'), 4.6603);
    });
    test('correctly convert lbs to kg', () => {
        assert.equal(convertHandler.convert(120, 'lbs'), 54.43104);
    });
    test('correctly convert kg to lbs', () => {
        assert.equal(convertHandler.convert(79.2, 'kg'), 174.60625);
    });
});