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

  if (req.method !== "GET") {
    return res.status(405).json({ message: "Método no permitido" });
  }

  try {
    const { id } = req.query;

    const result = await pool.query(
      "SELECT fecha, nombre,tipo,balatas,km,descripcion,mantenimiento,costo,proveedor,año,unidad FROM mantenimientos WHERE unidad = $1 ORDER BY año ASC,mes ASC NULLS LAST,dia ASC NULLS LAST",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "mantenimiento no encontrado" });
    }

     res.status(200).json(result.rows);
    //res.json(result.rows[0]);

  } catch (error) {
  console.error("GET mantenimiento ERROR:", error);
  res.status(500).json({ message: error.message });
}
};