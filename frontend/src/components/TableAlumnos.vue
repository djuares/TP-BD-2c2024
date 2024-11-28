<script>
import { reactive, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios' // Asegúrate de importar axios

export default {
  name: 'TableAlumnos',
  props: {
    dbType: String,
    color: String,
  },
  methods: {
    // Crear un nuevo alumno
    async createAlumno() {
      try {
        // Hacemos la solicitud POST a la API
        const response = await axios.post('http://localhost:3001/api/alumnos', this.newAlumno)
        console.log('Alumno creado:', response.data)
        this.alumnos.push(response.data)
      } catch (error) {
        console.error('Error al crear alumno:', error.message)
      }
    },

    // Eliminar un alumno
    async deleteAlumno(padron) {
      try {
        // Hacemos la solicitud DELETE a la API
        const response = await axios.delete(`http://localhost:3001/api/alumnos/${padron}`)
        console.log('Alumno eliminado:', response.data)
        // Opcional: eliminar el alumno de la lista local
        this.alumnos = this.alumnos.filter((alumno) => alumno.padron !== padron)
      } catch (error) {
        console.error('Error al eliminar alumno:', error.message)
      }
    },

    // Actualizar un alumno
    async updateAlumno(padron, newData) {
      try {
        // Hacemos la solicitud PUT a la API
        const response = await axios.put(`http://localhost:3001/api/alumnos/${padron}`, newData)
        console.log('Alumno actualizado:', response.data)
        // Opcional: actualizar el alumno en la lista local
        const index = this.alumnos.findIndex((alumno) => alumno.padron === padron)
        if (index !== -1) {
          this.alumnos[index] = response.data
        }
      } catch (error) {
        console.error('Error al actualizar alumno:', error.message)
      }
    },
  },
  setup() {
    const route = useRoute()
    const crudAction = route.path.split('/')[1]

    // Data usada para crear un nuevo alumno
    const newAlumno = reactive({
      padron: '',
      nombre: '',
      apellido: '',
    })

    // Data para actualizar un alumno existente
    const isUpdating = ref(false)

    // Lista de alumnos que se llenará con los datos del backend
    const alumnos = ref([])

    // Esta función se llama cuando el componente se monta (cuando se carga)
    onMounted(async () => {
      try {
        // Hacemos la solicitud GET para obtener todos los alumnos
        const response = await axios.get('http://localhost:3001/api/alumnos')
        alumnos.value = response.data // Asignamos los datos obtenidos a la lista 'alumnos'
      } catch (error) {
        console.error('Error al obtener los alumnos:', error.message)
      }
    })

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
