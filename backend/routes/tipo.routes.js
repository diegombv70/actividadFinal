const express = require("express");
const router = express.Router();
const Tipo = require("../models/Tipo");

// Obtener todos los tipos
router.get("/", async (req, res) => {
    try {
        const tipos = await Tipo.findAll();
        res.json(tipos);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener tipos", detalle: error.message });
    }
});

// obtener tipo x id
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const tipo = await Tipo.findByPk(id);

        if (!tipo) {
            return res.status(404).json({ error: "Tipo no encontrado" });
        }

        res.json(tipo);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener Tipo", detalle: error.message });
    }
});

// Crear un nuevo Tipo
router.post("/", async (req, res) => {
    try {
        const { nombre, estado, descripcion } = req.body;
        if (!nombre || !estado) {
            return res.status(400).json({ error: "Nombre y estado son obligatorios" });
        }
        const nuevoGenero = await Tipo.create({ nombre, estado, descripcion });
        res.status(201).json(nuevoGenero);
    } catch (error) {
        res.status(500).json({ error: "Error al crear Tipo", detalle: error.message });
    }
});

// Actualizar un Tipo por ID
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, estado, descripcion } = req.body;
        const tipo = await Tipo.findByPk(id);

        if (!tipo) {
            return res.status(404).json({ error: "Tipo no encontrado" });
        }

        await tipo.update({ nombre, estado, descripcion });
        res.json(tipo);
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar Tipo", detalle: error.message });
    }
});

// Eliminar un Tipo por ID
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const tipo = await Tipo.findByPk(id);

        if (!tipo) {
            return res.status(404).json({ error: "Tipo no encontrado" });
        }

        await tipo.destroy();
        res.json({ mensaje: "Tipo eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar Tipo", detalle: error.message });
    }
});

module.exports = router;
