const express = require("express");
const router = express.Router();
const Genero = require("../models/Genero");
const { verificarToken, soloAdmin } = require("../middlewares/auth");

// Obtener todos los géneros
router.get("/", verificarToken, soloAdmin, async (req, res) => {
  try {
    const generos = await Genero.findAll();
    res.json(generos);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener géneros", detalle: error.message });
  }
});

// Obtener género por ID
router.get("/:id", verificarToken, soloAdmin, async (req, res) => {
  try {
    const genero = await Genero.findByPk(req.params.id);
    if (!genero) return res.status(404).json({ error: "Género no encontrado" });
    res.json(genero);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener género", detalle: error.message });
  }
});

// Crear un nuevo género
router.post("/", verificarToken, soloAdmin, async (req, res) => {
  try {
    const { nombre, estado, descripcion } = req.body;
    if (!nombre || !estado) return res.status(400).json({ error: "Nombre y estado son obligatorios" });

    const nuevoGenero = await Genero.create({ nombre, estado, descripcion });
    res.status(201).json(nuevoGenero);
  } catch (error) {
    res.status(500).json({ error: "Error al crear género", detalle: error.message });
  }
});

// Actualizar un género
router.put("/:id", verificarToken, soloAdmin, async (req, res) => {
  try {
    const genero = await Genero.findByPk(req.params.id);
    if (!genero) return res.status(404).json({ error: "Género no encontrado" });

    const { nombre, estado, descripcion } = req.body;
    await genero.update({ nombre, estado, descripcion });
    res.json(genero);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar género", detalle: error.message });
  }
});

router.delete("/:id", verificarToken, soloAdmin, async (req, res) => {
  try {
    const genero = await Genero.findByPk(req.params.id);
    if (!genero) return res.status(404).json({ error: "Género no encontrado" });

    await genero.destroy();
    res.json({ mensaje: "Género eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar género", detalle: error.message });
  }
});

module.exports = router;