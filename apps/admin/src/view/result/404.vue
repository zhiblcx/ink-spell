<script setup lang="ts">
import { PATH_ROOT } from '@/shared/constants/router-path'
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <n-result
    class="mt-[200px]"
    status="404"
    title="404 资源不存在"
    description="生活总归带点荒谬"
  >
    <template #footer>
      <n-button @click="() => router.replace(PATH_ROOT)">回到首页</n-button>
    </template>
  </n-result>
</template>
