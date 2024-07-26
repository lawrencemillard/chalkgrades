import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import axios from 'axios'

export const useUserStore = defineStore('user', {
  actions: {
    async getData() {
      const router = useRouter()

      if (!localStorage.getItem('token')) {
        console.warn('No token in localStorage, redirecting...')
        this.$reset()
        router.push('/login')

        return
      }

      try {
        const response = await axios.post(
          this.requestLocation + this.requestURL,
          { token: localStorage.getItem('token') }
        )

        this.loading = false
        this.responseData = response.data
      } catch (error) {
        if (error.response.data.error === 'invalid-token') {
          localStorage.removeItem('token')
          this.$reset()
          router.push('/login')
        }
      }
    }
  },
  state: () => ({
    requestLocation: import.meta.env.VITE_REQUEST_LOCATION,
    requestURL: '/api/logins/home.json',
    loading: true,
    responseData: {
      username: '',
      workspaces: {}
    }
  })
})
