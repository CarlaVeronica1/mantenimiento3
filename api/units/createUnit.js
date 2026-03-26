const bcrypt = require("bcryptjs");
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

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Método no permitido" });
  }

  try {
    const { vehiculo, placa,modelo,capacidadCarga,capacidadPeso,numeroSerie,anoModelo,tipoCombustible } = req.body;
    const capacidadPesoValue = capacidadPeso === "" ? null : capacidadPeso;

    const existing = await pool.query(
      "SELECT * FROM units WHERE vehiculo=$1",
      [vehiculo]
    );

    if (existing.rows.length > 0) {
      return res.status(400).json({ message: "Unidad ya existe" });
    }

    const result = await pool.query(
      "INSERT INTO units(vehiculo, placa,modelo,capacidadCarga,capacidadPeso,numeroSerie,anoModelo,tipoCombustible) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING id,vehiculo",
      [vehiculo, placa,modelo,capacidadCarga,capacidadPesoValue,numeroSerie,anoModelo,tipoCombustible]
    );

    res.status(201).json(result.rows[0]);

  } catch (error) {
  console.error("CREATE UNIT ERROR:", error);
  res.status(500).json({ message: error.message });
}
};