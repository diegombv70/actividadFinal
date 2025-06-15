const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Genero = sequelize.define(
  "Genero",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: { type: DataTypes.STRING, allowNull: false, unique: true },
    estado: { type: DataTypes.ENUM("Activo", "Inactivo"), allowNull: false },
    fecha_creacion: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    fecha_actualizacion: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    descripcion: { type: DataTypes.TEXT },
  },
  {
    timestamps: false,
  }
);

module.exports = Genero;
