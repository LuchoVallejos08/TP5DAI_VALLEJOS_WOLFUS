const express = require("express");
const path = require("path");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger-output.json");
const pokemonRoutes = require("./routes/pokemon.routes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api", pokemonRoutes);

app.use(express.static(path.join(__dirname)));

app.listen(PORT, () => {
  console.log(`Tatodex escuchando en http://localhost:${PORT}`);
  console.log(`Documentación Swagger en http://localhost:${PORT}/api-docs`);
});
