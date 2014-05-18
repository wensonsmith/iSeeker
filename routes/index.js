/**
 * Controllers
 */

var Index = require('../controllers/IndexController');
var User  = require('../controllers/UserController');
var X = require('../controllers/XController');
var Article = require('../controllers/ArticleController');
var WatchDog = require('../Library/Utils/WatchDog');

/**
 * Routers
 */
module.exports = function(app){
    app.get('/',Index.index);
    app.get('/u',User.index);
    app.get('/x',X.index);
    app.get('/x/door',X.index);
    app.post('/x/unlock',X.unlock);
    app.get('/x/dashboard',WatchDog.Bark,X.dashboard);


    //Article
    app.get('/x/article/add',WatchDog.Bark,Article.add);
    app.get('/x/article/edit',WatchDog.Bark,Article.edit);
    app.get('/x/articles/list',WatchDog.Bark,Article.list);

    app.post('/x/article/save',WatchDog.Bark,Article.save);
    app.post('/x/article/update',WatchDog.Bark,Article.update);

    app.get('/articles/page/:page',Index.index);
    app.get('/article/:id',Article.article)
}
