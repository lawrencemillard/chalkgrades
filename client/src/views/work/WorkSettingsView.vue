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

  const display = ref('')
  const urn = ref('')

  const props = defineProps([
    'work_admin_username',
    'urn',
    'responseData',
    'loading'
  ])

  onMounted(() => {
    document.title = t('title.work-settings')

    if (
      props.responseData.user_role &&
      props.responseData.user_role != 'work_admin'
    ) {
      router.push(`/work/${props.work_admin_username}/${props.urn}/members`)
    }
  })

  const requestData = ref({
    token: localStorage.getItem('token'),
    action: '',
    value: ''
  })

  const requestURL = computed(() => {
    return `/api/work/${props.work_admin_username}/${props.urn}/settings.json`
  })

  const error = ref('')
  const success = ref(false)

  function handleResponse(data) {
    error.value = data.error || ''
    success.value = !error.value

    if (success.value) {
      console.log('changed settings ' + props.urn)
    }
  }

  function submitForm() {
    if (display.value) {
      requestData.value.value = display.value
      requestData.value.action = 'display'

      formComponent.value.submitForm()
    }

    if (urn.value) {
      requestData.value.value = urn.value
      requestData.value.action = 'urn'

      formComponent.value.submitForm()
      return
    }

    formComponent.value.submitForm()
  }
</script>

<template>
  <main>
    <article>
      <h4>{{ t('text.heading.settings-1') }}</h4>
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
          {{ $t('inputs.text.display-name') }}
        </p>

        <input
          v-model="display"
          :placeholder="$t('inputs.placeholders.work-new-value-2')"
          type="text"
          name="display"
        />

        <p class="mb-2 text-base font-bold">
          {{ $t('inputs.text.urn') }}
        </p>

        <input
          v-model="urn"
          :placeholder="$t('inputs.placeholders.work-new-value-1')"
          type="text"
          name="urn"
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
