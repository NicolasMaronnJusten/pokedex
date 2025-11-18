// --- PARTE 1: SELETORES ---
const pokedexList = document.getElementById('pokedex-list');
const searchInput = document.getElementById('search-input');
const navLinks = document.querySelectorAll('.nav-links a'); 

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