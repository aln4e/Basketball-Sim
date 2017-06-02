'use strict';
const crypto = require('crypto')
const uuid = require('uuid/v1')

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    user_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    // encryptedPassword: {
    //   type: DataTypes.STRING,
    //   allowNull:false
    // },
    authToken: DataTypes.STRING,
    authTokenExpiration: DataTypes.DATE
    // salt: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },
    setterMethods:{
      password(value){
        if(value){
          const salt = uuid()
          this.setDataValue('salt', salt)
          const hash = this.encrypt(value)
          this.setDataValue('encryptedPassword', hash)
        }
      }
    },
    instanceMethods:{
      toJSON(){
        return {
          id: this.get('id'),
          email: this.get('email'),
          authToken: this.get('authToken'),
          authTokenExpiration: this.get('authTokenExpiration')
        }
      },
      setAuthToken(){
         const token = uuid()
         const expiration = new Date()
         expiration.setMonth(expiration.getMonth() + 1)
         this.setDataValue('authToken', token)
         this.setDataValue('authTokenExpiration', expiration)
       },

      encrypt(value){
        const salt = this.get('salt')
        return crypto.createHmac('sha512', salt)
          .update(value)
          .digest('hex')
      },
      verifyPassword(unverifiedPassword){
        const encryptedUnverifiedPassword = this.encrypt(unverifiedPassword)
        return encryptedUnverifiedPassword === this.get('encryptedPassword')
      }
    },
    hooks:{
      beforeCreate: function(user, options){
        user.setAuthToken()
      }
    }
  });
  return User;
};
