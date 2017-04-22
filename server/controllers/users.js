var model = require('../models');
let shortid = require('short-id');
let crypto = require('crypto');
let jwt = require('jsonwebtoken');

module.exports = {
    register: function(req, res) {
        let salt = shortid.generate();
        console.log(req.body);
        model.User.create({
            name: req.body.name,
            email: req.body.email,
            salt: salt,
            facebook_id: req.body.facebook_id,
            password: crypto.createHmac('sha256', salt)
                .update(req.body.password).digest('hex')
        }).then(function() {
            res.send('register succes');
        }).catch(function(err){
          res.send(err)
        })
    },
    views: function(req, res) {
        model.User.findAll().then(function(data) {
            res.send(data)
        })
    },
    delete:function(req, res){
       model.User.destroy({where:{
         id:req.params.id
       }}).then(function(){
         res.send('data deleted')
       })
    },
    update:function(req,res){
      //console.log(req.headers.token);
      let token = req.headers.token;
      //console.log(token);
      jwt.verify(token, 'rahasia', function(err, decoded) {
        if (err) {
          res.send(err);
        } else {
          model.User.update({
            name:req.body.name||decoded.name,
            email:req.body.name||decoded.email
          },{
           where:{
             id:decoded.userid
           }
         }).then(function(data){
           res.send('data updated')
         })
        }

    });
    }

}
