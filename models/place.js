const { Sequelize, DataTypes } = require('sequelize');
const sequelize =require('../utils/database');

const Place = sequelize.define('place', {
  
  place: {
    type: DataTypes.STRING,
    allowNull: true
  },
  state: {
    type: DataTypes.STRING,
    allowNull: true
  },
  country:{
    type:DataTypes.STRING,
    allowNull:false

  },
}, {
  timestamps:true
});


module.exports=Place;
  