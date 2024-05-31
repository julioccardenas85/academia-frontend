<script setup lang="ts">
  import footer1 from "@/components/footer1.vue";
  import header2 from "@/components/header2.vue";
</script>

<template>
  <div>
    <div class="container" >
      <div class="header">
                <header2 ></header2>
            </div>
      <div class="container2">
        <router-link to='/users/usersSearch' class="item2 link">Usuarios</router-link>
        <router-link to='/instructores/instructoresSearch' class="item2 link">Instructores</router-link>
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

</style>