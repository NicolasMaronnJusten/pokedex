// SELETORES 
// Pega a UL onde os pokémons vão ser renderizados
const pokedexList = document.getElementById('pokedex-list');

// Input da barra de pesquisa
const searchInput = document.getElementById('search-input');

// Links da navbar (pra adicionar/remover o "active")
const navLinks = document.querySelectorAll('.nav-links a'); 

// Array onde guardamos todos os pokémons buscados na API
let allPokemons = [];


//  LÓGICA DA NAVBAR 
// Ativa/desativa o link clicado usando a classe "active"
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        // Remove o active de todos os links
        navLinks.forEach(nav => nav.classList.remove('active'));

        // Adiciona o active só no link clicado
        this.classList.add('active');
    });
});



//  FILTRO DE PESQUISA 
// Só executa se o input existir na página
if(searchInput) {
    searchInput.addEventListener('keyup', (e) => {
        
        // Texto digitado convertido pra minúsculo
        const searchString = e.target.value.toLowerCase();
        
        // Filtra por nome OU número exato
        const filteredPokemons = allPokemons.filter((pokemon) => {
            return (
                pokemon.name.toLowerCase().includes(searchString) ||
                pokemon.id.toString() === searchString
            );
        });

        // Atualiza a lista mostrando só os resultados filtrados
        displayPokemon(filteredPokemons);
    });
}

