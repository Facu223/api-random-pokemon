console.log(Math.floor(Math.random() * 149 + 1));
const flex = document.querySelector(".flex");

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

console.log(getRandomInt(1, 151));

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".boton").addEventListener("click", () => {
    removeChildNodes(flex)
    fetchData();
  });
});

const fetchData = async () => {
  try {
    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${getRandomInt(1, 151)}`
    );
    const data = await res.json();
    pintarCard(data);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

const pintarCard = (pokemon) => {
  
  const template = document.querySelector("#template-card").content;
  const clone = template.cloneNode(true);
  const fragment = document.createDocumentFragment();
  const img = pokemon.sprites.other.dream_world.front_default;
  const name = pokemon.name;
  const hp = pokemon.stats[0].base_stat;
  const experiencia = pokemon.base_experience;
  const ataque = pokemon.stats[1].base_stat;
  const especial = pokemon.stats[3].base_stat;
  const defensa = pokemon.stats[2].base_stat;

  clone.querySelector(".card-body-img").setAttribute("src", img);
  clone.querySelector(
    ".card-body-title"
  ).innerHTML = `${name} <span>${hp} hp<span/>`;
  clone.querySelector(".card-body-text").textContent = experiencia + " Exp";
  clone.querySelectorAll(".card-footer-social h3")[0].textContent = ataque;
  clone.querySelectorAll(".card-footer-social h3")[1].textContent = especial;
  clone.querySelectorAll(".card-footer-social h3")[2].textContent = defensa;

  fragment.appendChild(clone);
  flex.appendChild(fragment);
};

const removeChildNodes = (parent) => {
  while(parent.firstChild){
      parent.removeChild(parent.firstChild)
  }
}

