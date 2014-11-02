var express = require('express');
var app = express();

// we prefix our module name with ./. This signals to Node that it should not
// look for the module in the node_modules directory
var fortuneModule = require('./library/fortune.js');

// set up handlebars view engine
var handlebars = require('express3-handlebars').create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');


app.set('port', process.env.PORT || 3000);

// === Static Middleware===
// === static middleware has the same effect as creating a route for each static file
app.use(express.static(__dirname + '/public'));

// === Routes ===
app.get('/', function(req, res) {
	res.render('home');
});

app.get('/about', function(req, res) {
	
	res.render('about', { fortune1: fortuneModule.getFortune() } );
});

// Route for displaying request header
app.get('/headers', function(req, res) {
	res.set('Content-Type', 'text/plain');
	var s = '';
	for(var name in req.headers)
		s += name + ': ' + req.headers[name] + '\n';
	res.send(s);
});

// 404 catch-all handler (middleware)
app.use(function(req, res, next){
	res.status(404);
	res.render('404');
});

// 500 error handler (middleware)
app.use(function(err, req, res, next){
	console.error(err.stack);
	res.status(500);
	res.render('500');
});

// Disabling Express’s default X-Powered-By header
app.disable('x-powered-by');

app.listen(app.get('port'), function(){
	console.log( 'Express started on http://localhost:' +
		app.get('port') + '; press Ctrl-C to terminate.' );
});