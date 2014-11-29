// https://github.com/maxogden/art-of-node#callbacks

var fs = require('fs'); // require is a speical node function
var myNumber = undefined; // the variable is undefined because it is stored in a file

function addOne(callback) {
  fs.readFile('number.txt', function doneReading(err, fileContents) {
    myNumber = parseInt(fileContents);
    myNumber++;
    callback();
  });
}

function logMyNumber() {
  console.log(myNumber);
}

addOne(logMyNumber);
