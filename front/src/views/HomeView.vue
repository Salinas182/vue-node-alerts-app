<script setup>
import { ref, watchEffect, computed } from 'vue'
import { useStore } from 'vuex'
import { sortAlertsByName, sortAlertsByPriority } from '../utils'

const store = useStore()
const updatedAlerts = computed(() => store.getters.getAllAlerts)
const priority = computed(() => store.getters.getPriority)
const filters = ['name', 'priority']
const currentFilter = ref(filters[0])
const sortedAlertsByName = computed(() => {
  if (updatedAlerts?.value) {
    return sortAlertsByName(updatedAlerts.value)
  }
  return []
});
const sortedAlertsByPriority = computed(() => {
  if (updatedAlerts?.value && priority?.value) {
    return sortAlertsByPriority(updatedAlerts.value, priority.value)
  }
  return []
});

watchEffect(async () => {
  store.dispatch('fetchAlerts')
  store.dispatch('fetchPriority')
})

const displayedAlerts = computed(() => {
  if (currentFilter.value === 'name') {
    return sortedAlertsByName.value
  } 
  return sortedAlertsByPriority.value
})
</script>

<template>
  <main>
    <h1>Listed Alerts</h1>
    <div>
      <span>Sort by: </span>
      <template v-for="filter in filters" :key="filter">
        <input type="radio"
          :id="filter"
          :value="filter"
          name="filter"
          aria-labelledby="filter-label"
          v-model="currentFilter">
        <label :for="filter">{{ filter }}</label>
      </template>
    </div>
    <br>
    <p>Sorted by {{ currentFilter }}:</p>
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
  font-weight: bold
}
</style>
