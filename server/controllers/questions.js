var model = require('../models');
let jwt = require('jsonwebtoken');

module.exports={
  create:function(req,res){
     let token=req.headers.token;
     jwt.verify(token, 'rahasia', function(err, decoded) {
       if (err) {
         res.send(err);
       } else {
         model.Question.create({
           title:req.body.title,
           content:req.body.content,
           user_id:decoded.userid,
         }).then(function(){
           res.send('user Question posted');
         })
       }
   });
  },
  userquestionviews:function(req,res){
    let token=req.headers.token;
    console.log(token);
    jwt.verify(token, 'rahasia', function(err, decoded) {
      if (err) {
        res.send(err);
      } else {
        model.Question.findAll({where:{
          user_id:decoded.userid
        }
      }).then(function(data){
          res.send(data);
        })
      }
  });
  },
  views:function(req,res){
    model.sequelize.query(`select questions.id as queston_id,questions.title as title,questions.content as content, users.id as user_id, users.name as user_name
       from public."Questions" questions left join public."Users" users on(questions.user_id=users.id)`
      ,{
        type: model.sequelize.QueryTypes.SELECT
      }).then(function(questions){
        res.send(questions)
      }).catch(function(err){
        res.send(err)
      })
  },
  view:function(req,res){
    model.Question.findAll({where:{
      id:req.params.id
    }}).then(function(data){
      res.send(data)
    })
  },
 update:function(req,res){
   let token=req.headers.token;
   jwt.verify(token, 'rahasia', function(err, decoded) {
     if (err) {
       res.send(err);
     } else {
       model.Question.findOne({where:{
         id:req.params.id,
         user_id:decoded.userid
       }
     }).then(function(data){
       if (data) {
         model.Question.update({
           title:req.body.title||data.title,
           content:req.body.content||data.content
         },{
          where:{
            id:data.id,
            //user_id:data.user_id
          }
        }).then(function(){
          res.send('data updated')
        })
       } else {
         res.send('user unautorized')
       }

     })
     }
 });
 },
 delete:function(req,res){
   let token=req.headers.token;
   jwt.verify(token, 'rahasia', function(err, decoded) {
     if (err) {
       res.send(err);
     } else {
       model.Question.findOne({where:{
         id:req.params.id,
         user_id:decoded.userid
       }
     }).then(function(data){
       if (data) {
         model.Question.destroy({where:{
           id:data.id
         }}).then(function(){
           res.send('data deleted')
         })
       } else {
         res.send('user unautorized')
       }

     })
     }
 });

 }
}
