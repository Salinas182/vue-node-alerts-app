<script setup>
import { ref, watchEffect, computed } from 'vue'
import { useStore } from 'vuex';

const store = useStore();
const updatedAlerts = computed(() => store.getters.getAllAlerts);
const priority = computed(() => store.getters.getPriority);
const filters = ['name', 'priority']
const currentFilter = ref(filters[0])
const sortedAlertsByName = computed(() => {
  if (updatedAlerts?.value) {
    return sortAlertsByName(updatedAlerts.value);
  }
  return [];
});
const sortedAlertsByPriority = computed(() => {
  if (updatedAlerts.value && priority.value) {
    return sortAlertsByPriority(updatedAlerts.value, priority.value);
  }
  return [];
});

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
  store.dispatch('fetchAlerts');
  store.dispatch('fetchPriority');
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
