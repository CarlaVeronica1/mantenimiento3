const pool = require("../../db");

module.exports = async (req, res) => {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Método no permitido" });
  }

  try {
    const result = await pool.query("SELECT id, vehiculo, placa,modelo,capacidadCarga,capacidadPeso,numeroSerie,anoModelo,tipoCombustible FROM units");

    res.status(200).json(result.rows);

  }catch (error) {
  console.error("GETALL UNIT ERROR:", error);
  res.status(500).json({ message: error.message });
}
};