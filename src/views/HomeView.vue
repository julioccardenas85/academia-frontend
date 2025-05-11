<script setup>
import header1 from '../components/header1.vue'
</script>

<template>
  <title>Inicia sesión</title>
  <div>
    <div class="container">
      <header1></header1>
      <h1 class="item">Iniciar sesión</h1>
      <input class="item" type="email" id="email" placeholder="Correo electrónico">
      <input class="item" type="password" placeholder="Contraseña">
      <p class="item" id="link">Regístrate</p>
      <button class="item">
        <router-link to="/mainMenu">Continuar</router-link>
      </button>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
}
.item {
  margin-left: auto;
  margin-right: auto;
  margin-top: 40px;
}
</style>