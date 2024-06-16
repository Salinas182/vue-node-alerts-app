<script setup>
import getAlerts from '../api/alerts'
import getPriority from '../api/priority'
import { ref, watchEffect, computed } from 'vue'

const filters = ['name', 'priority']
const currentFilter = ref(filters[0])
const alerts = ref(null)
const priority = ref(null)
const sortedAlertsAlphabetically = ref([])
const sortedAlertsByPriority = ref([])

function sortAlertsByName(alertsObject) {
  const sortedArray = Object.entries(alertsObject).sort((a, b) => {
    if (a[1].title < b[1].title) return -1
    if (a[1].title > b[1].title) return 1
    return 0
  })
  return sortedArray
}

function sortAlertsByPriority(alertsObject, priorityObject) {
  const alertsArray = Object.entries(alertsObject)
  const sortedArray = alertsArray.sort((a, b) => {
    const priorityA = priorityObject[a[0]]
    const priorityB = priorityObject[b[0]]
    return priorityA - priorityB
  })
  return sortedArray
}

watchEffect(async () => {
  const alertsResponse = await getAlerts()
  alerts.value = alertsResponse[0]
  const priorityResponse = await getPriority()

  priority.value = priorityResponse.reduce((acc, item) => {
    const key = Object.keys(item)[0]
    acc[key] = item[key]
    return acc
  }, {})

  if (alerts.value) {
    sortedAlertsAlphabetically.value = sortAlertsByName(alerts.value)
    sortedAlertsByPriority.value = sortAlertsByPriority(alerts.value, priority.value)
  }
})

const displayedAlerts = computed(() => {
  if (currentFilter.value === 'name') {
    return sortedAlertsAlphabetically.value
  } 
  return sortedAlertsByPriority.value
})
</script>

<template>
  <main>
    <h1>Available Alerts</h1>
    <div>
      <template v-for="filter in filters" :key="filter">
        <input type="radio"
          :id="filter"
          :value="filter"
          name="filter"
          v-model="currentFilter">
        <label :for="filter">{{ filter }}</label>
      </template>
    </div>
    <br>
    <p>Filtered by {{ currentFilter }}:</p>
    <ul v-if="displayedAlerts.length">
      <li v-for="([alertKey, alert], index) in displayedAlerts" :key="index">
        <span class="title">{{ alert.title }}</span><br>
        <img :src="alert.image" :alt="alert.title" width="50" height="50">
      </li>
    </ul>
  </main>
</template>

<style scoped>
.title {
  font-weight: bold;
}
</style>
