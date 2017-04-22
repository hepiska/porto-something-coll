'use strict';
module.exports = function(sequelize, DataTypes) {
  var QuestionVote = sequelize.define('QuestionVote', {
    vote_count: DataTypes.INTEGER,
    Question_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return QuestionVote;
};