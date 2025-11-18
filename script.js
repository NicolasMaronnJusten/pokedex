// --- PARTE 1: SELETORES ---
const pokedexList = document.getElementById('pokedex-list');
const searchInput = document.getElementById('search-input');
const navLinks = document.querySelectorAll('.nav-links a'); // Pegando os links da navbar

let allPokemons = []; // Guarda os dados para a busca

// --- PARTE 2: LÓGICA DA NAVBAR (Manteve o que fizemos antes) ---
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        // Remove 'active' de todos
        navLinks.forEach(nav => nav.classList.remove('active'));
        // Adiciona 'active' só no clicado
        this.classList.add('active');
    });
});

// --- PARTE 3: BUSCAR POKEMONS NA API ---
const fetchPokemon = async () => {
    const url = `https://pokeapi.co/api/v2/pokemon?limit=151`;
    const res = await fetch(url);
    const data = await res.json();
    
    // Mapeando os dados e salvando na variável global
    allPokemons = data.results.map((pokemon, index) => ({
        ...pokemon,
        id: index + 1,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${index + 1}.png`
    }));

    displayPokemon(allPokemons);
};

// --- PARTE 4: MOSTRAR NA TELA (HTML dos Cards Cinzas) ---
const displayPokemon = (pokemonList) => {
    const htmlString = pokemonList.map((pokemon) => `
        <li class="card">
            <div class="card-content">
                <img class="card-image" src="${pokemon.image}" alt="${pokemon.name}"/>
                <h2 class="card-title">${pokemon.id}. ${pokemon.name}</h2>
            </div>
        </li>
    `).join('');
    
    pokedexList.innerHTML = htmlString;
};

// --- PARTE 5: LÓGICA DA PESQUISA ---
if(searchInput) {
    searchInput.addEventListener('keyup', (e) => {
        const searchString = e.target.value.toLowerCase();
        
        const filteredPokemons = allPokemons.filter((pokemon) => {
            return (
                pokemon.name.toLowerCase().includes(searchString) ||
                pokemon.id.toString() === searchString
            );
        });

        displayPokemon(filteredPokemons);
    });
}

// fetchPokemon();