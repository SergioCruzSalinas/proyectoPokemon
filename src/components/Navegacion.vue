<template>
  <div class="contenedor">
    <div class="encabezado">
      <ul>
        <li class="iconoFormato">
          <img
            class="icono"
            src="https://i.etsystatic.com/33357979/r/il/e1dfcd/3584257734/il_fullxfull.3584257734_bfy9.jpg"
            alt="pokebola" />
        </li>
        <li class="titulo"><h1>Pokémon</h1></li>
      </ul>
    </div>
    <nav class="menu">
      <ul>
        <li ><RouterLink to="/">Cartas Pokémon</RouterLink></li>
        <li><RouterLink to="/PokemonTabla">Pokémon Tablas</RouterLink></li>
      </ul>
    </nav>
  </div>

  <RouterView />
</template>

<style scoped>
  RouterLink{
    font-size: 100px;
  }
</style>
