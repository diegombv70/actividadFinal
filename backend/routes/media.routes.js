const express = require("express");
const router = express.Router();
const Media = require("../models/Media");
const { verificarToken, soloAdmin } = require("../middlewares/auth");


router.get("/", verificarToken, async (req, res) => {
  try {
    const media = await Media.findAll();
    res.json(media);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener la media", detalle: error.message });
  }
});


router.get("/:id", verificarToken, async (req, res) => {
  try {
    const media = await Media.findByPk(req.params.id);
    if (!media) return res.status(404).json({ error: "Media no encontrada" });
    res.json(media);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener la media", detalle: error.message });
  }
});


router.post("/", verificarToken, soloAdmin, async (req, res) => {
  try {
    const nuevaMedia = await Media.create(req.body);
    res.status(201).json(nuevaMedia);
  } catch (error) {
    res.status(500).json({ error: "Error al crear la media", detalle: error.message });
  }
});


router.put("/:id", verificarToken, soloAdmin, async (req, res) => {
  try {
    const media = await Media.findByPk(req.params.id);
    if (!media) return res.status(404).json({ error: "Media no encontrada" });
    await media.update(req.body);
    res.json(media);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar la media", detalle: error.message });
  }
});


router.delete("/:id", verificarToken, soloAdmin, async (req, res) => {
  try {
    const media = await Media.findByPk(req.params.id);
    if (!media) return res.status(404).json({ error: "Media no encontrada" });
    await media.destroy();
    res.json({ mensaje: "Media eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar la media", detalle: error.message });
  }
});

module.exports = router;
