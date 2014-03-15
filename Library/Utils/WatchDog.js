/**
 * Project X
 * @author Wenson Smith
 * @date 14-3-15.
 */


exports.Bark = function(req,res,next){
    if (!req.session.user) {
        res.redirect('/x')
    }
    next();
}