<script setup lang="ts">
import header2 from "@/components/header2.vue";
import footer1 from "@/components/footer1.vue";
import { useRouter } from "vue-router";

import axios from "axios";
import { ref } from "vue";

const router = useRouter();

let headers = [
    {title: "ID", value:"idgrupos"},
    {title: "Clase", value:"nombre"}, 
    {title: "Instructor", value:"instructor"},
    {title: "Alumnos", value:"alumnos", sortable: false, align: 'center'},
    {title: "Editar/Eliminar", value: 'actions', sortable: false, align: 'center'},
]

const search = ref('');
const items = ref([]);
const dialog = ref(false);
const page = 1;

axios.get("https://localhost:7185/api/Grupo")
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

const openAlumnos = (item) => {
    dialog.value = true;
};

</script>

<template>
    <div>
        <div class="container">
            <div class="header">
                <header2 :title="'Grupos'"></header2>
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
                    <template v-slot:item.alumnos="{ item }" v-slot:activator="{ props: activatorProps }">
                        <v-icon
                            class="me-2 text-primary"
                            size="small"
                            icon="mdi-magnify"
                            @click="openAlumnos(item)"
                        />
                    </template>

                    <!-- @click="editItem(item)" -->

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

            <v-dialog
                width="auto"
                scrollable
                v-model="dialog"
                >
    

                
                    <v-card
                    prepend-icon="mdi-earth"
                    title="Select Country"
                    >
                    <v-divider class="mt-3"></v-divider>

                    <v-card-text class="px-4" style="height: 300px;">
                        <v-radio-group
                        messages="Select a Country from the radio group"
                        column
                        >
                        <!-- <v-radio
                            label="Bahamas, The"
                            value="bahamas"
                        ></v-radio>

                        <v-radio
                            label="Bahrain"
                            value="bahrain"
                        ></v-radio>

                        <v-radio
                            label="Bangladesh"
                            value="bangladesh"
                        ></v-radio>

                        <v-radio
                            label="Barbados"
                            value="barbados"
                        ></v-radio>

                        <v-radio
                            label="Belarus"
                            value="belarus"
                        ></v-radio>

                        <v-radio
                            label="Belgium"
                            value="belgium"
                        ></v-radio>

                        <v-radio
                            label="Belize"
                            value="belize"
                        ></v-radio>

                        <v-radio
                            label="Benin"
                            value="benin"
                        ></v-radio>

                        <v-radio
                            label="Bhutan"
                            value="bhutan"
                        ></v-radio>

                        <v-radio
                            label="Bolivia"
                            value="bolivia"
                        ></v-radio>

                        <v-radio
                            label="Bosnia and Herzegovina"
                            value="bosnia"
                        ></v-radio>

                        <v-radio
                            label="Botswana"
                            value="botswana"
                        ></v-radio>

                        <v-radio
                            label="Brazil"
                            value="brazil"
                        ></v-radio>

                        <v-radio
                            label="Brunei"
                            value="brunei"
                        ></v-radio>

                        <v-radio
                            label="Bulgaria"
                            value="bulgaria"
                        ></v-radio>

                        <v-radio
                            label="Burkina Faso"
                            value="burkina"
                        ></v-radio>

                        <v-radio
                            label="Burma"
                            value="burma"
                        ></v-radio>

                        <v-radio
                            label="Burundi"
                            value="burundi"
                        ></v-radio> -->

                        <v-list lines="one">
                            <v-list-item
                                v-for="n in 3"
                                :key="n"
                                :title="'Item ' + n"
                                subtitle="Lorem ipsum dolor sit amet consectetur adipisicing elit"
                            ></v-list-item>
                            </v-list>
                        </v-radio-group>
                    </v-card-text>

                    <v-divider></v-divider>

                    <v-card-actions>
                        <v-btn
                        text="Close"
                        @click="dialog = false"
                        ></v-btn>

                        <v-spacer></v-spacer>

                        <v-btn
                        color="surface-variant"
                        text="Save"
                        variant="flat"
                        @click="dialog = false"
                        ></v-btn>
                    </v-card-actions>
                    </v-card>
                
                </v-dialog>
        </div>
    </div>
</template>