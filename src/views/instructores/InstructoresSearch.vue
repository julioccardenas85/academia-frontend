<script setup>
import header2 from "@/components/header2.vue";
import footer1 from "@/components/footer1.vue";
import { useRouter } from "vue-router";

import axios from "axios";
import { ref } from "vue";

const isLoading = ref(true);
const router = useRouter();

let headers = [
    { title: "ID", value: "idinstructores" },
    { title: "Usuario", value: "usuario" },
    { title: "Nombre", value: "nombre" },
    { title: "Apellidos", value: "apellidos" },
    { title: "Fecha de Nacimiento", value: "fechaNacimiento", align: 'center' },
    { title: "Numero Telefónico", value: "telefono", align: 'center' },
    { title: "Editar/Eliminar", value: 'actions', sortable: false, align: 'center' },
]

const search = ref('');

const items = ref([]);

axios.get("https://localhost:7185/api/Instructor")
    .then(response => {
        items.value = response.data;
    })
    .catch(error => {
        console.error('Error al cargar datos:', error);
    }).finally(() => {
        isLoading.value = false;
    });

const editItem = (item) => {
    router.push({
        name: 'editInstructor',
        params: {
            instructor: JSON.stringify(item)
        }
    });
};

const deleteItem = (item) => {
    isLoading.value = true;
    axios.delete("https://localhost:7185/api/Instructor/" + item.idinstructores)
        .then(response => {
            window.location.reload();
        })
        .catch(error => {
            console.error('Error al cargar datos:', error);
        }).finally(() => {
            isLoading.value = false;
        });
};

</script>

<template>
    <div class="container">
        <div class="header">
            <header2 :title="'Instructores'"></header2>
        </div>
        <v-container>

            <v-text-field v-model="search" label="Buscar" prepend-inner-icon="mdi-magnify" variant="underlined"
                hide-details single-line class="datatable-search-input"></v-text-field>

            <v-data-table :items="items" item-key="idalumnos" :headers="headers" class="elevation-5 vuetify-datatable"
                :search="search">
                <template v-slot:item.actions="{ item }">
                    <v-icon class="me-2 text-primary" size="small" icon="$edit" @click="editItem(item)" />
                    <v-icon size="small" icon="$delete" class="text-danger" @click="deleteItem(item)" />
                </template>
            </v-data-table>
        </v-container>
        <router-link to='/instructores/newInstructor' class="link">
            Nuevo Instructor
        </router-link>
        <div class="foot">
            <footer1></footer1>
        </div>
        <v-overlay :model-value="isLoading" class="align-center justify-center">
            <v-progress-circular color="primary" size="64" indeterminate></v-progress-circular>
        </v-overlay>
    </div>
</template>