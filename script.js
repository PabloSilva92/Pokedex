const pokecontainer = document.querySelector("#pokecontainer")
const pokemonCount = 251
const colors = {
    fire: '#cf4f4f',
    grass: '#4fcf4f',
    electric: '#cfcd4f',
    water: '#4f67cf',
    ground: '#cf9c4f',
    rock: '#75706c',
    fairy: '#cf4fa4',
    poison: '#914fcf',
    bug: '#98cf4f',
    dragon: '#4fcbcf',
    psychic: '#cf4f9e',
    flying: '#F5F5F5',
    fighting: '#cf694f',
    normal: '#e2ccc7',
    steel: '#79797e',
    ice: '#9ebbbb',
    ghost:'#464949',
    dark: '#000',
}

const mainTypes = Object.keys(colors);

const fetchPokemons = async () => {
    for (let i = 1; i <= pokemonCount; i++) {
        await getPokemons(i);
    }
}

const getPokemons = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
    const resp = await fetch(url)
    const data = await resp.json()
    createPokemonCard(data)
}

const createPokemonCard = (poke) => {
    const card = document.createElement('div')
    card.classList.add("pokemon")

    const name = poke.name[0].toUpperCase() + poke.name.slice(1)
    const id = poke.id.toString().padStart(3, '0')

    const pokeTypes = poke.types.map(type => type.type.name)
    const type1 = poke.types[0].type.name
    const type2 = poke.types[1] && poke.types[1].type.name
    
    let type1Color = colors[type1];
    let type2Color = colors[type2];
    let colorblack = false

    if (!type2){
        type2Color = type1Color;
    }
    
    card.style.background = `linear-gradient(to right, ${type1Color}, ${type2Color})`;
    if (type1Color == "#000" && type2Color == "#000" ) {
        colorblack = true
    }

    const pokemonInnerHTML = `
    <div class="imgContainer">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke.id}.png" alt= "${name}">
    </div>
    <div class="info">
        <span class="number">#${id}</span>
        <h3 class="name ${colorblack&&"reverse"}">${name}</h3>
        <small class="type ${colorblack&&"reverse"}">Type: <span>${type1}</span>${type2 ? ` / <span>${type2}</span>` : ''}</small>
    </div>
    </div>
`;

    card.innerHTML = pokemonInnerHTML

    pokecontainer.appendChild(card)
}

fetchPokemons()
