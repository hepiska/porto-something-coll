'use strict';
module.exports = function(sequelize, DataTypes) {
  var AnswerVote = sequelize.define('AnswerVote', {
    vote_count: DataTypes.INTEGER,
    answer_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    question_id:DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        AnswerVote.belongsTo(models.Answer,{
          foreignKey: 'answer_id'
        });
        AnswerVote.belongsTo(models.Question,{
          foreignKey: 'question_id'
        });
        AnswerVote.belongsTo(models.User,{
          foreignKey: 'user_id'
        });
      }
    }
  });
  return AnswerVote;
};
