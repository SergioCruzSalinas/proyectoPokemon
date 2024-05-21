<template>
    
    <div>
        
        <div class="filtro">
            <PokemonFilter @update-search-term="handleUpdateSearchTerm" />

        </div>
      <div class="fondo">

        <PokemonList :pokemons="pokemons" :filteredPokemons="pokemonsFilters" />

      </div>

    </div>
  </template>
  
  <script>
  import PokemonFilter from '/src/components/PokemonFilter.vue';
  import PokemonList from '/src/components/PokemonList.vue';
  import axios from 'axios';
  
  export default {
    components: {
      PokemonList,
      PokemonFilter,
    },
    data() {
      return {
        pokemons: [],
        searchTerm: '',
        pokemonsFilters: [],
      };
    },
    mounted() {
      this.fetchAllPokemons();
    },
    methods: {
      filteredPokemons(filterTerm) {
        if (!filterTerm) {
          this.pokemonsFilters = [...this.pokemons];
          return;
        }
  
        filterTerm = filterTerm.toLowerCase();
  
        let pokemonsWithFilter = this.pokemons.filter(
          (pokemon) => pokemon.name.toLowerCase().includes(filterTerm) || parseInt(filterTerm) === pokemon.id
        );
  
        this.pokemonsFilters = [...pokemonsWithFilter];
      },
      handleUpdateSearchTerm(filterTerm) {
        this.filteredPokemons(filterTerm);
      },
      async fetchAllPokemons() {
        try {
          const response = await axios.get('https://pokeapi.co/api/v2/pokemon/?limit=811');
          const pokemonList = response.data.results;
          await Promise.all(
            pokemonList.map(async (pokemon) => {
              const pokemonResponse = await axios.get(pokemon.url);
              this.pokemons.push({
                name: this.capitalizarPrimeraLetra(pokemonResponse.data.name),
                id: pokemonResponse.data.id,
                types: pokemonResponse.data.types.map((typeInfo) => typeInfo.type.name),
                img: pokemonResponse.data.sprites.front_default,
                salud: pokemonResponse.data.stats[0].base_stat,
                ataque: pokemonResponse.data.stats[1].base_stat,
                defensa: pokemonResponse.data.stats[2].base_stat,
                velocidad: pokemonResponse.data.stats[5].base_stat,
                imagenesPokemons: [
                  pokemonResponse.data.sprites.front_default,
                  pokemonResponse.data.sprites.back_default,
                  pokemonResponse.data.sprites.back_shiny,
                  pokemonResponse.data.sprites.front_shiny,
                ],
              });
            })
          );
          this.pokemons.sort((a, b) => a.id - b.id);
          this.pokemonsFilters = [...this.pokemons];
        } catch (error) {
          console.error('Error fetching Pokémon data:', error);
        }
      },
      capitalizarPrimeraLetra(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      },
    },
  };
  </script>

  <style>
  .fondo{
  margin-top: -65px;
  background-image: url("/src/img/imagen.png");
  background-size: auto;
  background-repeat: repeat;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

ul{
  display: flex;
}

  .filtro{
    font-size: 40px;
    margin-left: 14.8rem;
    list-style: none;
    margin-top: 1rem;
  }
  </style>