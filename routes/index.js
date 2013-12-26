/**
 * Controllers
 */

var Index = require('../controllers/IndexController');
var User  = require('../controllers/UserController');
var Admin = require('../controllers/AdminController');

/**
 * Routers
 */
module.exports = function(app){
    app.get('/',Index.index);
    app.get('/u',User.index);
    app.get('/i',Admin.index);
    app.get('/i/login',Admin.login);
    app.get('/i/add',Admin.add);
    app.post('/i/login',Admin._login);


    //Google 的文件验证
    app.get('/google3f491a7ce2128d22.html',Index.googleVerify);
}
