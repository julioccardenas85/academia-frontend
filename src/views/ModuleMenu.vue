<script setup lang="ts">
  import footer1 from "@/components/footer1.vue";
</script>

<template>
  <div>
    <div class="container" >
      <img class="item" id="header" src="src\assets\img\logoHorizontal.png">
      <div class="container1">
        <div class="item2" id="circularPhoto">
          <img src="src\assets\img\danzmov.jpg">
        </div>
        <h1 class="item2">Danzmov</h1>
      </div>
      <div class="container2">
        <button2 class="item2">
          <router-link to='/users/usersSearch'>Usuarios</router-link>
        </button2>
        <button2 class="item2">Grupos</button2>
        <button2 class="item2">Horario</button2>
        <button2 class="item2">Pagos</button2>
        <button2 class="item2">Reportes</button2>
      </div>
      <div class="foot">
        <footer1></footer1>
      </div>
    </div>
  </div>
</template>

<style scoped>

/*this overrides the main css for this page*/
  .foot {
  margin-top: 40px;
  }
</style>