const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Director = sequelize.define(
  "Director",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombres: { type: DataTypes.STRING, allowNull: false, unique: true }, 
    estado: { type: DataTypes.STRING, allowNull: false }, 
    fecha_creacion: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    fecha_actualizacion: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  { 
    timestamps: false,
    tableName: "Directors",
  }
);

module.exports = Director;
