<template>
  <div class="container">
    <div class="header">
      <header2 :title="'Editar Pago'" v-if="pago"></header2>
      <header2 :title="'Nuevo Pago en Línea'" v-else=></header2>
    </div>
    <div class="body">
      <form @submit.prevent="submitForm" class="form-body">
        <label for="producto" class="input-label">Selecciona un producto:</label>
        <select v-model="productoSeleccionado" id="producto" :onchange="crearPreferencia" class="select">
          <option :value="0">Seleccione un servicio</option>
          <option :value="1">Clase - $90</option>
          <option :value="2">Mensualidad - $500</option>
          <option :value="3">Inscripción - $500</option>
        </select>
        <div v-show="productoSeleccionado !== 0" id="wallet_container"></div>
      </form>
    </div>
    <div class="foot">
      <footer1></footer1>
    </div>
    <v-overlay :model-value="isLoading" class="align-center justify-center">
      <v-progress-circular color="primary" size="64" indeterminate></v-progress-circular>
    </v-overlay>
  </div>

</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import header2 from "@/components/header2.vue";
import footer1 from "@/components/footer1.vue";
const PUBLIC_KEY = 'APP_USR-19613993-33ef-4b0a-8c76-a092c07aff2d';
const preferenceId = ref(null);
const productoSeleccionado = ref(0);
let walletBrick = null;
const isLoading = ref(false);

const obtenerDatosProducto = (id) => {
  switch (id) {
    case 1:
      return { nombre: "Clase", precio: '90' };
    case 2:
      return { nombre: "Mensualidad", precio: '500' };
    case 3:
      return { nombre: "Inscripción", precio: '500' };
  }
};

const crearPreferencia = async () => {
  if (productoSeleccionado.value === 0) {
    await walletBrick.destroy();
    walletBrick = null;
    return;
  }

  try {
    isLoading.value = true;
    const producto = obtenerDatosProducto(productoSeleccionado.value);

    const response = await axios.post("https://localhost:7185/api/Preferencia/", {
      Email: "cliente@testuser.com",
      PhoneNumber: "3201234567",
      PersonType: "Cliente",
      IdentificationType: "CC",
      IdentificationNumber: "123456789",
      BanksList: "BBVA",
      TransactionAmount: producto.precio,
      Description: producto.nombre,
      ZipCode: "12345",
      StreetName: "Calle Principal",
      StreetNumber: "123",
      Neighborhood: "colonia",
      City: "Guadalajara",
      FederalUnit: "Jalisco",
      PhoneAreaCode: "57"
    });

    preferenceId.value = response.data.id;
    const mp = new window.MercadoPago(PUBLIC_KEY, { locale: "es-MX" });

    if (walletBrick) {
      await walletBrick.destroy();
      walletBrick = null;
    }

    walletBrick = await mp.bricks().create("wallet", "wallet_container", {
      initialization: {
        preferenceId: preferenceId.value,
      },
    });
  } catch (error) {
    console.error("Error obteniendo preferencia de pago:", error);
  } finally {
    isLoading.value = false;
  }
};

</script>

<style>
.wallet_container {
  max-width: 400px;
}
</style>