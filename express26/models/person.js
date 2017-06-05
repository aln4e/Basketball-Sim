'use strict';
module.exports = function(sequelize, DataTypes) {
  var Person = sequelize.define('Person', {
    name: DataTypes.STRING,
    age: DataTypes.INTEGER,
    sex: DataTypes.STRING,
    imageUrl: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },
    //5)I only want to display the original data types, not created date, etc
    instanceMethods: {
      toJSON(){
        return {
          name: this.get('name'),
          age: this.get('age'),
          sex: this.get('sex'),
          imageUrl: this.get('imageUrl')
        }
      }
    }
  });
  return Person;
};
