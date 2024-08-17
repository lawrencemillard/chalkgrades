<script setup>
  import { RouterView, useRoute, useRouter } from 'vue-router'
  import { onMounted, onUnmounted, ref } from 'vue'
  import axios from 'axios'
  import * as Ably from 'ably'

  // Layouts
  import ManageLayout from '@/layouts/ManageLayout.vue'

  const state = ref({
    loading: true,
    ably: null,
    channel: null,
    responseData: {
      exam_display: '',
      questions: [],
      sessions: [],
      user_role: '',
      username: '',
      visibility: '',
      work_display: ''
    }
  })

  const router = useRouter()
  const route = useRoute()

  const work_admin_username = ref(route.params.work_admin_username)
  const urn = ref(route.params.urn)
  const exam_id = ref(route.params.exam_id)
</script>

<template>
  <ManageLayout
    :view="$route.name"
    :username="state.responseData.username"
    :urn="urn"
    :work_admin_username="work_admin_username"
    :exam_id="exam_id"
    :user_role="state.responseData.user_role"
  />
  <RouterView
    :loading="state.loading"
    :responseData="state.responseData"
    :work_admin_username="work_admin_username"
    :urn="urn"
    :exam_id="exam_id"
  />
</template>
