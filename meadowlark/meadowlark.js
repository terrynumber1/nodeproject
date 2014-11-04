var express = require('express');
var app = express();

// we prefix our module name with ./. This signals to Node that it should not
// look for the module in the node_modules directory
var fortuneModule = require('./library/fortune.js');

// set up handlebars view engine
var handlebars = require('express3-handlebars').create({
	defaultLayout:'main',
	helpers: {
		section: function(name, options){
			if(!this._sections) this._sections = {};
			this._sections[name] = options.fn(this);
			return null;
		}
	}
});


app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');


app.set('port', process.env.PORT || 3000);

// === Static Middleware===
// === static middleware has the same effect as creating a route for each static file
app.use(express.static(__dirname + '/public'));

// Dummy weather data
function getWeatherData(){
	return {
		locations: [
		{
			name: 'Portland',
			forecastUrl: 'http://www.wunderground.com/US/OR/Portland.html',
			iconUrl: 'http://icons-ak.wxug.com/i/c/k/cloudy.gif',
			weather: 'Overcast',
			temp: '54.1 F (12.3 C)',
		},
		{
			name: 'Bend',
			forecastUrl: 'http://www.wunderground.com/US/OR/Bend.html',
			iconUrl: 'http://icons-ak.wxug.com/i/c/k/partlycloudy.gif',
			weather: 'Partly Cloudy',
			temp: '55.0 F (12.8 C)',
		},
		{
			name: 'Manzanita',
			forecastUrl: 'http://www.wunderground.com/US/OR/Manzanita.html',
			iconUrl: 'http://icons-ak.wxug.com/i/c/k/rain.gif',
			weather: 'Light Rain',
			temp: '55.0 F (12.8 C)',
		},
		],
	};
}

// Running weather widget
app.use(function(req, res, next){
	if(!res.locals.partials) 
		res.locals.partials = {};

	res.locals.partials.weather = getWeatherData();
	next();
});

// ROUTES
app.get('/', function(req, res) {
	res.render('home');
});

app.get('/about', function(req, res) {	
	res.render('about', { fortune1: fortuneModule.getFortune() } );
	// If you don't want to use layout
	// res.render('about', { layout: null } );
});

app.get('/jquery-test', function(req, res) {
	res.render('jquery-test');
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

// Running Node server on port 3000
app.listen(app.get('port'), function(){
	console.log( 'Express started on http://localhost:' +
		app.get('port') + '; press Ctrl-C to terminate.' );
});

