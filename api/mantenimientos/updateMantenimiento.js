const pool = require("../../db");

module.exports = async (req, res) => {

  
     //  CORS HEADERS (IMPORTANTE)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS,PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

    // 👇 MANEJAR PREFLIGHT
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "PUT") {
    return res.status(405).json({ message: "Método no permitido" });
  }

  try {
    const { id, fecha, nombre,tipo,balatas,km,descripcion,mantenimiento,costo,proveedor,año,unidad} = req.body;

    const result = await pool.query(
      "UPDATE mantenimientos SET fecha=$1, nombre=$2,tipo=$3,balatas=$4,km=$5,descripcion=$6,mantenimiento=$7,costo=$8,proveedor=$9,año=$10,unidad=$11 WHERE id=$12 RETURNING id,nombre",
      [ fecha, nombre,tipo,balatas,km,descripcion,mantenimiento,costo,proveedor,año,unidad, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "mantenimiento no encontrado" });
    }

    res.json(result.rows[0]);

  } catch (error) {
  console.error("UPDATE mantenimientos ERROR:", error);
  res.status(500).json({ message: error.message });
}
};