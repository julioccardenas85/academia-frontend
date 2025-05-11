<script setup>
import header2 from "@/components/header2.vue";
import footer1 from "@/components/footer1.vue";
import { ref } from "vue";
import { useRouter, useRoute } from 'vue-router';

import axios from "axios";

const router = useRouter();
const route = useRoute();
const instructores = ref([]);
const instructoresConNombreCompleto = ref([]);
const isLoading = ref(true);

const getParams = () => {
    if (route.params.grupo) {
        return JSON.parse(route.params.grupo);
    }
};

const setParams = (grupo) => {
    if (grupo) {
        return ref({
            idgrupos: grupo.idgrupos,
            nombre: grupo.nombre,
            idInstructores: grupo.idInstructores
        });
    } else {
        return ref({
            nombre: '',
            idInstructores: ''
        });
    }
};

const grupo = getParams();
const formData = setParams(grupo);

const handleSave = () => {
    axios.post("https://localhost:7185/api/Grupo/", formData.value)
        .then(response => {
            router.push('/grupos/gruposSearch');
        })
        .catch(error => {
            console.error(error);
        }).finally(() => {
            isLoading.value = false;
        });
};

const handleSaveEdit = (body, id) => {
    isLoading.value = true;
    axios.put("https://localhost:7185/api/Grupo/" + id, body)
        .then(response => {
            router.push('/grupos/gruposSearch');
        })
        .catch(error => {
            console.error(error);
        }).finally(() => {
            isLoading.value = false;
        });
}

axios.get("https://localhost:7185/api/Usuario/instructores")
    .then(response => {
        instructores.value = response.data;

        instructoresConNombreCompleto.value = instructores.value.$values.map(instructor => ({
            idInstructores: instructor.idUsuarios,
            nombreCompleto: `${instructor.nombre} ${instructor.apellidos}`
        }));

        instructoresConNombreCompleto.value
    })
    .catch(error => {
        console.error('Error al cargar datos:', error);
    }).finally(() => {
        isLoading.value = false;
    });
</script>

<template>

    <div class="container">
        <div class="header">
            <header2 :title="'Editar Grupo'" v-if="grupo"></header2>
            <header2 :title="'Nuevo Grupo'" v-else=></header2>
        </div>
        <div class="body">
            <form @submit.prevent="submitForm" class="form-body">
                <label for="nombre" class="input-label">Nombre del grupo:</label>
                <input type="text" id="nombre" v-model="formData.nombre" required>

                <label for="instructor" class="input-label">Instructor:</label>
                <v-select v-model="formData.idInstructores" :items="instructoresConNombreCompleto"
                    label="Selecciona un instructor" item-title="nombreCompleto" item-value="idInstructores" outlined
                    class="select"></v-select>

                <button v-if="grupo" type="submit" class="link form-link"
                    @click="handleSaveEdit(formData, grupo.idgrupos)">Guardar
                    Cambios</button>
                <button v-else type="submit" class="link form-link" @click="handleSave">Guardar</button>
                <router-link to='/grupos/gruposSearch' class="link-gray">
                    Cancelar
                </router-link>
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