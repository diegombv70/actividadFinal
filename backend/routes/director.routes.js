
const express = require("express");
const router = express.Router();
const Director = require("../models/Director");
const { verificarToken, soloAdmin } = require("../middlewares/auth");


router.get("/", verificarToken, soloAdmin, async (req, res) => {
  try {
    const directores = await Director.findAll();
    res.json(directores);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener directores", detalle: error.message });
  }
});


router.get("/:id", verificarToken, soloAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const director = await Director.findByPk(id);
    if (!director) {
      return res.status(404).json({ error: "Director no encontrado" });
    }
    res.json(director);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener director", detalle: error.message });
  }
});


router.post("/", verificarToken, soloAdmin, async (req, res) => {
  try {
    const { nombres, estado } = req.body;
    if (!nombres || !estado) {
      return res.status(400).json({ error: "Faltan datos obligatorios: nombre y estado" });
    }
    const nuevoDirector = await Director.create({ nombres, estado });
    res.status(201).json(nuevoDirector);
  } catch (error) {
    res.status(500).json({ error: "No se pudo agregar el director", detalle: error.message });
  }
});


router.put("/:id", verificarToken, soloAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const director = await Director.findByPk(id);
    if (!director) {
      return res.status(404).json({ error: "Director no encontrado" });
    }
    if (!req.body.nombres && !req.body.estado) {
      return res.status(400).json({ error: "Debe proporcionar al menos un campo para actualizar" });
    }
    await director.update(req.body);
    res.json(director);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el director", detalle: error.message });
  }
});


router.delete("/:id", verificarToken, soloAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const director = await Director.findByPk(id);
    if (!director) {
      return res.status(404).json({ error: "Director no encontrado" });
    }
    await director.destroy();
    res.json({ mensaje: "Director eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el director", detalle: error.message });
  }
});

module.exports = router;
