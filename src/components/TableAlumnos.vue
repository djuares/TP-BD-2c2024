<script>
import { reactive } from 'vue'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

export default {
  name: 'TableAlumnos',
  props: {
    dbType: String,
    color: String,
  },
  methods: {
    // CRUD operations
    // These methods should call different backend services
    // depending on the value of 'dbType'
    createAlumno() {
      console.log('createAlumno' + JSON.stringify(this.newAlumno))
      // check valid inputs in frontend before sending to backend
    },
    deleteAlumno(padron) {
      console.log('deleteAlumno ' + padron)
    },
    updateAlumno(padron, newData) {
      console.log('updateAlumno ' + padron + ' ' + JSON.stringify(newData))
    },
  },
  setup() {
    const route = useRoute()
    const crudAction = route.path.split('/')[1]

    // Data used for creating a new alumno
    const newAlumno = reactive({
      padron: '',
      nombre: '',
      apellido: '',
    })

    // Data for updating an existing alumno
    const isUpdating = ref(false)

    // This data should be fetched from the backend
    // if 'dbType' is 'PostgreSQL' then fetch from PostgreSQL
    // if 'dbType' is 'Redis' then fetch from Redis
    const alumnos = [
      { padron: 112233, nombre: 'Jose', apellido: 'Sanchez' },
      { padron: 112234, nombre: 'Rosa', apellido: 'Blanca' },
      { padron: 112235, nombre: 'Pepe', apellido: 'Argento' },
    ]

    return { crudAction, newAlumno, isUpdating, alumnos }
  },
}
</script>

<template>
  <div :class="`p-4 rounded bg-${color}-subtle`">
    <h2 class="text-center">{{ dbType }}</h2>
    <table :class="`table table-${color}`">
      <thead>
        <tr>
          <th scope="col">Padrón</th>
          <th scope="col">Nombre</th>
          <th scope="col">Apellido</th>
          <th v-if="crudAction === 'delete'" scope="col">Acción</th>
          <th v-if="crudAction === 'update'" scope="col">Acción</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="alumno in alumnos" :key="alumno.padron">
          <th scope="row">{{ alumno.padron }}</th>
          <td>{{ alumno.nombre }}</td>
          <td>{{ alumno.apellido }}</td>
          <td v-if="crudAction === 'delete'">
            <button
              @click="deleteAlumno(alumno.padron)"
              class="btn btn-danger d-flex align-items-center"
              style="height: 4vh"
            >
              <img
                class="img-fluid h-100"
                style="object-fit: cover"
                src="https://cdn3.iconfinder.com/data/icons/linecons-free-vector-icons-pack/32/trash-512.png"
                alt="Eliminar"
              />
            </button>
          </td>
          <td v-if="crudAction === 'update'">
            <!-- Start Editing Btn -->
            <button
              v-if="!isUpdating"
              @click="isUpdating = true"
              class="btn btn-info d-flex align-items-center"
              style="height: 4vh"
            >
              <img
                class="img-fluid h-100"
                style="object-fit: cover"
                src="https://www.svgrepo.com/show/73131/edit-button.svg"
                alt="Editar"
              />
            </button>
            <!-- Confirm or Cancel Btns -->
            <div v-else class="d-flex">
              <button
                @click="updateAlumno(alumno.padron, {})"
                class="btn btn-success d-flex justify-content-center align-items-center flex-grow-1"
                style="height: 4vh; position: relative"
              >
                <img
                  class="img-fluid"
                  style="object-fit: contain; max-height: 100%; max-width: 100%"
                  src="https://static-00.iconduck.com/assets.00/checkmark-icon-512x426-8re0u9li.png"
                  alt="Confirmar"
                />
              </button>
              <button
                class="btn btn-danger d-flex justify-content-center align-items-center flex-grow-1"
                style="height: 4vh"
              >
                <img
                  @click="isUpdating = false"
                  class="img-fluid"
                  style="object-fit: contain; max-height: 100%; max-width: 100%"
                  src="https://static-00.iconduck.com/assets.00/cancel-icon-2048x2048-milcunum.png"
                  alt="Cancelar"
                />
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="crudAction === 'create'">
      <div class="row mb-2">
        <div class="col-3">
          <input
            type="number"
            class="form-control"
            v-model="newAlumno.padron"
            placeholder="Padrón"
            aria-label="Padrón"
          />
        </div>
        <div class="col">
          <input
            type="text"
            class="form-control"
            v-model="newAlumno.nombre"
            placeholder="Nombre"
            aria-label="Nombre"
          />
        </div>
        <div class="col">
          <input
            type="text"
            class="form-control"
            v-model="newAlumno.apellido"
            placeholder="Apellido"
            aria-label="Apellido"
          />
        </div>
      </div>
      <button @click="createAlumno" class="btn btn-success">Crear</button>
    </div>
  </div>
</template>
