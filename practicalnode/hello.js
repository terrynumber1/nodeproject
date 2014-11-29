var http = require('http');
http.createServer( function(reqIn, resOut) { // req, res have all the information about a given HTTP request
  resOut.writeHead(200, {'Content-Type': 'text/plain'}); // setting the righ header and status code
  resOut.end('Hleooosdfjkdkf'); // output the text
}).listen(3000); // make server accept requests

console.log('server is running at opsvm3:3000');
