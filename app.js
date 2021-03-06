
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var app = express();

var MongoStore = require('connect-mongo')(express);
var Settings = require('./settings');

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.json());
app.use(express.urlencoded());
app.use(express.cookieParser());
app.use(app.router);
//app.get(app.user);
routes(app);

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.session({
    secret:Settings.cookieSecret,
    store:new MongoStore({
        db:Settings.db
    })
}))


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
