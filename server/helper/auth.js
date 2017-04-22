module.exports={
  auth:function(req,res,next){
    if (req.headers.token) {
        next()
    } else {
      res.send('please login')
    }
  }
}
