// Write to file, page 20
var fs = require('fs');
fs.writeFile('message.txt', 'Hello Me', function(err) {
  if(err) throw err;
  console.log('Writing is done');
});
