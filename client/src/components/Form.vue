<script setup>
import { ref } from 'vue'
import axios from 'axios'

const props = defineProps({
  requestURL: {
    type: String,
    required: true
  },
  requestData: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['submitted'])
const requestLocation = import.meta.env.VITE_REQUEST_LOCATION

defineExpose({ submitForm })

const error = ref('')
const success = ref(false)

async function submitForm() {
  try {
    const response = await axios.post(
      requestLocation + props.requestURL,
      props.requestData
    )
    emit('submitted', response.data)
  } catch (err) {
    error.value = err.response?.data?.error || 'An error occurred'
    emit('submitted', { error: error.value })
  }
}
</script>

<template>
  <form @submit.prevent="submitForm">
    <slot></slot>
  </form>
</template>

<style scoped>
  .FormInputs-wrapper {
    @apply mb-4 w-full select-none;
  }
</style>
