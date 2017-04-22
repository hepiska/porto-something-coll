var express = require('express');
var router = express.Router();
let auth = require('../helper/auth');
var model = require('../models');
var userCon = require('../controllers/users');
var questionCon =require('../controllers/questions')
var answerCon =require('../controllers/answers')
var ansVoteCOn =require('../controllers/answervote')
var passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;
let crypto=require('crypto');
let jwt = require('jsonwebtoken');

passport.use(new LocalStrategy({
        usernameField: 'email',
        session: false
    },
    function(email, password, done) {
        model.User.findOne({
            where: {
                email: email
            }
        }).then(function(user){
          if (user) {
            if (user.password===crypto.createHmac('sha256',user.salt)
                .update(password).digest('hex')) {
              done(null,user)
            } else {
               done(null,false)
            }

          } else {
            done(null,false)
          }
        });
    }
));

//user
router.post('/user',userCon.register);
router.post('/login',passport.authenticate('local',{session:false}),
function(req,res){
  let user=res.req.user;
  let token=jwt.sign({
            userid:user.id,
            name:user.name,
            email:user.email,
            facebook_id:user.facebook_id
          },'rahasia',{ expiresIn: 60 * 60 });
  res.send(token)
})
// router.post('/loginfb',userCon.loginfb);
router.get('/user',userCon.views);
router.put('/user',auth.auth,userCon.update);
router.delete('/user/:id',userCon.delete);

//question
router.post('/question',auth.auth,questionCon.create);
router.get('/question',questionCon.views);
router.get('/userquestion',auth.auth,questionCon.userquestionviews);
router.get('/question/:id',questionCon.view);
router.put('/question/:id',auth.auth,questionCon.update);
router.delete('/question/:id',auth.auth,questionCon.delete);

//answer
router.post('/answer',auth.auth,answerCon.create);
router.get('/answerofquestion/:ques_id',answerCon.viewByQuestionId);
// router.get('/userquestion',auth.auth,answerCon.userquestionviews);
// router.get('/answer/:id',answerCon.view);
// router.put('/answer/:id',auth.auth,answerCon.update);
router.delete('/answer/:id',auth.auth,answerCon.delete);

router.post('/upvote',auth.auth,ansVoteCOn.upvote)
router.post('/downvote',auth.auth,ansVoteCOn.downvote)
router.post('/votecount',ansVoteCOn.countvote)


module.exports=router;
