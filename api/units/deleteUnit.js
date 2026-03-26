const pool = require("../../db");

module.exports = async (req, res) => {
  if (req.method !== "DELETE") {
    return res.status(405).json({ message: "Método no permitido" });
  }

  try {
    const { id } = req.query;

    const result = await pool.query(
      "DELETE FROM units WHERE id=$1 RETURNING id",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Unidad no encontrada" });
    }

    res.json({ message: "Unidad eliminada" });

  } catch (error) {
  console.error("DELETE UNIT ERROR:", error);
  res.status(500).json({ message: error.message });
  }
};