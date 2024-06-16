<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const router = useRouter()
const store = useStore()
const formData = ref({
  key: '',
  title: '',
  image: '',
  priority: 1
})

const submitForm = async () => {
  try {
    await fetch(`${import.meta.env.VITE_APP_API_URL}/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData.value)
    })

    store.dispatch('addAlert', {
      key: formData.value.key,
      data: {
        title: formData.value.title,
        image: formData.value.image,
      }
    })
    store.dispatch('addPriority', {
      key: formData.value.key,
      value: formData.value.priority,
    })
    
    alert('Alert created successfully!')
    router.push('/')
  } catch (error) {
    console.error('Error creating alert:', error)
    alert('There was an error creating the alert.')
  }
}
</script>

<template>
  <main>
    <h1>Create a New Alert</h1>
    <form @submit.prevent="submitForm">
      <div>
        <label for="key">Key: </label>
        <input type="text" id="key" v-model="formData.key" required />
      </div>
      <div>
        <label for="title">Title: </label>
        <input type="text" id="title" v-model="formData.title" required>
      </div>
      <div>
        <label for="image">Image URL: </label>
        <input type="text" id="image" v-model="formData.image" required>
      </div>
      <div>
        <label for="priority">Priority: </label>
        <select id="priority" v-model="formData.priority" required>
          <option value="1">1 (High)</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4 (Low)</option>
        </select>
      </div>
      <button type="submit">Create Alert</button>
    </form>
  </main>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
