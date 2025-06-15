const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Genero = require("./Genero");
const Director = require("./Director");
const Productora = require("./Productora");
const Tipo = require("./Tipo");

const Media = sequelize.define(
  "Media",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    serial: { type: DataTypes.STRING, allowNull: false, unique: true },
    titulo: { type: DataTypes.STRING, allowNull: false },
    sinopsis: { type: DataTypes.TEXT },
    url: { type: DataTypes.STRING, allowNull: false, unique: true },
    imagen: { type: DataTypes.STRING },
    fecha_creacion: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    fecha_actualizacion: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    anio_estreno: { type: DataTypes.INTEGER, allowNull: false },
    genero_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: Genero, key: "id" } },
    director_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: Director, key: "id" } },
    productora_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: Productora, key: "id" } },
    tipo_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: Tipo, key: "id" } },
  },
  { timestamps: false }
);


Genero.hasMany(Media, { foreignKey: "genero_id" });
Media.belongsTo(Genero, { foreignKey: "genero_id" });

Director.hasMany(Media, { foreignKey: "director_id" });
Media.belongsTo(Director, { foreignKey: "director_id" });

Productora.hasMany(Media, { foreignKey: "productora_id" });
Media.belongsTo(Productora, { foreignKey: "productora_id" });

Tipo.hasMany(Media, { foreignKey: "tipo_id" });
Media.belongsTo(Tipo, { foreignKey: "tipo_id" });

module.exports = Media;
