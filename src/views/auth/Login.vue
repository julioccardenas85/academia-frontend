<template>
  <div class="container">
    <header1></header1>
    <h1 class="item">Iniciar sesión</h1>
    <form @submit.prevent="login" class="login-form">
      <input class="item" v-model="email" type="text" placeholder="Correo electrónico" required  @input="error = ''">
      <input class="item" v-model="password" type="password" placeholder="Contraseña" required  @input="error = ''">
      <p v-if="error" class="alarm-text">{{ error }}</p>
      <button class="item link" type="submit">Ingresar</button>
    </form>
    <v-overlay :model-value="isLoading" class="align-center justify-center">
      <v-progress-circular color="primary" size="64" indeterminate></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import header1 from "../../components/header1.vue";

const email = ref("");
const password = ref("");
const error = ref("");
const isLoading = ref(false);
const login = async () => {
  try {
    isLoading.value = true;
    const response = await axios.post("https://localhost:7185/api/Auth/login", {
      email: email.value,
      password: password.value,
    }, { headers: { "Content-Type": "application/json" } });

    localStorage.setItem("token", response.data.token);
    window.location.href = "/moduleMenu";
  } catch (err) {
    error.value = "Usuario o contraseña incorrectos";
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
.login-form {
  display: flex;
  flex-direction: column;
  align-items: center; 
  width: 100%;
}
.register-text{
  font-style: italic;
  color: gray;
}
.alarm-text{
  font-style: italic;
  color: rgb(83, 2, 2);
}
</style>