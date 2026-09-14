const express = require("express");
const router = express.Router();

const POKEAPI_BASE = "https://pokeapi.co/api/v2";

async function proxy(res, url, notFoundMsg) {
  try {
    const response = await fetch(url);
    if (response.status === 404) {
      return res.status(404).json({ error: notFoundMsg });
    }
    if (!response.ok) {
      return res.status(response.status).json({ error: "Error al consultar PokeAPI" });
    }
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

router.get("/pokemon", async (req, res) => {
  /*
    #swagger.tags = ['Pokemon']
    #swagger.summary = 'Lista paginada de pokémon'
    #swagger.description = 'Devuelve un listado paginado de pokémon (nombre y URL de detalle), delegando en la PokeAPI.'
    #swagger.parameters['limit'] = { in: 'query', description: 'Cantidad máxima de resultados a devolver', type: 'integer', example: 20 }
    #swagger.parameters['offset'] = { in: 'query', description: 'Cantidad de resultados a saltear (paginación)', type: 'integer', example: 0 }
    #swagger.responses[200] = {
      description: 'Listado obtenido correctamente',
      schema: { count: 1302, next: 'string', previous: null, results: [ { name: 'ditto', url: 'string' } ] }
    }
    #swagger.responses[500] = { description: 'Error interno del servidor' }
  */
  const { limit = 20, offset = 0 } = req.query;
  const url = `${POKEAPI_BASE}/pokemon?limit=${encodeURIComponent(limit)}&offset=${encodeURIComponent(offset)}`;
  await proxy(res, url, "No se encontraron pokémon");
});

router.get("/pokemon/:idOrName", async (req, res) => {
  /*
    #swagger.tags = ['Pokemon']
    #swagger.summary = 'Detalle de un pokémon'
    #swagger.description = 'Obtiene la información de un pokémon puntual por nombre o id numérico.'
    #swagger.parameters['idOrName'] = { in: 'path', description: 'Nombre (ej: ditto) o id numérico (ej: 235) del pokémon', required: true, type: 'string', example: 'ditto' }
    #swagger.responses[200] = {
      description: 'Pokémon encontrado',
      schema: { id: 132, name: 'ditto', weight: 40, height: 3, sprites: { front_default: 'string' }, types: [ { slot: 1, type: { name: 'normal', url: 'string' } } ] }
    }
    #swagger.responses[404] = { description: 'No se encontró el pokémon' }
    #swagger.responses[500] = { description: 'Error interno del servidor' }
  */
  const url = `${POKEAPI_BASE}/pokemon/${encodeURIComponent(req.params.idOrName.toLowerCase())}`;
  await proxy(res, url, "No se encontró el pokémon");
});

router.get("/type", async (req, res) => {
  /*
    #swagger.tags = ['Type']
    #swagger.summary = 'Lista de tipos de pokémon'
    #swagger.description = 'Devuelve el listado completo de tipos existentes (fuego, agua, planta, etc).'
    #swagger.responses[200] = {
      description: 'Listado obtenido correctamente',
      schema: { count: 20, results: [ { name: 'fire', url: 'string' } ] }
    }
    #swagger.responses[500] = { description: 'Error interno del servidor' }
  */
  const url = `${POKEAPI_BASE}/type`;
  await proxy(res, url, "No se encontraron tipos");
});

router.get("/type/:idOrName", async (req, res) => {
  /*
    #swagger.tags = ['Type']
    #swagger.summary = 'Detalle de un tipo'
    #swagger.description = 'Obtiene un tipo por nombre o id, incluyendo el listado de pokémon que pertenecen a ese tipo.'
    #swagger.parameters['idOrName'] = { in: 'path', description: 'Nombre (ej: fire) o id numérico (ej: 3) del tipo', required: true, type: 'string', example: 'fire' }
    #swagger.responses[200] = {
      description: 'Tipo encontrado',
      schema: { id: 10, name: 'fire', pokemon: [ { pokemon: { name: 'charmander', url: 'string' }, slot: 1 } ] }
    }
    #swagger.responses[404] = { description: 'No se encontró el tipo' }
    #swagger.responses[500] = { description: 'Error interno del servidor' }
  */
  const url = `${POKEAPI_BASE}/type/${encodeURIComponent(req.params.idOrName.toLowerCase())}`;
  await proxy(res, url, "No se encontró el tipo");
});

router.get("/ability/:idOrName", async (req, res) => {
  /*
    #swagger.tags = ['Ability']
    #swagger.summary = 'Detalle de una habilidad'
    #swagger.description = 'Obtiene la información de una habilidad (ability) por nombre o id.'
    #swagger.parameters['idOrName'] = { in: 'path', description: 'Nombre (ej: static) o id numérico (ej: 9) de la habilidad', required: true, type: 'string', example: 'static' }
    #swagger.responses[200] = {
      description: 'Habilidad encontrada',
      schema: { id: 9, name: 'static', effect_entries: [], pokemon: [] }
    }
    #swagger.responses[404] = { description: 'No se encontró la habilidad' }
    #swagger.responses[500] = { description: 'Error interno del servidor' }
  */
  const url = `${POKEAPI_BASE}/ability/${encodeURIComponent(req.params.idOrName.toLowerCase())}`;
  await proxy(res, url, "No se encontró la habilidad");
});

router.get("/evolution/:id", async (req, res) => {
  /*
    #swagger.tags = ['Evolution']
    #swagger.summary = 'Cadena de evolución'
    #swagger.description = 'Obtiene la cadena de evolución completa a partir de su id.'
    #swagger.parameters['id'] = { in: 'path', description: 'Id numérico de la cadena de evolución', required: true, type: 'integer', example: 3 }
    #swagger.responses[200] = {
      description: 'Cadena de evolución encontrada',
      schema: { id: 3, chain: { species: { name: 'venusaur', url: 'string' }, evolves_to: [] } }
    }
    #swagger.responses[404] = { description: 'No se encontró la cadena de evolución' }
    #swagger.responses[400] = { description: 'Id inválido' }
    #swagger.responses[500] = { description: 'Error interno del servidor' }
  */
  const { id } = req.params;
  if (!/^\d+$/.test(id)) {
    return res.status(400).json({ error: "El id de la cadena de evolución debe ser numérico" });
  }
  const url = `${POKEAPI_BASE}/evolution-chain/${encodeURIComponent(id)}`;
  await proxy(res, url, "No se encontró la cadena de evolución");
});

module.exports = router;
