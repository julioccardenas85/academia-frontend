<script setup>
import header2 from "@/components/header2.vue";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { computed, ref } from "vue";
import axios from "axios";

const items = ref([]);
const dialog = ref(false);
const editDialog = ref(false);
const formData = ref([]);
const formDataEdit = ref([]);
const isLoading = ref(true);

axios.get("https://localhost:7185/api/Agenda")
  .then(response => {
    items.value = response.data.$values.map(event => ({
      title: event.title,
      start: event.start,
      end: event.end,
      color: event.color || "#0000ff",
      allDay: event.allDay === 1,
      idAgenda: event.idAgenda,
    }));
  })
  .catch(error => {
    console.error("Error al cargar datos:", error);
  }).finally(() => {
    isLoading.value = false;
  });

const calendarOptions = computed(() => ({
  plugins: [dayGridPlugin, interactionPlugin],
  initialView: "dayGridMonth",
  events: items.value,
  eventClick: handleEventClick,
}));

const handleSave = () => {
  isLoading.value = true;
  const agendum = {
    ...formData.value,
    allDay: formData.value.allDay ? 1 : 0,
  };

  if (agendum.allDay && agendum.end === "") {
    agendum.end = null;
  }
  
  axios.post("https://localhost:7185/api/Agenda/",
  agendum,
    { headers: { "Content-Type": "application/json" } })
    .then(response => {
      window.location.reload();
    })
    .catch(error => {
      console.error(error);
    }).finally(() => {
      isLoading.value = false;
    });
};

const handleEventClick = (info) => {
  formDataEdit.value = {
    Title: info.event.title || "",
    start: info.event.start ? info.event.start.toISOString().slice(0, 16) : "",
    end: info.event.end ? info.event.end.toISOString().slice(0, 16) : "",
    allDay: info.event.allDay || false,
    Color: info.event.backgroundColor || "#0000ff",
    idAgenda: info.event.extendedProps.idAgenda || null,
  };
  editDialog.value = true;
};

const handleNewEventClick = () => {
  formData.value.title = '';
  formData.value.start = '';
  formData.value.end = '';
  formData.value.allDay = false;
  formData.value.color = '#0000ff';
  dialog.value = true;
};

const handleSaveEdit = (evento) => {
  isLoading.value = true;
  const agendumEditado = {
    ...evento,
    allDay: evento.allDay ? 1 : 0,
  };

  if (agendumEditado.allDay && agendumEditado.end === "") {
    agendumEditado.end = null;
  }

  axios.put(
    `https://localhost:7185/api/Agenda/${formDataEdit.value.idAgenda}`,
    agendumEditado,
    { headers: { "Content-Type": "application/json" } }
  )
    .then(response => {
      window.location.reload();
    })
    .catch(error => {
      console.error(error.response?.data || error.message);
    }).finally(() => {
      isLoading.value = false;
    });
};

const handleDelete = (id) => {
  isLoading.value = true;
  axios.delete("https://localhost:7185/api/Agenda/" + id)
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
      <header2 :title="'Agenda'" />
    </div>
    <div class="body">
      <button class="link" @click="handleNewEventClick">
        Nuevo evento
      </button>

      <!-- Componente FullCalendar -->
      <div class="fullcalendar">
        <FullCalendar :options="calendarOptions" />
      </div>
    </div>

    <!-- Componente nuevo evento -->
    <v-dialog width="auto" scrollable v-model="dialog">

      <v-card prepend-icon="mdi-account-group" title="Nuevo evento">
        <v-divider class="mt-3"></v-divider>

        <v-card-text class="px-4" style="max-height: 300px;">
          <form @submit.prevent="submitForm" class="form-body">
            <label for="title" class="input-label">Evento:</label>
            <input type="text" id="title" v-model="formData.title" required>

            <label for="start" class="input-label">Inicio:</label>
            <input type="datetime-local" id="start" v-model="formData.start" required>

            <label for="end" class="input-label">Fin:</label>
            <input type="datetime-local" id="end" v-model="formData.end" required :disabled="formData.allDay">
            <div class="bottom">
              <div class="input-box">
                <label for="allDay" class="input-label">Todo el día:</label>
                <input type="checkbox" id="allDay" v-model="formData.allDay" required>
              </div>
              <div class="input-box">
                <label for="color" class="input-label">Color:</label>
                <input type="color" id="color" v-model="formData.color" required>
              </div>
            </div>
          </form>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn text="Cerrar" @click="dialog = false"
            style="width: 45%;font-size: x-small;border: 1px solid #808080;"></v-btn>

          <v-spacer></v-spacer>

          <v-btn color="surface-variant" variant="flat" @click="handleSave"
            style="width: 45%;font-size: x-small;">Agendar
          </v-btn>
        </v-card-actions>
      </v-card>

    </v-dialog>

    <!-- Componente editar evento -->
    <v-dialog width="auto" scrollable v-model="editDialog">

      <v-card prepend-icon="mdi-account-group" title="Editar evento">
        <v-divider class="mt-3"></v-divider>

        <v-card-text class="px-4" style="max-height: 300px;">

          <form @submit.prevent="submitForm" class="form-body">
            <label for="title" class="input-label">Evento:</label>
            <input type="text" id="title" v-model="formDataEdit.Title" required>

            <label for="start" class="input-label">Inicio:</label>
            <input type="datetime-local" id="start" v-model="formDataEdit.start" required>

            <label for="end" class="input-label">Fin:</label>
            <input type="datetime-local" id="end" v-model="formDataEdit.end" required :disabled="formData.allDay">
            <div class="bottom">
              <div class="input-box">
                <label for="allDay" class="input-label">Todo el día:</label>
                <input type="checkbox" id="allDay" v-model="formDataEdit.allDay" required>
              </div>
              <div class="input-box">
                <label for="color" class="input-label">Color:</label>
                <input type="color" id="color" v-model="formDataEdit.Color" required>
              </div>
            </div>

          </form>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn @click="editDialog = false"
            style="width: 32%;font-size: x-small;border: 1px solid #808080;">Cancelar</v-btn>

          <v-spacer></v-spacer>

          <v-btn color="blue" variant="flat" @click="handleSaveEdit(formDataEdit)"
            style="width: 32%;font-size: x-small;">Guardar cambios
          </v-btn>

          <v-spacer></v-spacer>

          <v-btn color="red" variant="flat" @click="handleDelete(formDataEdit.idAgenda)"
            style="width: 32%;font-size: x-small;">Eliminar evento
          </v-btn>
        </v-card-actions>
      </v-card>

    </v-dialog>

    <v-overlay :model-value="isLoading" class="align-center justify-center">
      <v-progress-circular color="primary" size="64" indeterminate></v-progress-circular>
    </v-overlay>
  </div>
</template>

<style scoped>
.fullcalendar {
  margin: 0 auto;
  padding: 10px;
  max-width: 90%;
}

.link {
  margin: 0 auto;
  display: block;
}

#allDay {
  height: 1rem;
  width: 1rem;
}

#color {
  height: 1rem;
  width: 1rem;
}

.bottom {
  display: flex;
  flex-direction: row;
  gap: 5rem;
}

.input-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
}
</style>