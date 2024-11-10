<script>
import TableAlumnos from '@/components/TableAlumnos.vue'

export default {
  components: {
    TableAlumnos,
  },
}
</script>

<template>
  <div class="container-fluid no-padding">
    <div class="row">
      <h1 class="text-center mb-4">Borrar</h1>
    </div>
    <div class="row">
      <div class="col"><TableAlumnos db-type="PostgreSQL" color="warning" /></div>
      <div class="col"><TableAlumnos db-type="Redis" color="danger" /></div>
    </div>
  </div>
</template>
