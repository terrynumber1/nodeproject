var express = require('express'); // ./ This signals to Node that it should not look for the module in the node_modules directory;
var fortuneModule = require('./lib/fortuneModule.js'); // Vacation database schema
var Vacation = require('./models/vacation.js');

var app = express();
var credentials = require('./credentials.js');

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

// database configuration
var mongoose = require('mongoose');
var options = {
  server: {
    socketOptions: { keepAlive: 1 }
  }
};

mongoose.connect('mongodb://nodeuser2:nodepassword@ds053130.mongolab.com:53130/nodedatabase', options);

// initialize vacations
Vacation.find( function(err, vacations) {
  if(vacations.length)
    return;

    new Vacation({
      name: 'Hood River Day Trip',
      slug: 'hood-river-day-trip',
      category: 'Day Trip',
      sku: 'HR199',
      description: 'Spend a day sailing on the Columbia and ' +
      'enjoying craft beers in Hood River!',
      priceInCents: 9995,
      tags: ['day trip', 'hood river', 'sailing', 'windsurfing', 'breweries'],
      inSeason: true,
      maximumGuests: 16,
      available: true,
      packagesSold: 0,
    }).save();

    new Vacation({
      name: 'Oregon Coast Getaway',
      slug: 'oregon-coast-getaway',
      category: 'Weekend Getaway',
      sku: 'OC39',
      description: 'Enjoy the ocean air and quaint coastal towns!',
      priceInCents: 269995,
      tags: ['weekend getaway', 'oregon coast', 'beachcombing'],
      inSeason: false,
      maximumGuests: 8,
      available: true,
      packagesSold: 0,
    }).save();

    new Vacation({
      name: 'Rock Climbing in Bend',
      slug: 'rock-climbing-in-bend',
      category: 'Adventure',
      sku: 'B99',
      description: 'Experience the thrill of rock climbing in the high desert.',
      priceInCents: 289995,
      tags: ['weekend getaway', 'bend', 'high desert', 'rock climbing', 'hiking', 'skiing'],
      inSeason: true,
      requiresWaiver: true,
      maximumGuests: 4,
      available: false,
      packagesSold: 0,
      notes: 'The tour guide is currently recovering from a skiing accident.',
    }).save();
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
