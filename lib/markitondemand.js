var http = require('http'),
    util = require('util'),
    async = require('async');

var baseUrl = "http://dev.markitondemand.com/Api/v2";

var _getRequest = function _getRequest(url, next) {
  http.get(url, function(response) {
    response.on('data', function(data) {
      data = JSON.parse(data);

      if (data.Message) {
        return next(data.Message);
      }
      else {
        return next(null, data);
      }
    });
  }).on('error', function(e) {
    return next(e.message);
  });
};


var lookup = function lookup(symbol, next) {
  if (!symbol || typeof symbol !== 'string') return next("Invalid query");

  var url = baseUrl + "/Lookup/json?input=" + symbol;
  _getRequest(url, next);
}


var getQuote = function getQuote(symbol, next) {
  if (!symbol || typeof symbol !== 'string') return next("Invalid symbol");

  var url = baseUrl + "/Quote/json?symbol=" + symbol;
  _getRequest(url, next);
};


var getQuotes = function getQuotes(symbols, next) {
  if (!Array.isArray(symbols)) { 
    return next("Invalid type, must provide an array of symbols"); 
  }

  var result = [];

  async.each(symbols, function(symbol, done) {
    getQuote(symbol, function(err, data) {
      if (err) return done(err); 

      result.push(data);
      return done();
    });
  }, function (err) {
    if (err) return next(err);
    return next(null, result);
  });
};


module.exports.lookup    = lookup;
module.exports.getStock  = lookup;
module.exports.getQuote  = getQuote;
module.exports.getQuotes = getQuotes;
