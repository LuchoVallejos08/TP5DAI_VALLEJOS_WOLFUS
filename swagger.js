const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Tatodex API",
    description:
      "API propia que envuelve la PokeAPI para el proyecto Tatodex. Documentada con swagger-autogen y swagger-ui-express.",
    version: "1.0.0",
  },
  host: "localhost:3000",
  basePath: "/api",
  schemes: ["http"],
  tags: [
    { name: "Pokemon", description: "Consultas de pokémon" },
    { name: "Type", description: "Consultas de tipos" },
    { name: "Ability", description: "Consultas de habilidades" },
    { name: "Evolution", description: "Consultas de cadenas de evolución" },
  ],
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./routes/pokemon.routes.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);
