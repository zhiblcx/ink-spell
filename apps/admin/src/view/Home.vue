<script setup>
import { EchartsBar } from '@ink-spell/echarts/vue'
</script>

<template>
  <div class="space-y-3 md:flex md:justify-around md:space-x-3 md:space-y-0">
    <n-card
      title="注册用户"
      hoverable
    >
      <n-statistic>
        <template #prefix>
          <n-icon>
            <div class="i-mingcute:user-3-line w-1em h-1em" />
          </n-icon>
        </template>
        <n-number-animation
          ref="numberAnimationInstRef"
          :from="0"
          :to="12039"
        />
      </n-statistic>
    </n-card>

    <n-card
      title="书架数量"
      hoverable
    >
      <n-statistic>
        <template #prefix>
          <n-icon>
            <div class="i-mingcute:book-5-line w-1em h-1em"></div>
          </n-icon>
        </template>
        <n-number-animation
          ref="numberAnimationInstRef"
          :from="0"
          :to="12039"
        />
      </n-statistic>
    </n-card>

    <n-card
      title="书籍数量"
      hoverable
    >
      <n-statistic>
        <template #prefix>
          <n-icon>
            <div class="i-mingcute:book-2-line w-1em h-1em" />
          </n-icon>
        </template>
        <n-number-animation
          ref="numberAnimationInstRef"
          :from="0"
          :to="12039"
      /></n-statistic>
    </n-card>
  </div>

  <div class="mt-3">
    <EchartsBar
      height="400px"
      :data="[
        { label: 'Mon', value: 222 },
        { label: 'Tue', value: 200 },
        { label: 'Wed', value: 150 },
        { label: 'www', value: 200 },
        { label: 'www', value: 111 }
      ]"
      label
      title="近一周的上传量"
    />
  </div>
</template>
