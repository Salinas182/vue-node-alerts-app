<script setup>
import getAlerts from '../api/alerts'
import getPriority from '../api/priority'
import { ref, watchEffect } from 'vue'

const filters = ['name', 'priority']
const currentFilter = ref(filters[0])
const alerts = ref(null)
const priority = ref(null)

watchEffect(async () => {
  const alertsResponse = await getAlerts()
  alerts.value = alertsResponse[0]
  priority.value = await getPriority()
})
</script>

<template>
  <main>
    <h1>Available Alerts</h1>
    <template v-for="filter in filters" :key="filter">
    <input type="radio"
      :id="filter"
      :value="filter"
      name="filter"
      v-model="currentFilter">
    <label :for="filter">{{ filter }}</label>
  </template>
  <p>Filtered by {{ currentFilter }}:</p>
  <ul v-if="currentFilter === filters[0] && alerts">
    <li v-for="(alert, key) in Object.values(alerts)" :key="key">
      <span class="title">{{ alert.title }}</span><br>
      <img :src="alert.image" :alt="alert.title" width="50" height="50">
    </li>
  </ul>
  <ul v-else-if="currentFilter === filters[1]">
    <span>hola</span>
  </ul>
  </main>
</template>
