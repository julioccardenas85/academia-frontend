<template>
    <div class="footer">
      <div class="box">
        
          <img class="footerButton" src="@/components/icons/return.png" @click="$router.back()">
        
  
        <router-link to="/mainMenu">
          <img class="footerButton" src="@/components/icons/home.png">
        </router-link>
  
        <div class="footerButton" id="smallCircularPhoto">
          <img src="@/components/icons/no_user_photo.png">
        </div>
      </div>
    </div>
  </template>

<style scoped>
.footer {
  height: 92px;
  width: 100vw;
  background-color: #DDF1F4;

}
.box {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;

}
.footerButton {
  height: 50px;
  width: 50px;
  margin-top: 21px;
}

</style>