<script setup>
import header2 from "@/components/header2.vue";
import footer1 from "@/components/footer1.vue";
import { useRoute, useRouter } from "vue-router";

import axios from "axios";
import { ref, reactive } from "vue";

const router = useRouter();
const grupos = ref([]);
const grupoElegido = ref('');
const grupoElegidoNombre = ref('');
const alumnosGrupo = ref([]);
const isLoading = ref(true);
const alumnosNoInscritos = ref([]);
const dialog = ref(false);
const dialogInscribir = ref(false);
const selectedAlumno = reactive({});
const route = useRoute();

const getParams = () => {
    if (route.params.grupo) {
        return JSON.parse(route.params.grupo);
    }
};

const idGrupo = getParams();

const setGroup = () => {
    if (idGrupo) {
        grupoElegido.value = idGrupo;
        handleGrupoChange(idGrupo);
    }
};

axios.get("https://localhost:7185/api/Grupo")
    .then(response => {
        grupos.value = response.data;
        setGroup();
    })
    .catch(error => {
        console.error('Error al cargar datos:', error);
    }).finally(() => {
        isLoading.value = false;
    });

const handleGrupoChange = (grupoId) => {
    isLoading.value = true;
    const grupo = grupos.value.$values.find(g => g.idgrupos === grupoId)
    if (grupo) {
        const { nombre } = grupo;
        grupoElegidoNombre.value = nombre;
    }
    axios.get("https://localhost:7185/api/Matricula/" + grupoId)
        .then(response => {
            alumnosGrupo.value = response.data.$values.map(alumno => ({
                title: alumno.nombreAlumno + " " + alumno.apellidos,
                value: alumno.idUsuarios,
                appendIcon: 'mdi-close',
                appendIconColor: 'red'
            }));
        })
        .catch(error => {
            console.error('Error al cargar datos:', error);
        }).finally(() => {
            isLoading.value = false;
        });
    axios.get("https://localhost:7185/api/Matricula/alumnosNoInscritos/" + grupoId)
        .then(response => {
            isLoading.value = true;
            alumnosNoInscritos.value = response.data.$values.map(alumno => ({
                title: alumno.nombreAlumno + " " + alumno.apellidos,
                value: alumno.idUsuarios,
                appendIcon: 'mdi-plus',
                appendIconColor: 'blue'
            }));
        })
        .catch(error => {
            console.error('Error al cargar datos:', error);
        }).finally(() => {
            isLoading.value = false;
        });
};

const openDialog = (alumno, accion) => {
    selectedAlumno.title = alumno.title;
    selectedAlumno.appendIcon = alumno.appendIcon;
    selectedAlumno.appendIconColor = alumno.appendIconColor;
    selectedAlumno.id = alumno.value;
    if (accion === "eliminar") {
        dialog.value = true;
    } else {
        dialogInscribir.value = true;
    }
};

const inscribirAlumno = async () => {
    isLoading.value = true;
    try {
        const response = await axios.post('https://localhost:7185/api/Matricula/inscribir', {
            idUsuario: selectedAlumno.id,
            idGrupo: grupoElegido.value
        });
        handleGrupoChange(grupoElegido.value);
        alert(response.data);
        dialogInscribir.value = false;
    } catch (error) {
        console.error('Error al inscribir alumno:', error);
        alert('Hubo un problema al inscribir al alumno. Por favor, verifica los datos.');
    } finally {
        isLoading.value = false;
    }
};

const eliminarAlumno = async () => {
    isLoading.value = true;
    try {
        const response = await axios.post('https://localhost:7185/api/Matricula/eliminar', {
            idUsuario: selectedAlumno.id,
            idGrupo: grupoElegido.value
        });
        handleGrupoChange(grupoElegido.value);
        alert(response.data);
        dialog.value = false;
    } catch (error) {
        console.error('Error al inscribir alumno:', error);
        alert('Hubo un problema al inscribir al alumno. Por favor, verifica los datos.');
    } finally {
        isLoading.value = false;
    }
};
</script>

<template>
    <div class="container">
        <div class="header">
            <header2 :title="'Gestionar Alumnos'"></header2>
        </div>

        <div class="body">
            <form @submit.prevent="submitForm" class="form-body">
                <label for="grupo" class="input-label">Grupo:</label>
                <v-select v-model="grupoElegido" :items="grupos.$values" label="Selecciona un grupo" item-title="nombre"
                    item-value="idgrupos" outlined class="select" @update:modelValue="handleGrupoChange"></v-select>

                <label for="inscritos" class="input-label" v-if="alumnosGrupo.length > 0">Alumnos inscritos:</label>

                <v-card class="mx-auto" width="310" v-if="alumnosGrupo.length > 0">
                    <v-list>
                        <v-list-item v-for="(alumno, index) in alumnosGrupo" :key="index">
                            <v-list-item-content>
                                <div style="display: flex; align-items: center; justify-content: space-between;">
                                    <v-list-item-title>{{ alumno.title }}</v-list-item-title>
                                    <v-icon :color="alumno.appendIconColor" class="ml-2"
                                        @click="openDialog(alumno, 'eliminar')">
                                        {{ alumno.appendIcon }}
                                    </v-icon>
                                </div>
                            </v-list-item-content>
                            <v-tooltip activator="parent" location="end">Eliminar del grupo</v-tooltip>
                        </v-list-item>
                    </v-list>

                    <!-- Dialog -->
                    <v-dialog v-model="dialog" max-width="400px">
                        <v-card>
                            <v-card-title>
                                Confirme Eliminar
                            </v-card-title>
                            <v-card-text>
                                <p>Confirme que desea eliminar al alumno
                                <div class="focus-text">{{ selectedAlumno.title }}</div> del grupo
                                <div class="focus-text">{{ grupoElegidoNombre }}</div>
                                </p>
                            </v-card-text>
                            <v-card-actions>
                                <v-btn color="primary" style="width: 40%;" text @click="dialog = false">Cancelar</v-btn>
                                <v-btn color="red" style="width: 40%;" text @click="eliminarAlumno()">Eliminar</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-card>

                <label for="no inscritos" class="input-label" v-if="alumnosNoInscritos.length > 0">Alumnos no
                    inscritos:</label>
                <v-card class="mx-auto" width="310" v-if="alumnosNoInscritos.length > 0">
                    <v-list>
                        <v-list-item v-for="(alumno, index) in alumnosNoInscritos" :key="index">
                            <v-list-item-content>
                                <div style="display: flex; align-items: center; justify-content: space-between;">
                                    <v-list-item-title>{{ alumno.title }}</v-list-item-title>
                                    <v-icon :color="alumno.appendIconColor" class="ml-2"
                                        @click="openDialog(alumno, 'inscribir')">
                                        {{ alumno.appendIcon }}</v-icon>
                                </div>
                            </v-list-item-content>
                            <v-tooltip activator="parent" location="end">Agregar al grupo</v-tooltip>
                        </v-list-item>
                    </v-list>

                    <!-- Dialog -->
                    <v-dialog v-model="dialogInscribir" max-width="400px">
                        <v-card>
                            <v-card-title>
                                Confirme Inscribir
                            </v-card-title>
                            <v-card-text>
                                <p>Confirme que desea inscribir al alumno
                                <div class="focus-text">{{ selectedAlumno.title }}</div> del grupo
                                <div class="focus-text">{{ grupoElegidoNombre }}</div>
                                </p>
                            </v-card-text>
                            <v-card-actions>
                                <v-btn color="primary" style="width: 40%;" text
                                    @click="dialogInscribir = false">Cancelar</v-btn>
                                <v-btn color="red" style="width: 40%;" text @click="inscribirAlumno()">Inscribir</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-card>

            </form>

        </div>

        <router-link to='/grupos/gruposSearch' class="link">
            Cancelar
        </router-link>

        <v-overlay :model-value="isLoading" class="align-center justify-center">
            <v-progress-circular color="primary" size="64" indeterminate></v-progress-circular>
        </v-overlay>
        <div class="foot">
            <footer1></footer1>
        </div>
    </div>


</template>

<style scoped>
.input-label {
    text-align: center;
    margin-top: 1rem;
}

.focus-text {
    font-weight: bold;
}

.body {
    margin-bottom: 1rem;
}
</style>