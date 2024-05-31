<script setup lang="ts">
import header2 from "@/components/header2.vue";
import footer1 from "@/components/footer1.vue";
import { useRouter } from "vue-router";

import axios from "axios";
import { ref } from "vue";

const router = useRouter();

let headers = [
    {title: "ID", value:"idinstructores"},
    {title: "Usuario", value:"usuario"},
    {title: "Nombre", value:"nombre"}, 
    {title: "Apellidos", value:"apellidos"},
    {title: "Fecha de Nacimiento", value:"fechaNacimiento", align: 'center'},
    {title: "Numero Telefónico", value:"telefono", align: 'center'},
    {title: "Editar/Eliminar", value: 'actions', sortable: false, align: 'center'},
]

const search = ref('');

const items = ref([]);
const page = 1;

axios.get("https://localhost:7185/api/Instructor")
    .then(response => {
        items.value = response.data;
        console.log(items);
    })
    .catch(error => {
        console.error('Error al cargar datos:', error);
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
    console.log(item.idinstructores);
    axios.delete("https://localhost:7185/api/Instructor/" + item.idinstructores)
    .then(response => {
        console.log(response);
        window.location.reload();
    })
    .catch(error => {
        console.error('Error al cargar datos:', error);
    });
};

</script>

<template>
    <div>
        <div class="container">
            <div class="header">
                <header2 :title="'Instructores'"></header2>
            </div>
            <v-container>
            
                <v-text-field
                    v-model="search"
                    label="Buscar"
                    prepend-inner-icon="mdi-magnify"
                    variant="underlined"
                    hide-details
                    single-line
                    class="datatable-search-input"
                ></v-text-field>
            
                <v-data-table :items="items" item-key="idalumnos" :headers="headers"  class="elevation-5 vuetify-datatable" :search="search">
                    <template v-slot:item.actions="{ item }">
                        <v-icon
                            class="me-2 text-primary"
                            size="small"
                            icon="$edit"
                            @click="editItem(item)"
                        />
                        <v-icon
                            size="small"
                            icon="$delete"
                            class="text-danger"
                            @click="deleteItem(item)"
                        />
                    </template>
                </v-data-table>
            </v-container>
            <router-link to='/instructores/newInstructor' class="link">
                Nuevo Instructor
            </router-link>
        </div>
    </div>
</template>