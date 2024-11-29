<script>
import { reactive, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

export default {
  name: 'TableAlumnosSQL',
  props: {
    dbType: String,
    color: String,
  },
  methods: {
    // Crear un nuevo alumno
    async createAlumno() {
      try {
        const response = await axios.post('http://localhost:3001/api/sql/alumnos', this.newAlumno)
        this.alumnos.push(response.data)
        this.resetNewAlumno()
      } catch (error) {
        console.error('Error al crear alumno:', error.message)
      }
    },

    // Eliminar un alumno
    async deleteAlumno(padron) {
      try {
        await axios.delete(`http://localhost:3001/api/sql/alumnos/${padron}`)
        this.alumnos = this.alumnos.filter((alumno) => alumno.padron !== padron)
      } catch (error) {
        console.error('Error al eliminar alumno:', error.message)
      }
    },

    // Actualizar un alumno
    async updateAlumno(padron) {
      try {
        const editedAlumno = this.editedRows[padron] // Obtener datos editados
        const response = await axios.put(
          `http://localhost:3001/api/sql/alumnos/${padron}`,
          editedAlumno
        )
        const index = this.alumnos.findIndex((alumno) => alumno.padron === padron)
        if (index !== -1) {
          this.alumnos[index] = response.data
        }
        this.cancelEdit(padron) // Finalizar edición
      } catch (error) {
        console.error('Error al actualizar alumno:', error.message)
      }
    },

    // Activar edición para un alumno
    startEdit(alumno) {
      this.editedRows[alumno.padron] = { ...alumno } // Crear copia editable
      this.isEditing[alumno.padron] = true // Activar edición
    },

    // Cancelar edición
    cancelEdit(padron) {
      delete this.editedRows[padron] // Eliminar datos editados
      this.isEditing[padron] = false // Desactivar edición
    },

    // Resetear el formulario de creación
    resetNewAlumno() {
      this.newAlumno.padron = ''
      this.newAlumno.nombre = ''
      this.newAlumno.apellido = ''
    },
  },
  setup() {
    const route = useRoute()
    const crudAction = route.path.split('/')[1]

    const newAlumno = reactive({
      padron: '',
      nombre: '',
      apellido: '',
    })

    const isEditing = reactive({}) // Estado de edición por alumno
    const editedRows = reactive({}) // Almacena datos editados temporalmente
    const alumnos = ref([])

    onMounted(async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/sql/alumnos')
        alumnos.value = response.data
      } catch (error) {
        console.error('Error al obtener los alumnos:', error.message)
      }
    })

    return { crudAction, newAlumno, isEditing, editedRows, alumnos }
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
          <th v-if="crudAction === 'update'" scope="col">Acción</th>
          <th v-if="crudAction === 'delete'" scope="col">Acción</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="alumno in alumnos" :key="alumno.padron">
          <template v-if="isEditing[alumno.padron]">
            <!-- Fila en modo edición -->
            <td>{{ alumno.padron }}</td>
            <td><input v-model="editedRows[alumno.padron].nombre" class="form-control" /></td>
            <td><input v-model="editedRows[alumno.padron].apellido" class="form-control" /></td>
            <td>
              <button @click="updateAlumno(alumno.padron)" class="btn btn-success">Guardar</button>
              <button @click="cancelEdit(alumno.padron)" class="btn btn-danger">Cancelar</button>
            </td>
          </template>
          <template v-else>
            <!-- Fila normal -->
            <td>{{ alumno.padron }}</td>
            <td>{{ alumno.nombre }}</td>
            <td>{{ alumno.apellido }}</td>
            <td v-if="crudAction === 'update'">
              <button @click="startEdit(alumno)" class="btn btn-info">Editar</button>
            </td>
            <td v-if="crudAction === 'delete'">
              <button @click="deleteAlumno(alumno.padron)" class="btn btn-danger">Eliminar</button>
            </td>
          </template>
        </tr>
      </tbody>
    </table>

    <!-- Formulario para Crear -->
    <div v-if="crudAction === 'create'">
      <div class="row mb-2">
        <div class="col-3">
          <input
            type="number"
            class="form-control"
            v-model="newAlumno.padron"
            placeholder="Padrón"
          />
        </div>
        <div class="col">
          <input type="text" class="form-control" v-model="newAlumno.nombre" placeholder="Nombre" />
        </div>
        <div class="col">
          <input
            type="text"
            class="form-control"
            v-model="newAlumno.apellido"
            placeholder="Apellido"
          />
        </div>
      </div>
      <button @click="createAlumno" class="btn btn-success">Crear</button>
    </div>
  </div>
</template>
