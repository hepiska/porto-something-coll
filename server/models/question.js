'use strict';
module.exports = function(sequelize, DataTypes) {
  var Question = sequelize.define('Question', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    user_id: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Question.belongsTo(models.User,{
          foreignKey: 'user_id'
        });

        Question.hasMany(models.Answer,{
          foreignKey: 'question_id'
        });
        Question.hasMany(models.AnswerVote,{
          foreignKey: 'question_id'
        });
      }
    }
  });
  return Question;
};
