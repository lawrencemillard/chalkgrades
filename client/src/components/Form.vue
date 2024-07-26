<script setup>
  import { ref } from 'vue'
  import axios from 'axios'

  const props = defineProps(['requestURL', 'requestData'])
  const emit = defineEmits(['submitted'])
  const requestLocation = import.meta.env.VITE_REQUEST_LOCATION

  defineExpose({ submitForm })

  const Form = ref(null)

  async function submitForm() {
    try {
      const response = await axios.post(
        requestLocation + props.requestURL,
        props.requestData
      )

      emit('submitted', response.data)
    } catch (error) {
      if (error.response) {
        console.table({
          'Error code': error.response.data.error,
          'Error message': error.response.data.message
        })

        emit('submitted', error.response.data)
      } else {
        console.log('Something happened. ' + error)
      }
    }
  }
</script>

<template>
  <div class="FormInputs-wrapper">
    <slot></slot>
  </div>
</template>

<style scoped>
  .FormInputs-wrapper {
    @apply mb-4 w-full select-none;
  }
</style>
