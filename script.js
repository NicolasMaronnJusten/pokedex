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

// 1. Dicionário para traduzir tipos e definir cores
const typeMap = {
    fire: { name: 'Fogo', color: '#e25822' },
    water: { name: 'Água', color: '#4592c4' },
    grass: { name: 'Grama', color: '#7ac74c' },
    electric: { name: 'Elétrico', color: '#f7d02c' },
    ice: { name: 'Gelo', color: '#96d9d6' },
    fighting: { name: 'Lutador', color: '#c22e28' },
    poison: { name: 'Venenoso', color: '#a33ea1' },
    ground: { name: 'Terra', color: '#e2bf65' },
    flying: { name: 'Voador', color: '#a98ff3' },
    psychic: { name: 'Psíquico', color: '#f95587' },
    bug: { name: 'Inseto', color: '#a6b91a' },
    rock: { name: 'Pedra', color: '#b6a136' },
    ghost: { name: 'Fantasma', color: '#735797' },
    dragon: { name: 'Dragão', color: '#6f35fc' },
    dark: { name: 'Sombrio', color: '#705746' },
    steel: { name: 'Metal', color: '#b7b7ce' },
    fairy: { name: 'Fada', color: '#d685ad' },
    normal: { name: 'Normal', color: '#a8a77a' }
};


const heroName = document.getElementById('hero-name');
const heroImg = document.getElementById('hero-img');
const heroTypes = document.getElementById('hero-types');
const heroDesc = document.getElementById('hero-desc');
const heroBanner = document.getElementById('hero-banner');

//  Função Principal
// Agora aceita dois dados: o ID e a DESCRIÇÃO que você escreveu
const loadHero = async (pokemonId, descricaoTexto) => {
    try {
        // Busca dados do Pokemon (Nome, Imagem, Tipos)
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
        const data = await res.json();

        // PREENCHER DADOS 
        
        // Nome (Primeira letra maiúscula)
        heroName.innerText = data.name.charAt(0).toUpperCase() + data.name.slice(1);

        // Imagem
        heroImg.src = data.sprites.other['official-artwork'].front_default;

        // Tipos
        heroTypes.innerHTML = ''; // Limpa os anteriores
        
        data.types.forEach(t => {
            const typeInfo = typeMap[t.type.name]; // Pega tradução e cor
            
            // Cria o span do tipo
            const badge = document.createElement('span');
            badge.className = 'type-badge';
            badge.innerText = typeInfo ? typeInfo.name : t.type.name;
            badge.style.backgroundColor = typeInfo ? typeInfo.color : '#777';
            badge.style.color = 'white';
            
            heroTypes.appendChild(badge);
        });

        // 4. Descrição
        heroDesc.innerText = descricaoTexto;
      
    } catch (error) {
        console.error("Erro ao carregar destaque:", error);
    }
};

// pokemon definido e descrição personalizada
loadHero(249, "As asas de Lugia têm um poder devastador—um leve bater de asas pode destruir casas comuns. Como resultado, este Pokémon escolhe viver fora da vista, nas profundezas do mar.");



