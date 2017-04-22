'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    name: {
      type:DataTypes.STRING,
      validate:{
        notEmpty: true
      }
    },
    email: {
        type: DataTypes.STRING,
        validate: {
            isEmail: true,
            isuniq: function(value, next) {
                User.find({
                    where: {
                        email: value
                    }
                }).then(function(user) {
                    if (user) {
                        next('already taken')
                    } else {
                        next()
                    }
                })
            }
        }
    },
    facebook_id:DataTypes.STRING,
    salt:DataTypes.STRING,
    password:{
      type:DataTypes.STRING,
      validate:{
        notEmpty: true
      }
    }
  }, {
    classMethods: {
      associate: function(models) {
        User.hasMany(models.Question,{
          foreignKey: 'user_id'
        });
      }
    }
  });
  return User;
};
