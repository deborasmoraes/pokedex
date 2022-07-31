// pokemon
const pokemonName = document.querySelector('.pokemon_name');
const pokemonID = document.querySelector('.pokemon_id');
const pokemonImage = document.querySelector('.pokemon_image');

const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let procurarPokemon = 1;

const fetchPokemon = async (pokemon) =>{

    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIResponse.status === 200){
        const data = await APIResponse.json();
        return data;
    }

}

const renderPokermon = async (pokemon) => {
    pokemonID.innerHTML = '';

    const data = await fetchPokemon(pokemon);

    if (data){
    pokemonImage.style.display = 'block';
    pokemonName.innerHTML = data.name;
    pokemonID.innerHTML = data.id;
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    procurarPokemon = data.id;
    } 
    else {
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = "Não encontrado :c";
        pokemonID.innerHTML = "Não encontrado :c";
    }
}

form.addEventListener('submit', (event) =>{

    event.preventDefault();
    renderPokermon(input.value.toLowerCase());
    input.value = '';
});

buttonPrev.addEventListener('click', () =>{
    if (procurarPokemon > 1){
        procurarPokemon -= 1;
        renderPokermon(procurarPokemon);
    }
   
});

buttonNext.addEventListener('click', () =>{
    procurarPokemon += 1;
    renderPokermon(procurarPokemon);
});

renderPokermon(procurarPokemon)
