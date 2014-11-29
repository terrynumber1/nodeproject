// Reading to and Writing from the File System in Node.js
// use asyncronus methods

var fs = require('fs');
var path = require('path');

fs.readFile(path.join(__dirname, '/data/customers.csv'), {encoding: 'utf-8'},
function(err, data) {
  if (err) throw err;

  console.log(__dirname); // show current directory's path
  console.log(data);
});
