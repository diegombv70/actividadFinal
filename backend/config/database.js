const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "C:/GIT/actividadFinal/appeliculas.db",
  logging: true,
});

module.exports = sequelize;


sequelize.sync({ alter: true })
    .then(() => console.log("Base de datos sincronizada"))
    .catch(err => console.error("Error al sincronizar la base de datos:", err));


