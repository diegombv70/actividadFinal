
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/Usuario");

const SECRET = "Esta_Es_micalve_segura";
router.post("/register", async (req, res) => {
  try {
    const { email, password, rol } = req.body;
    if (!email || !password || !rol) {
      return res.status(400).json({ error: "Faltan datos obiligatorios" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const usuario = await Usuario.create({ email, password: hashedPassword, rol });

    const token = jwt.sign({ id: usuario.id, rol: usuario.rol }, SECRET, { expiresIn: "1h" });
    console.log(" Token generado (registro):", token);

    res.status(201).json({
      mensaje: "Usuario creado correctamente",
      usuario: { id: usuario.id, email: usuario.email, rol: usuario.rol },
      token
    });
  } catch (error) {
    res.status(500).json({ error: "Error al registrar", detalle: error.message });
  }
});


router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario) return res.status(404).json({ error: "Usuario no encontrado" });

    const match = await bcrypt.compare(password, usuario.password);
    if (!match) return res.status(401).json({ error: "Contraseña incorrecta" });

    const token = jwt.sign({ id: usuario.id, rol: usuario.rol }, SECRET, { expiresIn: "1h" });
    console.log(" Token generado (login):", token);

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "Error al autenticar", detalle: error.message });
  }
});

module.exports = router;