async function obtenerDatos() {
  try {
    document.getElementById("error").style.display = "none";
    const input = document.getElementById("ingreso");
    const response = await fetch("https://pokeapi.co/api/v2/pokemon/" + input.value);
    if (!response.ok) {
      throw new Error("no se encontro el pokemon");
    }
    const data = await response.json();
    document.getElementById("resultado").style.display = "block";
    document.getElementById("pokeImagen").src = data.sprites.front_default;
    document.getElementById("pokeNombre").textContent = data.name;
    const tipos = [];
    data.types.forEach(element => {
      tipos.push(element.type.name);
    });
    document.getElementById("pokeTipos").textContent = tipos;
    document.getElementById("pokePeso").textContent = `Peso: ${data.weight} kg`;

  } catch (error) {
    document.getElementById("resultado").style.display = "none";
    document.getElementById("error").style.display = "block";
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