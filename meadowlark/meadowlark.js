var express = require('express');
var app = express();
var fortuneModule = require('./lib/fortuneModule.js');
// ./ This signals to Node that it should not look for the module in the node_modules directory;

// set up handlebars view engine
var handlebars = require('express3-handlebars')
                  .create({defaultLayout: 'main'}); // main.handlebars
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// page 22, specifying the port that we want the server to run on
app.set('port', process.env.PORT || 3000);

// page 26, static middleware
app.use(express.static(__dirname + '/public'));

// ============
// ===== Routes =====
// ============

// app.get is a method to ADD Routes
app.get('/', function(req, res) {
  // res.type('text/plain');
  // res.send('Meadowlark Travel');
  res.render('home'); // render home.handlebars
});

app.get('/about', function(req, res) {
  // res.type('text/plain');
  // res.send('About Meadowlark');
  // res.render('about'); // render about.handlebars
  res.render('about', {fortune: fortuneModule.getFortune() }); // about.handlebars, {{fortune}}
});

// in Express, the order of Routes and Middleware are significant

// custom 404 page
// app.use is a method when Expresss adds middleware
app.use( function(req, res) {
  res.status(404);
  res.render('404'); // render 404.handlebars
});;

// custom 500 page
app.use( function(req, res) {
  console.error(err.stack);
  res.status(500);
  res.render('500'); // render 500.handlebars
});

app.listen(app.get('port'), function() {
  console.log('Express started on http://localhost: '
  + app.get('port')
  + ' press Ctrl-C to terminate.');
});
