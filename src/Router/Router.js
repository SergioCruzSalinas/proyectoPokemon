import { createWebHistory, createRouter } from 'vue-router'

const routes = [
  { path: '/',
    name:'PokemonCartas',
   component: ()=>import('/src/components/Pokemoncards.vue'),
   },

  { path: '/PokemonTabla',
    name:'PokemonTabla',
     component: ()=>import('/src/components/PokemonTabla.vue'),
    }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router;