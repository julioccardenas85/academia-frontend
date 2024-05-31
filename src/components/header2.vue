<script setup>
  const props = defineProps({
    title: String
  })
</script>

<template>
    
      <div class="container-header" >
        <div class="upper-icons">
          <v-icon icon="$menu" />
          <img class="header-logo" src="@\assets\img\logoHorizontal.png">
          <div class="footerButton" id="smallCircularPhoto">
          <img src="@/components/icons/no_user_photo.png">
        </div>
        </div>
        
        
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
  .upper-icons{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
  }
</style>