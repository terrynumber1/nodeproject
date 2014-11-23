var express = require('express'),
	fortune = require('./library/fortune.js'),
	formidable = require('formidable');

var app = express();

// we prefix our module name with ./. This signals to Node that it should not
// look for the module in the node_modules directory


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
app.use(require('body-parser')());

// set 'showTests' context property if the querystring contains test=1
app.use(function(req, res, next) {
	res.locals.showTests = app.get('env') !== 'production' && next();
});

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

app.get('/tours/hood-river', function(req, res) {
	res.render('/tours/hood-river');
});

app.get('/tours/oregon-coast', function(req, res) {
	res.render('tours/oregon-coast');
});

app.get('/tours/request-group-rate', function(req, res) {
	res.render('tours/request-group-rate');
});

app.get('/jquery-test', function(req, res) {
	res.render('jquery-test');
});

app.get('/nursery-rhyme', function(req, res) {
	res.render('nursery-rhyme');
});

app.get('nursery-rhyme', function(req, res) {
	res.json({
		animal: 'squirrel',
		bodyPart: 'tail',
		adjective: 'bushy',
		noun: 'heck',
	});
});

app.get('/thank-you', function(req, res) {
	res.render('thank-you');
});

app.get('/newsletter', function(req, res) {
	// we will learn about CSRF later.. for now, we just
	// provide a dummy value
	res.render('newsletter', { csfr: 'CSRF token goes here'});
});

app.post('/process', function(res, req) {
	if(req.xhr || req.accepts('json, html') === 'json') {
		// if there were an error, we would send {error: 'error description'}
		res.send({sucess: true});
	} else {
		// if there were an error, we would redirect to an error page
		res.redirect(303, '/thank-you');
	}
});

app.get('/contest/vacation-photo', function(req, res) {
	var now = new Date();
	res.render('contest/vacation-photo',
		{ year: now.getFullYear(),
		  month: now.getMonth()
		});
});

app.post('/contest/vacation-photo/:year/:month', function(req, res) {
	var form = new formidable.IncomingForm();
	form.parse(req, function(err, fields, files) {
		if(err) 
			return res.redirect(303, 'error');
		console.log('received fields:');
		console.log(fields);
		console.log('received files:');
		console.log(files);
		res.redirect(303, '/thank-you');
	})
})

// make sure data directory exists
var dataDir = __dirname + '/data';
var vacationPhotoDir = dataDir + '/vacation-photo';

fs.existsSync(dataDir) || fs.mkdirSync(dataDir);
fs.existsSync(vacationPhotoDir) || fs.mkdirSync(vacationPhotoDir);

function saveContestEntry(contestName, email, year, month, photoPath) {
	// TODO.. this will come later
}

app.post('/contest/vacation-photo/:year/:month', function(req, res) {
	var form = new formidable.IncomingForm();
	form.parse(req, function(err, fields, files) {
		if(err)
			return res.redirect(303, '/error');

		if(err) {
			res.session.flash = {
				type: 'danger',
				intro: 'Oops!',
				message: 'There was an error processing your submission. '
					+ 'Please try again',
			}; // res.session.flash
			return res.redirect(303, '/contest/vacation-photo');
		} // if

		var photo = files.photo;
		var dir = vacationPhotoDir + '/' + Date.now();
		var path = dir + '/' + photo.name;

		fs.mkdirSync(dir);
		fs.renameSync(photo.path, dir + '/' + photo.name);

		saveContestEntry('vacation-photo', fields.email, req.params.year, 
			req.params.month, path);

		req.session.flash = {
			type: 'sucess',
			intro: 'Good luck!',
			message: 'You have been entered into the contest.',
		};
		return res.redirect(303, '/contest/vacation-photo/entries');
	});

});

// ====================================
// ====================================

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

// Route for displaying request header
app.get('/headers', function(req, res) {
	res.set('Content-Type', 'text/plain');
	var s = '';
	for(var name in req.headers)
		s += name + ': ' + req.headers[name] + '\n';
	res.send(s);
});

// Disabling Express’s default X-Powered-By header
app.disable('x-powered-by');

// Running Node server on port 3000
app.listen(app.get('port'), function(){
	console.log( 'Express started on http://localhost:' +
		app.get('port') + '; press Ctrl-C to terminate.' );
});

