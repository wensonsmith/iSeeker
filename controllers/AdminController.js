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

exports._login = function(req,res){
    if(req.body.password == 'wensonsmith'){
        return res.send({"status":1});
    }else{
        return res.send({"status":-1});
    }
}

exports.add = function(req,res){
    
} 

exports.what = function(req,res){

}
