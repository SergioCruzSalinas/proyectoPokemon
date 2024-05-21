<template>
<Navegacion></Navegacion>

 
</template>

<script setup>
import Navegacion from './components/Navegacion.vue';

  //
</script>

<style>

body {
  margin: 0;
  font-family: Arial, sans-serif;
}

.contenedor {
  display: flex;
  flex-wrap: wrap; /* Permite que los elementos envuelvan si es necesario */
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem; /* Añade un padding para que no esté pegado al borde */
  background-color: #f8f9fa; /* Fondo claro para la cabecera */
}

.encabezado {
  flex: 1;
  display: flex;
  align-items: center;
}

ul {
  display: flex;
  align-items: center;
  padding: 0;
  margin: 0;
  list-style: none;
}

.icono {
  height: 100px;
  width: 100px;
  background-color: aliceblue;
}

.iconoFormato {
  margin-left: 3rem;
}

.titulo {
  color: #ffcb05;
  text-shadow: -1px -1px 0 #007acc, 1px -1px 0 #007acc, -1px 1px 0 #007acc, 1px 1px 0 #007acc;
  text-align: center;
  font-size: 40px;
  margin-left: 1rem;
}

.menu {
  flex: 1;
  display: flex;
  justify-content: center; /* Centra el menú horizontalmente */
}

.menu ul {
  display: flex;
  justify-content: center;
  margin: 0;
  padding: 0;
}

.menu li {
  display: inline;
  text-align: center;
  margin: 0 10px;
}

.fondo {
  margin-top: -65px;
  background-image: url("/src/img/imagen.png");
  background-size: cover; /* Ajusta la imagen para cubrir todo el fondo */
  background-repeat: no-repeat;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

</style>