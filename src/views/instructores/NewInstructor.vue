<script setup lang="ts">
    import header2 from "@/components/header2.vue"
    import footer1 from "@/components/footer1.vue";
    import { ref } from "vue";
    import { useRouter, useRoute } from 'vue-router';
    
    import axios from "axios";

    const router = useRouter();
    const route = useRoute();

    const getParams = () => {
        if(route.params.instructor){
            return JSON.parse(route.params.instructor);
        }
    };

    const setParams = () => {
        if(instructor){
            return ref({
                idinstructores: instructor.idinstructores,
                usuario: instructor.usuario,
                nombre: instructor.nombre,
                apellidos: instructor.apellidos,
                fechaNacimiento: instructor.fechaNacimiento,
                telefono: instructor.telefono
                });
        } else {
            return ref({
                usuario: '',
                nombre: '',
                apellidos: '',
                fechaNacimiento: '',
                telefono: ''
                });
        }
    };
     
    const instructor = getParams();
    const formData = setParams();
    console.log(formData.value);

    const handleSave = () => {
        axios.post("https://localhost:7185/api/Instructor/", formData.value)
            .then(response => {
                console.log(response);
                router.push('/instructores/instructoresSearch');
            })
            .catch(error => {
                console.error(error);
            });
    };

    const handleSaveEdit = (instructor, id) => {
        console.log(instructor);
        axios.put("https://localhost:7185/api/Instructor/" + id, instructor)
        .then(response => {
            console.log(response);
                router.push('/instructores/instructoresSearch');
            })
            .catch(error => {
                console.error(error);
            });
    }
</script>

<template>
    <div>
        <div class="container">
            <div class="header">
                <header2 :title="'Editar Instructor'" v-if="instructor"></header2>
                <header2 :title="'Nuevo Instructor'" v-else=></header2>
            </div>
            <div class="body">
                <form @submit.prevent="submitForm" class="form-body">
                    <label for="user" class="input-label">Usuario:</label>
                    <input type="text" id="user" v-model="formData.usuario" required >

                    <label for="nombre" class="input-label">Nombre:</label>
                    <input type="text" id="nombre" v-model="formData.nombre" required>
                    
                    <label for="apellidos" class="input-label">Apellidos:</label>
                    <input type="text" id="apellidos" v-model="formData.apellidos" required>

                    <label for="fechaNacimiento" class="input-label">Fecha de Nacimiento:</label>
                    <input type="date" id="fechaNacimiento" v-model="formData.fechaNacimiento" required>

                    <label for="telefono" class="input-label">Teléfono:</label>
                    <input type="text" id="telefono" v-model="formData.telefono" required>

                    <button v-if="instructor" type="submit" class="link form-link" @click="handleSaveEdit(formData, instructor.idinstructores)">Guardar Cambios</button>
                    <button v-else type="submit" class="link form-link" @click="handleSave">Guardar</button>
                    <router-link to='/instructores/instructoresSearch' class="link-gray">
                        Cancelar
                    </router-link>
                </form>
            </div>
        </div>
    </div>
</template>