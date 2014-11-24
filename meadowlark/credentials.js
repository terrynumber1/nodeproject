mongo: {
  development: {
    connectioString: 'mongodb://<dbuser>:<dbpassword>@ds053130.mongolab.com:53130/nodedatabase',
  },
  production: {
    connectionString: 'mongodb://<dbuser>:<dbpassword>@ds053130.mongolab.com:53130/nodedatabase',
  },
},

var mongoose = require('mongoose');
var opts = {
  server: {
    socketOptions: { keepAlive: 1 }
  }
};

switch(app.get('env')) {
  case 'development' :
    mongoose.connection(credentials.mongo.development.connectionString, opts);
    break;

  case 'production' :
    mongoose.connection(credentials.mongo.development.connectioString, opts);
    break;

  default:
    throw new Error('Unknown execution environment: ' + app.get('env'));
}
