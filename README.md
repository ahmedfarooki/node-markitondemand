node-markitondemand
===================
[![Build Status](https://travis-ci.org/ahmedfarooki/node-markitondemand.svg)](https://travis-ci.org/ahmedfarooki/node-markitondemand)
[![Coverage Status](https://coveralls.io/repos/ahmedfarooki/node-markitondemand/badge.svg)](https://coveralls.io/r/ahmedfarooki/node-markitondemand)

Node.js library for accessing the **[Markit On Demand](http://dev.markitondemand.com)** APIs . Markit On Demand 'offers an opportunity to explore the complexity of financial data in building great tools'. The library gives you the ability to lookup stock symbols and and get stock quotes. 

### Getting Started

To install the npm package:

```bash
    $ npm install node-markitondemand --save
```

### Using the Library

There are three APIs available to use:

* lookup()
* getStock()
* getQuote()
* getQuotes()

#### lookup()

lookup(symbol, callback(stock));

Used to search stocks.

```javascript
   var markit = require('node-markitondemand');

   markit.lookup('AAPL', function(data) {
     // Where data is an array of stock symbols
     console.log(data);
   });
```
#### getStock()

getStock is an alias of lookup()

Used to search stocks.

#### getQuote()

getQuote(symbol, callback(stock));

Used to get latest stock data.

```javascript
   var markit = require('node-markitondemand');

   markit.getQuote('AAPL', function(stock) {
     // Where stock is an object of stock data
     console.log(stock);
   });
```
#### getQuotes()

getQuotes(symbols, callback(stock));

Used to get latest stock data for multiple symbols.

**Warning:** __Using this function is not recommended. You may get throttled on excessive requests to the API.__

```javascript
   var markit = require('node-markitondemand');

   markit.getQuote(['AAPL', 'F'], function(stocks) {
     // Where stocks is an array of objects of stock data
     console.log(stocks);
   });
```

### Running Tests

To run tests (requires mocha):

```bash
    $ npm test
```

To run test coverage (requires jscoverage):

```bash
    $ npm run coverage
```

### Author

Ahmed Farooki <ahmedfarooki@gmail.com>

### License

The MIT License (MIT)

Copyright (c) <year> <copyright holders>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
