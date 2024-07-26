<script setup>
  import { useRouter } from 'vue-router'

  const router = useRouter()
  const props = defineProps(['routePath'])

  function navigateToPage() {
    if (props.routePath) {
      if (props.routePath.startsWith('https://')) {
        window.location.href = props.routePath
      } else {
        router.push(props.routePath)
      }
    }
  }
</script>

<template>
  <div class="w-max cursor-default">
    <button @click="navigateToPage" class="AsideItem cursor-pointer">
      <slot></slot>
    </button>
  </div>
</template>
