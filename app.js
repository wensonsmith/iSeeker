
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

//Enable Gzip compress
app.use(express.compress());

//Template Engine
app.set('view engine', 'html');
app.engine('html', require('hogan-express'));
//app.set('layout', 'layouts/default');
//app.set('partials', {header: "partials/header"});
//app.enable('view cache')

app.use(express.favicon(__dirname + '/public/images/favicon.ico'));
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.cookieParser());

//Enable Session
app.use(express.session({
    secret:Settings.cookieSecret,
    store:new MongoStore({
        db:Settings.dbName
    })
}));


app.use(app.router);
//app.get(app.user);
routes(app);

app.use(express.static(path.join(__dirname, 'public')));
app.use('/public',express.static(path.join(__dirname, 'public')));



// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
