<script setup lang="ts">
  import footer1 from "../../components/footer1.vue";
</script>

<template>
    <div>
      <div class="container" >
        <img class="item" id="header" src="@\assets\img\logoHorizontal.png">
        <div class="container1">
          <div class="item2" id="circularPhoto">
            <img src="@\assets\img\danzmov.jpg">
          </div>
          <div class="container3">
            <h1 class="item3">Danzmov</h1>
            <p class="item4" id="normalText">Usuarios</p>
          </div>
  
        </div>
        <div class="container2">
          <button2 class="item2">Búsqueda</button2>
          <button2 class="item2">Alta</button2>
        </div>
        <div class="foot">
          <footer1></footer1>
        </div>
      </div>
    </div>
  </template>

<style>
  .container3{
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .item3 {
  margin-top: 50px;
  margin-bottom: 0px;
}
</style>