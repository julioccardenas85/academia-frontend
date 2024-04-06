<script setup lang="ts">
  import footer1 from "@/components/footer1.vue";
</script>

<template>
    <router-view></router-view>
    <div>
      <div class="container" >
        <img class="item" id="header" src="src\assets\img\logoHorizontal.png">
        <p class="item" id="normalText">¡Hola usuario!</p>
        <h1 class="item">Mis academias</h1>
        <div class="item" id="circularPhoto">
          <img src="src\assets\img\danzmov.jpg">
        </div>
        <p id="normalText2">
          <router-link to="/moduleMenu">Danzmov</router-link>
        </p>
        <div class="foot">
          <footer1></footer1>
        </div>
      </div>
    </div>
  </template>
  

  
  <style scoped>

    #normalText {
      margin-left: auto;
      margin-right: auto;
    }
  





  </style>