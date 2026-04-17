async function obtenerDatos() {
  try {
    document.getElementById("resultado").style.display = "block";   
    const input = document.getElementById("ingreso");
    const response = await fetch("https://pokeapi.co/api/v2/pokemon/" + input.value);
    const data = await response.json();
        document.getElementById("pokeImagen").src = data.sprites.front_default;
        document.getElementById("pokeNombre").textContent = data.name;
        const tipos = []; 
        data.types.forEach(element => {
          tipos.push(element.type.name);
        });
        document.getElementById("pokeTipos").textContent = tipos;
        document.getElementById("pokePeso").textContent = `Peso: ${data.weight} kg`;

  } catch (error) {
    const errorM = document.getElementById("error");
    errorM = "no se encontro el pokemon"
    }
}

function buscarPokemon() {
obtenerDatos();
}

document.getElementById("btnBuscar").addEventListener("click", buscarPokemon);

const ingresoInput = document.getElementById("ingreso");
if (ingresoInput) {
  ingresoInput.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      obtenerDatos();
    }
  });
}