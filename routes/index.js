/**
 * Controllers
 */

var Index = require('../controllers/IndexController');
var User  = require('../controllers/UserController');
var Auth = require('../controllers/AuthController');

/**
 * Routers
 */
module.exports = function(app){
    app.get('/',Index.index);
    app.get('/u',User.index);
    app.get('/x',Auth.index);
    app.get('/x/door',Auth.index);
    app.post('/x/unlock',Auth.unlock);
}
