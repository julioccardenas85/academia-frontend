<script setup>
import header2 from "@/components/header2.vue"
import footer1 from "@/components/footer1.vue";
import { computed, ref } from "vue";
import { useRouter, useRoute } from 'vue-router';

import axios from "axios";

const router = useRouter();
const route = useRoute();
const users = ref([]);
const error = ref("");
const isLoading = ref(false);
const now = new Date();
const fechaCreacion = now.toISOString();

const obtenerDatosProducto = (id) => {
    switch (id) {
        case 1:
            return { nombre: "Clase", precio: '90' };
        case 2:
            return { nombre: "Mensualidad", precio: '500' };
        case 3:
            return { nombre: "Inscripción", precio: '500' };
    }
};

const getParams = () => {
    if (route.params.pago) {
        return JSON.parse(route.params.pago);
    }
};

axios.get("https://localhost:7185/api/Usuario")
    .then(response => {
        users.value = response.data.$values;
    })
    .catch(error => {
        console.error('Error al cargar datos:', error);
    });

const setParams = () => {
    if (pago) {
        return ref({
            id: pago.id,
            concepto: pago.concepto,
            fechaCreacion: pago.fechaCreacion,
            idUsuarios: pago.idUsuarios,
            monto: pago.monto,
            unidades: pago.unidades
        });
    } else {
        return ref({
            concepto: '',
            fechaCreacion: fechaCreacion,
            idUsuarios: '',
            monto: '0',
            unidades: ''
        });
    }
};

const pago = getParams();
const formData = setParams();

const assignValues = (event) => {
    const id = parseInt(event.target.value);
    const producto = obtenerDatosProducto(id);

    if (producto) {
        formData.value.concepto = producto.nombre;
        formData.value.monto = producto.precio;
    }
};

const onMontoInput = (event) => {
    let value = event.target.value;

    value = value.replace(/[^0-9.]/g, '');

    const parts = value.split('.');
    if (parts.length > 2) {
        value = parts[0] + '.' + parts[1];
    }

    if (parts[1]) {
        parts[1] = parts[1].slice(0, 2);
        value = parts[0] + '.' + parts[1];
    }

    if (value.startsWith('00') && !value.startsWith('0.')) {
        value = value.replace(/^0+/, '0');
    }

    formData.value.monto = value || '0';
};

const getMontoDecimal = () => {
    return parseFloat(formData.value.monto) || 0;
};

const fechaFormateada = computed(() => {
    if (!formData.value.fechaCreacion) return '';
    return formData.value.fechaCreacion.split('T')[0];
});

const horaFormateada = computed(() => {
    if (!formData.value.fechaCreacion) return '';
    return formData.value.fechaCreacion.split('T')[1]?.substring(0, 5);
});

const handleSave = () => {
    isLoading.value = true;
    try {
        const pago = {
            ...formData.value,
            monto: getMontoDecimal()
        };
        axios.post("https://localhost:7185/api/Pago/", pago)
            .then(response => {
                router.push('/pagos/tablaPagos');
            })
            .catch(error => {
                console.error(error);
            });
    } catch (error) {
        console.error(error);
    } finally {
        isLoading.value = false;
    }
};

const handleSaveEdit = (pago, id) => {
    isLoading.value = true;
    try {
        axios.put("https://localhost:7185/api/Pago/" + id, pago)
            .then(response => {
                router.push('/pagos/tablaPagos');
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
            <header2 :title="'Editar Pago'" v-if="pago"></header2>
            <header2 :title="'Nuevo Pago'" v-else=></header2>
        </div>
        <div class="body">
            <form @submit.prevent="submitForm" class="form-body">
                <label for="id" class="input-label" v-if="pago">ID Transacción:</label>
                <input type="text" id="id" v-model="formData.id" required disabled v-if="pago">

                <label for="usuario" class="input-label">Usuario:</label>
                <v-select v-model="formData.idUsuarios" :items="users" label="Selecciona un usuario"
                    :item-title="user => `${user?.nombre ?? ''} ${user?.apellidos ?? ''}`.trim()"
                    item-value="idUsuarios" outlined class="select"></v-select>

                <label for="producto" class="input-label">Selecciona un producto:</label>
                <select id="producto" :onchange="assignValues" class="select">
                    <option :value="0">Seleccione un servicio</option>
                    <option :value="1">Clase - $90</option>
                    <option :value="2">Mensualidad - $500</option>
                    <option :value="3">Inscripción - $500</option>
                </select>

                <label class="input-label" v-if="pago">Fecha:</label>
                <input type="text" :value="fechaFormateada" disabled v-if="pago">

                <label class="input-label" v-if="pago">Hora:</label>
                <input type="text" :value="horaFormateada" disabled v-if="pago">

                <label for="monto" class="input-label">Monto:</label>
                <input type="text" id="monto" :value="formData.monto" @input="onMontoInput" required>

                <div v-if="error" class="error-alert">{{ error }}</div>

                <button v-if="pago" type="submit" class="link form-link"
                    @click="handleSaveEdit(formData, pago.id)">Guardar Cambios</button>
                <button v-else type="submit" class="link form-link" @click="handleSave">Guardar</button>

                <router-link to='/pagos/tablaPagos' class="link-gray">
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