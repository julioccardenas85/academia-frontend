<template>
    <div class="container">
      <div class="header">
        <header2 :title="'Pago rechazado'"></header2>
      </div>
      <div class="body">
        <div class="mensaje">
          <h2>Pago rechazado</h2>
          <p>Tu pago fue rechazado, revisa la información e intenta de nuevo.</p>
        </div>
      </div>
      <div class="foot">
        <footer1></footer1>
      </div>
    </div>
  </template>
  
  <script setup>
  import header2 from "@/components/header2.vue"
  import footer1 from "@/components/footer1.vue";
  </script>