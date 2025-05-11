<script setup>
import header2 from "@/components/header2.vue";
import footer1 from "@/components/footer1.vue";
import { useRouter } from "vue-router";

import axios from "axios";
import { ref } from "vue";

const router = useRouter();

let headers = [
    { title: "ID", value: "idgrupos" },
    { title: "Clase", value: "nombre" },
    { title: "Instructor", value: "instructor" },
    { title: "Alumnos", value: "alumnos", sortable: false, align: 'center' },
    { title: "Editar/Eliminar", value: 'actions', sortable: false, align: 'center' },
]

const search = ref('');
const items = ref([]);
const dialog = ref(false);
const page = 1;
let alumnosGrupo = [];
let nombreGrupo = "";
let idGrupo = 0;
const isLoading = ref(true);

axios.get("https://localhost:7185/api/Grupo")
    .then(response => {
        items.value = response.data;
    })
    .catch(error => {
        console.error('Error al cargar datos:', error);
    }).finally(() => {
        isLoading.value = false;
    })

const editItem = (item) => {
    router.push({
        name: 'editGrupo',
        params: {
            grupo: JSON.stringify(item)
        }
    });
};

const gestionarAlumnos = (item) => {
    router.push({
        name: 'gestionarAlumnosGrupo',
        params: {
            grupo: JSON.stringify(item)
        }
    });
};

const deleteItem = (item) => {
    isLoading.value = true;
    axios.delete("https://localhost:7185/api/Grupo/" + item.idgrupos)
        .then(response => {
            window.location.reload();
        })
        .catch(error => {
            console.error('Error al cargar datos:', error);
        }).finally(() => {
            isLoading.value = false;
        });
};

const openAlumnos = (item) => {
    isLoading.value = true;
    axios.get("https://localhost:7185/api/Matricula/" + item.idgrupos)
        .then(response => {
            nombreGrupo = item.nombre;
            alumnosGrupo = response.data.$values;
            idGrupo = item.idgrupos;
            dialog.value = true;
        })
        .catch(error => {
            console.error('Error al cargar datos:', error);
        }).finally(() => {
            isLoading.value = false;
        });
};
</script>

<template>
    <div>
        <div class="container">
            <div class="header">
                <header2 :title="'Grupos'"></header2>
            </div>
            <v-container>

                <v-text-field v-model="search" label="Buscar" prepend-inner-icon="mdi-magnify" variant="underlined"
                    hide-details single-line class="datatable-search-input"></v-text-field>

                <v-data-table :items="items.$values" item-key="idgrupos" :headers="headers"
                    class="elevation-5 vuetify-datatable" :search="search">
                    <template v-slot:item.alumnos="{ item }" v-slot:activator="{ props: activatorProps }">
                        <v-icon class="me-2 text-primary" size="small" icon="mdi-magnify" @click="openAlumnos(item)" />
                    </template>

                    <template v-slot:item.actions="{ item }">
                        <v-icon class="me-2 text-primary" size="small" icon="$edit" @click="editItem(item)" />
                        <v-icon size="small" icon="$delete" class="text-danger" @click="deleteItem(item)" />
                    </template>
                </v-data-table>
            </v-container>
            <router-link to='/grupos/newGrupo' class="link">
                Nuevo Grupo
            </router-link>
            <router-link to='/grupos/gestionarAlumnos' class="link">
                Gestionar Alumnos
            </router-link>

            <v-dialog width="auto" scrollable v-model="dialog">
                <v-card prepend-icon="mdi-account-group" :title="nombreGrupo">
                    <v-divider class="mt-3"></v-divider>

                    <v-card-text class="px-4" style="max-height: 300px;">
                        <v-radio-group v-if="alumnosGrupo.length > 0" column>
                            <v-list lines="one">
                                <v-list-item v-for="alumno in alumnosGrupo" :key="alumno.idmatriculas"
                                    :title="alumno.nombreAlumno + ' ' + alumno.apellidos"></v-list-item>
                            </v-list>
                        </v-radio-group>
                        <v-card-text v-if="alumnosGrupo.length === 0">
                            No hay alumnos asociados a este grupo
                        </v-card-text>
                    </v-card-text>

                    <v-divider></v-divider>

                    <v-card-actions>
                        <v-btn text="Cerrar" @click="dialog = false" style="width: 45%;font-size: x-small;"></v-btn>

                        <v-spacer></v-spacer>

                        <v-btn color="surface-variant" variant="flat" @click="gestionarAlumnos(idGrupo)"
                            style="width: 45%;font-size: x-small;">Gestionar<br>
                            Alumnos</v-btn>
                    </v-card-actions>
                </v-card>

            </v-dialog>
            <div class="foot">
                <footer1></footer1>
            </div>

            <v-overlay :model-value="isLoading" class="align-center justify-center">
                <v-progress-circular color="primary" size="64" indeterminate></v-progress-circular>
            </v-overlay>
        </div>
    </div>
</template>