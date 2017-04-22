'use strict';
module.exports = function(sequelize, DataTypes) {
  var Answer = sequelize.define('Answer', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    question_id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        Answer.belongsTo(models.Question,{
          foreignKey: 'question_id'
        });
        Answer.hasMany(models.AnswerVote,{
          foreignKey: 'answer_id'
        });
      }
    }
  });
  return Answer;
};
