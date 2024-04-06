<script setup lang="ts">
    import header2 from "@/components/header2.vue"
    import footer1 from "@/components/footer1.vue";
    import { ref } from "vue";
    import { useRouter, useRoute } from 'vue-router';
    
    import axios from "axios";

    const router = useRouter();
    const route = useRoute();

    const getParams = () => {
        if(route.params.alumno){
            return JSON.parse(route.params.alumno);
        }
    };

    const setParams = () => {
        if(alumno){
            return ref({
                user: alumno.user,
                nombre: alumno.nombre,
                apellidos: alumno.apellidos,
                fechaNacimiento: alumno.fechaNacimiento,
                telefono: alumno.telefono,
                contacto: alumno.contacto,
                telefonoContacto: alumno.telefonoContacto
                });
        } else {
            return ref({
                user: '',
                nombre: '',
                apellidos: '',
                fechaNacimiento: '',
                telefono: '',
                contacto: '',
                telefonoContacto: ''
                });
        }
    };
     
    const alumno = getParams();
    const formData = setParams();

    const handleSave = () => {
        axios.post("https://localhost:7185/api/Alumno/", formData.value)
            .then(response => {
                console.log(response);
                router.push('/users/usersSearch');
            })
            .catch(error => {
                console.error(error);
            });
    };
</script>

<template>
    <div>
        <div class="container">
            <div class="header">
                <header2 :title="'Editar Usuario'" v-if="alumno"></header2>
                <header2 :title="'Nuevo Usuario'" v-else=></header2>
            </div>
            <div class="body">
                <form @submit.prevent="submitForm" class="body">
                    <label for="user" class="input-label">Usuario:</label>
                    <input type="text" id="user" v-model="formData.user" required >

                    <label for="nombre" class="input-label">Nombre:</label>
                    <input type="text" id="nombre" v-model="formData.nombre" required>
                    
                    <label for="apellidos" class="input-label">Apellidos:</label>
                    <input type="text" id="apellidos" v-model="formData.apellidos" required>

                    <label for="fechaNacimiento" class="input-label">Fecha de Nacimiento:</label>
                    <input type="date" id="fechaNacimiento" v-model="formData.fechaNacimiento" required>

                    <label for="telefono" class="input-label">Teléfono:</label>
                    <input type="text" id="telefono" v-model="formData.telefono" required>

                    <label for="contacto" class="input-label">Contacto:</label>
                    <input type="text" id="contacto" v-model="formData.contacto" required>

                    <label for="telefonoContacto" class="input-label">Teléfono de Contacto:</label>
                    <input type="text" id="telefonoContacto" v-model="formData.telefonoContacto" required>

                    <button type="submit" class="link" @click="handleSave">Guardar</button>
                    <router-link to='/users/usersSearch' class="link-gray">
                        Cancelar
                    </router-link>
                </form>
            </div>
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
.body{
    display: flex;
    flex-direction: column;
    align-items: center;
}
.link{
    margin-top: 25px;
}
.link-gray{
    margin-bottom: 25px;
}
.container{
    height: 100% !important;
}
</style>