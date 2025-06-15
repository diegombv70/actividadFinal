

const jwt = require("jsonwebtoken");
const SECRET = "Esta_Es_micalve_segura";

function verificarToken(req, res, next) {
  const header = req.headers["authorization"];
  console.log("Encabezado recibido:", header);

  if (!header || !header.startsWith("Bearer ")) {
    return res.status(403).json({ error: "Token requerido o mal formado" });
  }

  const token = header.split(" ")[1];
  console.log("Token extraído:", token);

  try {
    const decoded = jwt.verify(token, SECRET);
    console.log("Token decodificado:", decoded);
    req.usuario = decoded;
    next();
  } catch (error) {
    console.error("Error al verificar token:", error.message);
    res.status(401).json({ error: "Token inválido", detalle: error.message });
  }
}

function soloAdmin(req, res, next) {
  if (req.usuario.rol !== "administrador") {
    return res.status(403).json({ error: "Acceso denegado. Solo administradores." });
  }
  next();
}

function soloDocente(req, res, next) {
  if (req.usuario.rol !== "docente") {
    return res.status(403).json({ error: "Acceso denegado. Solo docentes." });
  }
  next();
}

module.exports = { verificarToken, soloAdmin, soloDocente };
