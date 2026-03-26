const pool = require("../../db");

module.exports = async (req, res) => {

  
     //  CORS HEADERS (IMPORTANTE)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

    // 👇 MANEJAR PREFLIGHT
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "PUT") {
    return res.status(405).json({ message: "Método no permitido" });
  }

  try {
    const { id,vehiculo, placa,modelo,capacidadCarga,capacidadPeso,numeroSerie,anoModelo,tipoCombustible} = req.body;

    const result = await pool.query(
      "UPDATE drivers SET vehiculo=$1, placa=$2, modelo=$3, capacidadCarga=$4, capacidadPeso=$5, numeroSerie=$6,anoModelo=$7,tipoCombustible=$8 WHERE id=$9 RETURNING id,vehiculo",
      [vehiculo, placa,modelo,capacidadCarga,capacidadPeso,numeroSerie,anoModelo,tipoCombustible, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Unidad no encontrada" });
    }

    res.json(result.rows[0]);

  } catch (error) {
  console.error("UPDATE UNIT ERROR:", error);
  res.status(500).json({ message: error.message });
}
};