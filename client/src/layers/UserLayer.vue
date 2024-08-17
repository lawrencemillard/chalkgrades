<script setup>
  import { RouterView, useRouter } from 'vue-router'
  import { onMounted, ref } from 'vue'
  import axios from 'axios'

  // Layouts
  import UserLayout from '@/layouts/UserLayout.vue'

  const router = useRouter()

  const state = ref({
    loading: true,
    responseData: {
      username: '',
      workspaces: {}
    }
  })

  async function getData() {
    if (!localStorage.getItem('token')) {
      console.warn('No token in localStorage, redirecting...')
      router.push('/login')
      return
    }

    try {
      const requestURL = '/api/logins/home.json'

      const response = await axios.post(
        import.meta.env.VITE_REQUEST_LOCATION + requestURL,
        {
          token: localStorage.getItem('token')
        }
      )

      state.value.loading = false
      state.value.responseData = response.data
    } catch (error) {
      if (error.response) {
        if (error.response.data.error === 'invalid-token') {
          localStorage.removeItem('token')
          router.push('/login')
        }
      } else {
        console.error(error)
      }
    }
  }

  onMounted(() => {
    getData()
  })
</script>

<template>
  <UserLayout :view="$route.name" :username="state.responseData.username" />
  <RouterView :loading="state.loading" :responseData="state.responseData" />
</template>
