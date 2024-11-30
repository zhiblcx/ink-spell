<script setup lang="ts">
import { router } from '@/routes'
import { PATH_ROOT } from '@/shared/constants/router-path'
</script>

<template>
  <n-result
    class="mt-[200px]"
    status="500"
    title="500 服务器错误"
    description="服务器出错可能说明该雇更多程序员了"
  >
    <template #footer>
      <n-button @click="() => router.replace(PATH_ROOT)">回到首页</n-button>
    </template>
  </n-result>
</template>
