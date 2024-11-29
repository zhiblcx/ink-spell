<script setup>
import { ThemeEnum } from '@/shared/enums/ThemeEnum'
import { useChartsStore } from '@/shared/store/useChartsStore'
import { useThemeStore } from '@/shared/store/useThemeStore'
import { EchartsBar, EchartsPie } from '@ink-spell/echarts-vue'
import { useTranslation } from 'i18next-vue'
import { useMessage } from 'naive-ui'
const chartsStore = useChartsStore()
const themeStore = useThemeStore()
const message = useMessage()
const { t } = useTranslation(['COMMON'])

const data = ref([
  { label: '一星', value: 222 },
  { label: '两星', value: 200 },
  { label: '三星', value: 150 },
  { label: '四星', value: 200 },
  { label: '五星', value: 111 }
])

function handlerData() {
  data.value = [
    { label: '一星', value: 11 },
    { label: '两星', value: 20 },
    { label: '三星', value: 50 },
    { label: '四星', value: 80 },
    { label: '五星', value: 111 }
  ]
}
</script>

<template>
  <div class="space-y-3 md:flex md:justify-around md:space-x-3 md:space-y-0">
    <n-card
      :title="t('COMMON:register_user_number')"
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
      :title="t('COMMON:bookshelf_number')"
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
      :title="t('COMMON:book_number')"
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

  <div class="mt-10 md:flex">
    <n-card>
      <EchartsBar
        height="400px"
        :data="[
          { label: 'Mon', value: 222 },
          { label: 'Tue', value: 200 },
          { label: 'Wed', value: 150 },
          { label: 'www', value: 200 },
          { label: 'www', value: 111 },
          { label: 'www', value: 200 },
          { label: 'www', value: 111 }
        ]"
        :dark="themeStore.currentTheme == ThemeEnum.DARK"
        label
        :title="t('COMMON:books_uploaded_in_last_seven_days')"
        :relyVariable="chartsStore.chartsRelyVariation"
      />
    </n-card>
    <n-card class="mt-4 md:ml-4 md:mt-0 md:w-[50%]">
      <EchartsPie
        height="400px"
        :title="t('COMMON:user_satisfaction')"
        label
        :dark="themeStore.currentTheme == ThemeEnum.DARK"
        :data="data"
        :relyVariable="chartsStore.chartsRelyVariation"
      />
      <button @click="handlerData">切换数据</button>
    </n-card>
  </div>
</template>
