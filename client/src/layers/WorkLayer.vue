<script setup>
  import { RouterView, useRoute, useRouter } from 'vue-router'
  import { onMounted, onUnmounted, ref } from 'vue'
  import axios from 'axios'
  import * as Ably from 'ably'

  // Layouts
  import WorkLayout from '@/layouts/WorkLayout.vue'

  const state = ref({
    loading: true,
    ably: null,
    channel: null,
    responseData: {
      display: '',
      exams: [],
      members: [],
      realtime_access: '',
      user_id: 0,
      user_role: '',
      username: ''
    }
  })

  const router = useRouter()
  const route = useRoute()

  const work_admin_username = ref(route.params.work_admin_username)
  const urn = ref(route.params.urn)

  async function getData() {
    if (!localStorage.getItem('token')) {
      console.warn('No token in localStorage, redirecting...')
      router.push('/login')

      return
    }

    try {
      const requestURL = `/api/work/${work_admin_username.value}/${urn.value}/home.json`

      const response = await axios.post(
        import.meta.env.VITE_REQUEST_LOCATION + requestURL,
        {
          token: localStorage.getItem('token')
        }
      )

      state.value.loading = false
      state.value.responseData = response.data

      console.log(
        "[debug] store's responseData.members @ request ",
        state.value.responseData.members
      )
    } catch (error) {
      if (error.response) {
        if (error.response.data.error === 'invalid-token') {
          localStorage.removeItem('token')
          router.push('/login')
        }
      } else {
        console.error(error)
      }

      router.push('/dashboard')
      return
    }

    console.info(
      '[info] realtime_access is ' + state.value.responseData.realtime_access
    )
  }

  async function getRealtimeData() {
    if (!state.ably) {
      state.ably = new Ably.Realtime({
        authCallback: (tokenParams, callback) => {
          fetch(
            import.meta.env.VITE_REQUEST_LOCATION +
              `/api/work/${work_admin_username.value}/${urn.value}/home_realtime.json`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                token: localStorage.getItem('token')
              })
            }
          )
            .then((response) => response.json())
            .then((data) => {
              callback(null, data.ably_token)
            })
            .catch((error) => {
              console.error(error)
              callback(error, null)
            })
        }
      })

      state.ably.connection.once('connected', () => {
        console.info('[info] connected to ably')
      })
    }

    if (!state.channel) {
      state.channel = state.ably.channels.get(
        state.value.responseData.realtime_access
      )
    }

    // Events
    await state.channel.subscribe((message) => {
      console.log('received! -> ', message)
    })

    await state.channel.subscribe('member_leave', (message) => {
      console.log('[debug] handling realtime event members')

      const foundIndex = state.value.responseData.members.findIndex(
        (item) => item.selected_user_id == message.data.selected_user_id
      )
      if (foundIndex != '-1') {
        state.value.responseData.members.splice(foundIndex, 1)
      }
    })

    await state.channel.subscribe('member_remove', (message) => {
      console.log('[debug] handling realtime event member_remove')

      if (message.data.selected_user_id == state.value.responseData.user_id) {
        router.push('/dashboard/join')
      }
    })

    await state.channel.subscribe('member_join', (message) => {
      state.value.responseData.members.push(message.data)

      console.log('[debug] members: ', state.value.responseData.members)
    })

    await state.channel.subscribe('urn', (message) => {
      urn.value = message.data.urn
      router.push('')
    })

    await state.channel.subscribe('display', (message) => {
      state.value.responseData.display = message.data.display
    })
  }

  onMounted(async () => {
    await getData()
    await getRealtimeData()
  })

  onUnmounted(() => {
    if (state.channel) {
      state.channel.detach()
    }

    if (state.ably) {
      state.ably.close()
    }
  })

  function updateResponse(exam) {
    state.value.responseData.exams.push(exam)
  }
</script>

<template>
  <WorkLayout
    :view="$route.name"
    :username="state.responseData.username"
    :urn="urn"
    :work_admin_username="work_admin_username"
    :user_role="state.responseData.user_role"
  />
  <RouterView
    :loading="state.loading"
    :responseData="state.responseData"
    :work_admin_username="work_admin_username"
    :urn="urn"
    @update="updateResponse"
  />
</template>
