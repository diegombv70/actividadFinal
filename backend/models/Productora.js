const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Productora = sequelize.define(
  "Productora",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: { type: DataTypes.STRING, allowNull: false, unique: true },
    estado: { type: DataTypes.ENUM("Activo", "Inactivo"), allowNull: false },
    fecha_creacion: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    fecha_actualizacion: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    slogan: { type: DataTypes.STRING, allowNull: true, defaultValue: "" },
    descripcion: { type: DataTypes.TEXT, allowNull: true, defaultValue: "" },
  },
  { timestamps: false }
);

module.exports = Productora;
