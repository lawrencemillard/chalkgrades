<template>
  <form @submit.prevent="submitForm">
    <slot></slot>
  </form>
</template>

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

const error = ref('')
const success = ref(false)

async function submitForm() {
  try {
    const response = await axios.post(props.requestURL, props.requestData)
    emit('submitted', response.data)
  } catch (err) {
    error.value = err.response?.data?.error || 'An error occurred'
    emit('submitted', { error: error.value })
  }
}
</script>
