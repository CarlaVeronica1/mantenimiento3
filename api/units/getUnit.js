const pool = require("../../db");

module.exports = async (req, res) => {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Método no permitido" });
  }

  try {
    const { id } = req.query;

    const result = await pool.query(
      "SELECT vehiculo, placa,modelo,capacidadCarga,capacidadPeso,numeroSerie,anoModelo,tipoCombustible FROM units WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Unidad no encontrada" });
    }

    res.json(result.rows[0]);

  } catch (error) {
    res.status(500).json({ message: "Error servidor" });
  }
};