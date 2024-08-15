const chaiHttp = require("chai-http");
const chai = require("chai");
let assert = chai.assert;
const server = require("../server");

chai.use(chaiHttp);

suite("Functional Tests", function () {

  test("convert a valid input to /api/convert", (done) => {
    chai
      .request(server)
      .keepOpen()
      .get("/api/convert?input=10l")
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.type, "application/json");
        assert.equal(res.body.initNum, 10);
        assert.equal(res.body.initUnit, 'L');
        assert.equal(res.body.returnNum, 2.64172);
        assert.equal(res.body.returnUnit, 'gal');
        done();
      });
  });

  test('convert an invalid input request to /api/convert', (done) => {
    chai
      .request(server)
      .keepOpen()
      .get('/api/convert?input=32g')
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        assert.equal(res.body, 'invalid unit');
        done();
      });
  });

  test('convert an invalid number to /api/convert', (done) => {
    chai
      .request(server)
      .keepOpen()
      .get('/api/convert?input=23/4..6km')
      .end((err, res) => {
        assert.equal(res.body, 'invalid number');
        done();
      });
  });

  test('convert an invalid number and unit', (done) => {
    chai
      .request(server)
      .keepOpen()
      .get('/api/convert?input=23/4..6mm')
      .end((err, res) => {
        assert.equal(res.body, 'invalid number and unit');
        done();
      });
  });

  test('convert with no number', (done) => {
    chai
      .request(server)
      .keepOpen()
      .get('/api/convert?input=gal')
      .end((err, res) => {
        assert.equal(res.body.string, '1 gallons converts to 3.78541 liters');
        done();
      });
  });
});
