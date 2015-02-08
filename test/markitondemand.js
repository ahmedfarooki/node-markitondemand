var assert = require("assert"),
    lib    = process.env['NODE_COVERAGE'] ? '../lib-cov' : '../lib',
    mod    = require(lib + "/markitondemand.js"),
    nock   = require("nock"),
    vcr    = process.env['NODE_COVERAGE'] ? global : require("nock-vcr-recorder-mocha");


describe("Tests if the module has loaded correctly", function() {
  it("should have a function getQuote()", function() {
    assert.equal(typeof mod.getQuote, 'function');
  });

  it("should have a function getQuotes()", function() {
    assert.equal(typeof mod.getQuotes, 'function');
  });

  it("should have a function lookup()", function() {
    assert.equal(typeof mod.lookup, 'function');
  });

  it("should have a function getStock()", function() {
    assert.equal(typeof mod.getStock, 'function');
  });
});


describe("Testing _getRequest()", function() {
  it("should trigger an error if there's no connection", function(done) {
    nock.disableNetConnect();

    mod.lookup('S', function(err, data) {
      assert(err);
      nock.enableNetConnect();
      nock.restore();
      done();
    });
  });
});


vcr.describe("Test lookup()", function() {
  vcr.it("should return an array", function(done) {
    mod.lookup('S', function(err, data) {
      if (err && err === "read ECONNRESET") {
         assert.fail('Failed due to connection error');
         return done();
      }

      assert.equal(Array.isArray(data), true);
      done();
    });
  });

  vcr.it("should return an error if nothing specified to lookup", function(done) {
    mod.lookup('', function(err, data) {
      if (err && err === "read ECONNRESET") {
         assert.fail('Failed due to connection error');
         return done();
      }

      assert.notEqual(err, null);
      assert.equal(err, 'Invalid query');
      done();
    });
  });
});


vcr.describe("Test getQuote()", function() {
  vcr.it("should return an object with stock data", function(done) {
    mod.getQuote('AAPL', function(err, data) {
      if (err && err === "read ECONNRESET") {
         assert.fail('Failed due to connection error');
         return done();
      }

      assert.equal(typeof data, 'object');
      done();
    });
  });

  vcr.it("should return object with properties Name, Symbol, LastPrice, etc", function(done) {
    mod.getQuote('F', function(err, data) {
      if (err && err === "read ECONNRESET") {
         assert.fail('Failed due to connection error');
         return done();
      }

      assert.equal(typeof data.Name, 'string');
      assert.equal(typeof data.Symbol, 'string');
      assert.equal(typeof data.LastPrice, 'number');
      assert.equal(typeof data.Change, 'number');
      assert.equal(typeof data.ChangePercent, 'number');
      assert.equal(typeof data.Timestamp, 'string');
      assert.equal(typeof data.MSDate, 'number');
      assert.equal(typeof data.MarketCap, 'number');
      assert.equal(typeof data.Volume, 'number');
      assert.equal(typeof data.ChangeYTD, 'number');
      assert.equal(typeof data.ChangePercentYTD, 'number');
      assert.equal(typeof data.High, 'number');
      assert.equal(typeof data.Low, 'number');
      assert.equal(typeof data.Open, 'number');
      return done();
    });
  });

  vcr.it("should return an error when an invalid symbol provided", function(done) {
    mod.getQuote('ABCDEFG', function(err, data) {
      if (err && err === "read ECONNRESET") {
         assert.fail('Failed due to connection error');
         return done();
      }

      assert.notEqual(err, null);
      assert.equal(err, "No symbol matches found for ABCDEFG. Try another symbol such as MSFT or AAPL, or use the Lookup API.");
      done();
    });
  });

  vcr.it("should return an error when no symbol provided", function(done) {
    mod.getQuote('', function(err, data) {
      if (err && err === "read ECONNRESET") {
         assert.fail('Failed due to connection error');
         return done();
      }

      assert.notEqual(err, null);
      assert.equal(err, 'Invalid symbol');
      done();
    });
  });
});


vcr.describe("Test getQuotes()", function() {
  vcr.it("should return an array of length 2 with stock data", function(done) {
    mod.getQuotes(['AAPL', 'F'], function(err, data) {
      if (err && err === "read ECONNRESET") {
         assert.fail('Failed due to connection error');
         return done();
      }

      assert.equal(Array.isArray(data), true);
      assert.equal(data.length, 2);
      done();
    });
  });

  vcr.it("should return an error when the first parameter is not an array", function(done) {
    mod.getQuotes('', function(err, data) {
      if (err && err === "read ECONNRESET") {
         assert.fail('Failed due to connection error');
         return done();
      }

      assert.notEqual(err, null);
      assert.equal(err, 'Invalid type, must provide an array of symbols');
      done();
    });
  });
});
