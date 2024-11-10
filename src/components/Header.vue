<script>
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'

export default {
  name: 'Header',
  setup() {
    const route = useRoute()

    // A function to check if the current route matches the link's target route
    const isActive = (targetRoute) => {
      return route.path === targetRoute
    }

    return { isActive }
  },
}
</script>

<template>
  <header class="d-flex justify-content-center py-3">
    <ul class="nav nav-pills">
      <li class="nav-item">
        <RouterLink to="/read" :class="['nav-link', { active: isActive('/read') }]">
          Leer
        </RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink
          to="/create"
          :class="['nav-link', { active: isActive('/create') }]"
          aria-current="page"
        >
          Crear
        </RouterLink>
      </li>

      <li class="nav-item">
        <RouterLink to="/update" :class="['nav-link', { active: isActive('/update') }]">
          Actualizar
        </RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink to="/delete" :class="['nav-link', { active: isActive('/delete') }]">
          Eliminar
        </RouterLink>
      </li>
    </ul>
  </header>
</template>
