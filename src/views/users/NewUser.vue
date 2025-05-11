<script setup>
import header2 from "@/components/header2.vue"
import footer1 from "@/components/footer1.vue";
import { ref } from "vue";
import { useRouter, useRoute } from 'vue-router';

import axios from "axios";

const router = useRouter();
const route = useRoute();
const roles = ref([]);
const error = ref("");
const isLoading = ref(true);

const getParams = () => {
    if (route.params.usuario) {
        return JSON.parse(route.params.usuario);
    }
};

axios.get("https://localhost:7185/api/Rol")
    .then(response => {
        roles.value = response.data.$values;
        if (usuario?.rol) {
            const rolEncontrado = roles.value.find(r => r.rol === usuario.rol);
            if (rolEncontrado) {
                formData.value.idRoles = rolEncontrado.idroles;
            }
        }
    })
    .catch(error => {
        console.error('Error al cargar datos:', error);
    }).finally(() => {
      isLoading.value = false;
    });

const setParams = () => {
    if (usuario) {
        return ref({
            idUsuarios: usuario.idUsuarios,
            email: usuario.email,
            nombre: usuario.nombre,
            apellidos: usuario.apellidos,
            fechaNacimiento: usuario.fechaNacimiento,
            telefono: usuario.telefono,
            contacto: usuario.contacto,
            telefonoContacto: usuario.telefonoContacto,
            idRoles: ''
        });
    } else {
        return ref({
            email: '',
            password: '',
            confirmPassword: '',
            nombre: '',
            apellidos: '',
            fechaNacimiento: '',
            telefono: '',
            contacto: '',
            telefonoContacto: '',
            idroles: ''
        });
    }
};

const usuario = getParams();
const formData = setParams();

const handleSave = () => {
    isLoading.value = true;
    try {
        if (formData.value.password === formData.value.confirmPassword) {
            axios.post("https://localhost:7185/api/Usuario/", formData.value)
                .then(response => {
                    router.push('/users/usersSearch');
                })
                .catch(error => {
                    console.error(error);
                });
        } else {
            error.value = "La contraseña no coincide"
        }
    } catch (error) {
        console.error(error);
    } finally {
        isLoading.value = false;
    }
};

const handleSaveEdit = (usuario, id) => {
    isLoading.value = true;
    try {
        axios.put("https://localhost:7185/api/Usuario/" + id, usuario)
            .then(response => {
                router.push('/users/usersSearch');
            })
            .catch(error => {
                console.error(error);
            });
    } catch (error) {
        console.error(error);
    } finally {
        isLoading.value = false;
    }
}

</script>

<template>
    <div class="container">
        <div class="header">
            <header2 :title="'Editar Usuario'" v-if="usuario"></header2>
            <header2 :title="'Nuevo Usuario'" v-else=></header2>
        </div>
        <div class="body">
            <form @submit.prevent="submitForm" class="form-body">
                <label for="nombre" class="input-label">Nombre:</label>
                <input type="text" id="nombre" v-model="formData.nombre" required>

                <label for="apellidos" class="input-label">Apellidos:</label>
                <input type="text" id="apellidos" v-model="formData.apellidos" required>

                <label for="fechaNacimiento" class="input-label">Fecha de Nacimiento:</label>
                <input type="date" id="fechaNacimiento" v-model="formData.fechaNacimiento" required>

                <label for="telefono" class="input-label">Teléfono:</label>
                <input type="text" id="telefono" v-model="formData.telefono" required>

                <label for="user" class="input-label">Email:</label>
                <input type="text" id="user" v-model="formData.email" required>

                <label for="contacto" class="input-label">Contacto:</label>
                <input type="text" id="contacto" v-model="formData.contacto" required>

                <label for="telefonoContacto" class="input-label">Teléfono de Contacto:</label>
                <input type="text" id="telefonoContacto" v-model="formData.telefonoContacto" required>

                <label for="rol" class="input-label">Rol:</label>
                <v-select v-model="formData.idRoles" :items="roles" label="Selecciona un rol" item-title="rol"
                    item-value="idroles" outlined class="select"></v-select>

                <label for="password" class="input-label" v-if="!usuario">Contraseña:</label>
                <input type="text" id="password" v-model="formData.password" required v-if="!usuario">

                <label for="confirmPassword" class="input-label" v-if="!usuario">Confirme la contraseña:</label>
                <input type="text" id="confirmPassword" v-model="formData.confirmPassword" required v-if="!usuario">

                <div v-if="error" class="error-alert">{{ error }}</div>

                <button v-if="usuario" type="submit" class="link form-link"
                    @click="handleSaveEdit(formData, usuario.idUsuarios)">Guardar Cambios</button>
                <button v-else type="submit" class="link form-link" @click="handleSave">Guardar</button>

                <router-link to='/users/usersSearch' class="link-gray">
                    Cancelar
                </router-link>
            </form>
        </div>
        <v-overlay :model-value="isLoading" class="align-center justify-center">
            <v-progress-circular color="primary" size="64" indeterminate></v-progress-circular>
        </v-overlay>
        <div class="foot">
            <footer1></footer1>
        </div>
    </div>
</template>