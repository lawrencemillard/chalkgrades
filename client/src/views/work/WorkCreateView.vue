<script setup>
  import { computed, onMounted, ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useI18n } from 'vue-i18n'

  // UI elements
  import Button from '@/components/Button.vue'
  import Loading from '@/components/Loading.vue'
  import Form from '@/components/Form.vue'
  import Divider from '@/components/Divider.vue'

  const { t } = useI18n()
  const router = useRouter()

  const formComponent = ref(null)

  const props = defineProps([
    'work_admin_username',
    'urn',
    'responseData',
    'loading'
  ])

  const emit = defineEmits(['update'])

  onMounted(() => {
    document.title = t('title.work-create')

    if (props.responseData.user_role != 'work_admin') {
      router.push(`/work/${props.work_admin_username}/${props.urn}/members`)
    }
  })

  const requestData = ref({
    token: localStorage.getItem('token'),
    exam_name: ''
  })

  const requestURL = computed(() => {
    return `/api/exams/${props.work_admin_username}/${props.urn}/create.json`
  })

  const error = ref('')
  const success = ref(false)

  function handleResponse(data) {
    error.value = data.error || ''
    success.value = !error.value

    if (success.value) {
      emit('update', data.exam)
      router.push(`/work/${props.work_admin_username}/${props.urn}/exams`)
    }
  }

  function submitForm() {
    formComponent.value.submitForm()
  }
</script>
<template>
  <main>
    <article>
      <h4>{{ t('text.heading.work-create-1') }}</h4>
      <p class="subtext">
        {{ props.work_admin_username + ' / ' + props.urn }}
      </p>
    </article>

    <Loading v-if="props.loading" />

    <Form
      :requestURL="requestURL"
      :requestData="requestData"
      ref="formComponent"
      @submitted="handleResponse"
      v-else
    >
      <form>
        <!-- Note that this is only here to prevent an error message. -->
        <p class="mb-2 text-base font-bold">
          {{ $t('inputs.text.exam-name') }}
        </p>

        <input
          v-model="requestData.exam_name"
          :placeholder="$t('inputs.placeholders.exam-name')"
          autocomplete="on"
          name="exam_name"
          type="text"
        />
      </form>
      <!-- <form> should end before the error display and the button-row. -->

      <p v-if="error" class="error">{{ $t(`errors.${error}`) }}</p>

      <div class="button-row">
        <Button @click="submitForm" variant="highlighted">
          {{ $t('button.submit') }}
        </Button>
      </div>
    </Form>
  </main>
</template>
