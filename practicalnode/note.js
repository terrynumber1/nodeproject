f = function(x) {
  return x*2;
}

console.log(f(3));
console.log(new Date());

var ff = function() {
  console.log('Boo');
}

ff.boo = 1; // function with a property

ff(); // outputs Boo
console.log(ff.boo); // outputs 1

// Pass functions as parameters, page 11
var convertNum = function(num) {
  return num + 10;
}

var processNum = function(num, func) {
  return func(num);
}

console.log( processNum(10, convertNum) ); // output 20

// Function Invocation vs. Expression, page 11

function f() {}; // function definition
f(); // function invocation

function f() { return false; }
f(); // Expression, because it resolves to some value

// Arrays
var arr = [];

// Prototypal Nature
var user = function(ops) {
  return {
    firstName: ops.name || 'John',
    lastName: ops.name || 'Doe',
    email: ops.email || 'test@test.com',
    name: function() { return this.firstName + this.lastName }
  }
}

// Exporting and Importing Modules, page 15
var messasge = {
  find: function(req, res,next) {}
  , add: function(req, res, next) {}
}
 exports.message = message;

 var message = require('./routes/message.js');

// Reading to and Writing from the File System in Node.js
// use asyncronus methods

var fs = require('fs');
var path = require('path');

fs.readFile(path.join(__dirname, '/data/customers.csv'), {encoding: 'utf-8'},
function(err, data) {
  if (err) throw err;
  console.log(data);
});
