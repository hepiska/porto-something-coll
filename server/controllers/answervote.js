var model = require('../models');
let jwt = require('jsonwebtoken');
module.exports={
  upvote:function(req,res){
    let token=req.headers.token;
    jwt.verify(token, 'rahasia', function(err, decoded) {
      if (err) {
        res.send(err);
      } else {
       model.AnswerVote.findOne({
         where:{
           user_id:decoded.userid,
           answer_id:req.body.answer_id
         }
       }).then(function(data){
         if (data) {
           res.send('user already vote for this answer')
         } else {
           model.AnswerVote.create({
             vote_count:1,
             answer_id:req.body.answer_id,
             user_id:decoded.userid,
             question_id:req.body.question_id,
           }).then(function(){
             res.send('voted');
           })

         }
       })

      }
  });
  },
  downvote:function(req,res){
    let token=req.headers.token;
    jwt.verify(token, 'rahasia', function(err, decoded) {
      if (err) {
        res.send(err);
      } else {
       model.AnswerVote.findOne({
         where:{
           user_id:decoded.userid,
           answer_id:req.body.answer_id
         }
       }).then(function(data){
         if (data) {
           res.send('user already vote for this answer')
         } else {
           model.AnswerVote.create({
             vote_count: -1,
             answer_id:req.body.answer_id,
             user_id:decoded.userid,
             question_id:req.body.question_id
           }).then(function(){
             res.send('answer posted');
           })

         }
       })

      }
  });
  },
  countvote:function(req,res){
    let data={}
    model.AnswerVote.sum('vote_count',{
      where:{
        answer_id:req.body.answer_id,
        question_id:req.body.question_id
      }
    }).then(function(sum){
       data['count']=sum;
       res.send(data)
    })
  }
}
