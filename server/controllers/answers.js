var model = require('../models');
let jwt = require('jsonwebtoken');

module.exports={
  create:function(req,res){
     let token=req.headers.token;
     jwt.verify(token, 'rahasia', function(err, decoded) {
       if (err) {
         res.send(err);
       } else {
         model.Answer.create({
           title:req.body.title,
           content:req.body.content,
           user_id:decoded.userid,
           question_id:req.body.question_id,
         }).then(function(){
           res.send('answer posted');
         })
       }
   });
  },
  viewByQuestionId:function(req,res){
    model.sequelize.query(`select questions.id as queston_id, users.id as user_id, users.name as user_name, answers.id as answer_id,answers.title as answer_tittle, answers.content as answer_content
       from public."Answers" answers left join public."Questions" questions  on(questions.id=answers.question_id)
       left join public."Users" users on (answers.user_id=users.id) where questions.id=${req.params.ques_id}`
      ,{
        type: model.sequelize.QueryTypes.SELECT
      }).then(function(answers){

        res.send(answers)
      }).catch(function(err){

      })
  },
  delete:function(req,res){
    let token=req.headers.token;
    jwt.verify(token, 'rahasia', function(err, decoded) {
      if (err) {
        res.send(err);
      } else {
        model.Answer.findOne({
          where:{
            id:req.params.id
          }
        }).then(function(data){
           if (data.user_id===decoded.userid) {
              model.Answer.destroy({
                where:{
                  id:data.id
                }
              }).then(function(){
                res.send('data deleted')
              }).catch(function(err){
                res.send(err)
              })
           } else {
            res.send('user cant delete this post')
           }
        })
      }
  });
  }

}
