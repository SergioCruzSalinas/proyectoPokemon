<template>
  <v-card title="Pokemon" flat>
    <template v-slot:text>
      <v-text-field
        v-model="search"
        label="Filtrar por nombre"
        prepend-inner-icon="mdi-magnify"
        variant="outlined"
        hide-details
        single-line></v-text-field>
    </template>

    <v-data-table :headers="headers" :items="pokemonsFilters" :search="search"></v-data-table>
  </v-card>
</template>

<script>
  import axios from 'axios';

  export default {
    data() {
      return {
        search: '',
        pokemons: [], // Aquí almacenaremos los datos de los Pokémon
        pokemonsFilters: [], // Los Pokémon filtrados se mostrarán aquí
        headers: [
          { key: 'name', title: 'Nombre' },
          { key: 'types', title: 'Tipos' },
          { key: 'id', title: 'ID' },
        ],
      };
    },
    mounted() {
      this.fetchAllPokemons();
    },
    methods: {
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
              });
            })
          );
          this.pokemonsFilters = [...this.pokemons]; // Inicialmente, mostramos todos los Pokémon
        } catch (error) {
          console.error('Error al obtener los datos de los Pokémon:', error);
        }
      },
      capitalizarPrimeraLetra(texto) {
        return texto.charAt(0).toUpperCase() + texto.slice(1);
      },
      handleUpdateSearchTerm(filterTerm) {
        this.filteredPokemons(filterTerm);
      },
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
    },
  };
</script>
