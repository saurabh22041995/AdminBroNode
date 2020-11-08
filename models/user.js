const { Sequelize, DataTypes } = require('sequelize');
const sequelize =require('../utils/database');

const User = sequelize.define('users', {
  
  firstName: {
    type: DataTypes.STRING,
    set: function(value) {
      return this.setDataValue("firstName", JSON.stringify(value));
    }
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: true
  },
  email:{
    type:DataTypes.STRING,
    allowNull:false

  },
  uploadImage: {
    type:DataTypes.STRING,
    allowNull:true
  },
  secondImage: {
    type:DataTypes.STRING,
    allowNull:true
  }
}, {
  timestamps:true
});


module.exports=User;
  