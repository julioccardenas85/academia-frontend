<script setup>
import { ref,  watch } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  title: String
})
const router = useRouter();
const drawer = ref(false);
const group = ref(null);

const logout = () => {
  localStorage.removeItem("token");
  router.push("/");
};

const items = [
  {
    title: 'Inicio',
    value: 'inicio',
    link: '/moduleMenu',
    icon: 'mdi-home'
  },
  {
    title: 'Usuarios',
    value: 'usuarios',
    link: '/users/usersSearch',
    icon: 'mdi-account'
  },
  {
    title: 'Grupos',
    value: 'grupos',
    link: '/grupos/gruposSearch',
    icon: 'mdi-account-group'
  },
  {
    title: 'Agenda',
    value: 'agenda',
    link: '/agenda/agenda',
    icon: 'mdi-calendar-clock'
  },
  {
    title: 'Pagos',
    value: 'pagos',
    link: '/pagos/tablaPagos',
    icon: 'mdi-credit-card'
  },
  {
    title: "Cerrar Sesión",
    value: "logout",
    icon: "mdi-logout",
    action: logout,
  },
];

watch(group, () => {
  drawer.value = false;
});
</script>

<template>

  <div class="container-header">
    <div class="upper-icons">
      <v-icon icon="$menu" @click.stop="drawer = !drawer" />
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

  <v-layout>
    <v-navigation-drawer v-model="drawer" :location="$vuetify.display.mobile ? 'bottom' : undefined" temporary>
      <v-list>
        <v-list-item v-for="item in items" :key="item.value" :to="item.link" @click="item.action ? item.action() : null">
          <v-list-item-content class="nav-row">
            <v-icon class="me-2 text-primary" size="small" :icon="item.icon" />
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

    </v-navigation-drawer>
  </v-layout>
</template>

<style scoped>
#container {
  height: 268px;
  width: auto;
  margin-bottom: 0;
}

.upper-icons {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
}

.nav-row {
  display: flex;
  align-items: center;
}
</style>