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
    const { fecha, nombre,tipo,balatas,km,descripcion,mantenimiento,costo,proveedor,año,mes, dia,unidad,fecha_date } = req.body;
    const kmValue = km === "" ? 0 : km;

   
    const result = await pool.query(
      "INSERT INTO mantenimientos( fecha, nombre,tipo,balatas,km,descripcion,mantenimiento,costo,proveedor,año,mes, dia,unidad,fecha_date) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14) RETURNING id,nombre",
      [ fecha, nombre,tipo,balatas,kmValue,descripcion,mantenimiento,costo,proveedor,año,mes, dia,unidad,fecha_date]
    );

    res.status(201).json(result.rows[0]);

  } catch (error) {
  console.error("CREATE Manteinment ERROR:", error);
  res.status(500).json({ message: error.message });
}
};