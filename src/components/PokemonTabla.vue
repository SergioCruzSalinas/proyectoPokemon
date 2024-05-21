<template>
  <v-card title="" flat>
    <template v-slot:text>
      <v-text-field
        v-model="search"
        label="Filtrar por ID, nombre o tipo"
        prepend-inner-icon="mdi-magnify"
        variant="outlined"
        hide-details
        single-line></v-text-field>
    </template>

    <v-data-table :headers="headers" :items="pokemonsFilters" :search="search">
      <template v-slot:item.img="{ item }">
        <img :src="item.img" alt="Imagen de Pokémon" width="100" height="100" />
      </template>
    </v-data-table>
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
          { key: 'id', title: 'ID' },
          { key: 'name', title: 'Nombre' },
          { key: 'img', title: 'Imagen' },
          { key: 'types', title: 'Tipos' },
          { key: 'salud', title: 'Salud' },
          { key: 'ataque', title: 'Ataque' },
          { key: 'defensa', title: 'Defensa' },
          { key: 'velocidad', title: 'Velocidad' }


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
                salud: pokemonResponse.data.stats[0].base_stat,
                ataque: pokemonResponse.data.stats[1].base_stat,
                defensa: pokemonResponse.data.stats[2].base_stat,
                velocidad: pokemonResponse.data.stats[5].base_stat,
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

<style>
.custom-table .v-data-table__wrapper {
  overflow-x: auto;
}
</style>
