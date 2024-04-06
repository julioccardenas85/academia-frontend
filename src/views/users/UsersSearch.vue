<script setup lang="ts">
import header2 from "@/components/header2.vue";
import footer1 from "@/components/footer1.vue";
import { useRouter } from "vue-router";

import axios from "axios";
import { ref } from "vue";

const router = useRouter();

let headers = [
    {title: "ID", value:"idalumnos"},
    {title: "Usuario", value:"user"},
    {title: "Nombre", value:"nombre"}, 
    {title: "Apellidos", value:"apellidos"},
    {title: "Fecha de Nacimiento", value:"fechaNacimiento", align: 'center'},
    {title: "Numero Telefónico", value:"telefono", align: 'center'},
    {title: "Contacto", value:"contacto"},
    {title: "Teléfono de Contacto", value:"telefonoContacto", align: 'center'},
    {title: "Editar/Eliminar", value: 'actions', sortable: false, align: 'center'},
]

const items = ref([]);
const page = 1;

axios.get("https://localhost:7185/api/Alumno")
    .then(response => {
        items.value = response.data;
    })
    .catch(error => {
        console.error('Error al cargar datos:', error);
    });

const editItem = (item) => {
    router.push({ 
        name: 'editUser', 
        params: { 
          alumno: JSON.stringify(item)
        } 
      });
};

const deleteItem = (item) => {
    console.log(item);
};

</script>

<template>
    <div>
        <div class="container">
            <div class="header">
                <header2 :title="'Usuarios'"></header2>
            </div>
            <v-data-table :items="items" item-key="idalumnos" :headers="headers"  class="table elevation-5 custom-header" >
                <template v-slot:item.actions="{ item }">
                    <v-icon
                        class="me-2"
                        size="small"
                        icon="$edit"
                        @click="editItem(item)"
                    />
                    <v-icon
                        size="small"
                        icon="$delete"
                        @click="deleteItem(item)"
                    />
                </template>
            </v-data-table>
            <router-link to='/users/newUser' class="link">
                Nuevo Usuario
            </router-link>
            <div class="foot">
                <footer1></footer1>
            </div>
        </div>
    </div>
</template>

<style scoped>
.header{
    margin-bottom: 0;
    height: 268px;
}
</style>