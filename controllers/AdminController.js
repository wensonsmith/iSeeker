/**
 * Create by Wenson Smith
 * @email wensonsmith@gmail.com
 * @date 2013-12-11 16:20
 */

exports.index = function(req,res){
    return res.json({"status":1});
}

exports.login = function(req,res){
    res.render('admin/login');
}

exports.add = function(req,res){
    
} 

exports.what = function(req,res){

}
