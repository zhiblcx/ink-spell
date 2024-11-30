<script setup lang="ts">
import { logoutUtils } from '@/shared/utils/logoutUtils'
</script>

<template>
  <n-result
    class="mt-[200px]"
    status="403"
    title="403 禁止访问"
    description="总有些门是对你关闭的"
  >
    <template #footer>
      <n-button @click="logoutUtils">回到登录页</n-button>
    </template>
  </n-result>
</template>
