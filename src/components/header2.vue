<script setup>
  const props = defineProps({
    title: String
  })
</script>

<template>
    
      <div class="container" >
        <img class="item" id="header" src="@\assets\img\logoHorizontal.png">
        
        <div class="container1">
          <div class="item2" id="circularPhoto">
            <img src="@\assets\img\danzmov.jpg">
          </div>

          <div class="container3">
            <h1 class="item3">Danzmov</h1>
            <p class="item4" id="normalText">{{ props.title }}</p>
          </div>
  
        </div>
      </div>
    
  </template>

<style scoped>
  #container {
    height: 268px;
    width: auto;
    margin-bottom: 0;
  }
</style>