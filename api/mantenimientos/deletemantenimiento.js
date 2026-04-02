const pool = require("../../db");

module.exports = async (req, res) => {

  
     //  CORS HEADERS (IMPORTANTE)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

    // 👇 MANEJAR PREFLIGHT
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "DELETE") {
    return res.status(405).json({ message: "Método no permitido" });
  }

  try {
    const { id } = req.query;

    const result = await pool.query(
      "DELETE FROM mantenimientos WHERE id=$1 RETURNING id",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Mantenimiento no encontrado" });
    }

    res.json({ message: "Mantenimiento eliminado" });

  } catch (error) {
  console.error("DELETE Mantenimiento ERROR:", error);
  res.status(500).json({ message: error.message });
  }
};