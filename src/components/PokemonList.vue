<template>
    <div>
      <div class="pokemon-layout">
        <div v-for="pokemon in paginatedPokemons" :key="pokemon.name" class="pokemon-card">
          <div class="imagen">
            <PokemonCarousel :imagenesPokemons="pokemon.imagenesPokemons" />
          </div>
          <h3 class="nombre">{{ pokemon.name }}</h3>
          <p class="id"><b>ID:</b> {{ pokemon.id }}</p>
          <p class="tipo"><b>Tipo: </b>{{ pokemon.types.join(', ') }}</p>
          <PokemonStats :pokemon="pokemon" />
          <img class="pokeIcon" src="https://th.bing.com/th/id/OIP.Caauk3ptnvXNENEytZ1vXQHaHa?rs=1&pid=ImgDetMain" alt="poke">
          <PokemonImg :pokemon="pokemon" />
        </div>
      </div>
      <div class="paginacion">
        <v-pagination
          v-model="currentPage"
          :length="totalPages"
          rounded="circle"
          :total-visible="10"
          next-icon="mdi-chevron-right"
          prev-icon="mdi-chevron-left"
          class="custom-pagination">
          <template v-slot:prev-label> {{ currentPage }} / {{ totalPages }} </template>
          <template v-slot:next-label> {{ currentPage }} / {{ totalPages }} </template>
        </v-pagination>
      </div>
    </div>
  </template>
  
  <script>
    import PokemonImg from './PokemonImg.vue';
    import PokemonCarousel from '/src/components/PokemonCarousel.vue';
    import PokemonStats from '/src/components/PokemonStats.vue';
  
    export default {
      components: {
        PokemonStats,
        PokemonCarousel,
        PokemonImg,
      },
      props: {
        pokemons: {
          type: Array,
          required: true,
        },
        filteredPokemons: {
          type: Array,
          required: true,
        },
      },
      data() {
        return {
          currentPage: 1, // Página actual
          itemsPerPage: 10, // Cantidad de Pokémon por página
        };
      },
      computed: {
        totalPages() {
          return Math.ceil(this.filteredPokemons.length / this.itemsPerPage);
        },
        paginatedPokemons() {
          const startIndex = (this.currentPage - 1) * this.itemsPerPage;
          const endIndex = startIndex + this.itemsPerPage;
          return this.filteredPokemons.slice(startIndex, endIndex);
        },
      },
      watch: {
        filteredPokemons() {
          // Reinicia la página actual a 1 cuando los Pokémon filtrados cambian
          this.currentPage = 1;
        },
      },
    };
  </script>
  
  <style>
  .pokemon-layout {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
    }
    .pokemon-card {
      background-color: white;
      border: 4px solid #ffcb05;
      padding: 15px;
      margin: 10px;
      width: 370px;
      height: 520px;
      border-radius: 10px;
      color: #000;
      text-align: center;
      /* Agregar sombreado al borde */
      box-shadow: 0 3px 15px rgba(0, 0, 1, 1);
      opacity: 1;
    }
  
    .imagen {
      border-radius: 10px;
    }
  
    img {
      background-image: url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRC7zBdc82XiS1wIVmKLgjC9JrbaFZomzP2Iiapce6_5g&s');
      background-size: cover;
      border-radius: 10px;
    }
  
    .pokeIcon{
      height: 25px;
      width: 25px;
      margin-top: 7px;
      
    }
  
    .nombre {
      color: #ff0505;
      text-shadow: -1px -1px 0 #007acc, 1px -1px 0 #007acc, -1px 1px 0 #007acc, 1px 1px 0 #007acc;
      font-size: 34px;
    }
  
    .id {
      font-size: 25px;
    }
  
    .tipo {
      font-size: 25px;
      padding-bottom: 9px;
    }
  
    .custom-pagination .v-pagination__item {
      color: #d3c500;
    }

    .paginacion{
      background-color: rgb(240, 108, 19);
    }


  </style>