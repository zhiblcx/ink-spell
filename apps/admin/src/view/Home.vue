<script setup>
import { selectDashBoardStateQuery } from '@/features/home/query'
import { ThemeEnum } from '@/shared/enums/ThemeEnum'
import { useChartsStore } from '@/shared/store/useChartsStore'
import { useThemeStore } from '@/shared/store/useThemeStore'
import { EchartsBar, EchartsPie } from '@ink-spell/echarts-vue'
import { useTranslation } from 'i18next-vue'
import { useMessage } from 'naive-ui'

const chartsStore = useChartsStore()
const themeStore = useThemeStore()
const message = useMessage()
const { data: dashboardStateQuery, isPending } = selectDashBoardStateQuery()
const { t } = useTranslation(['COMMON', 'PROMPT'])

const echartsBarData = computed(() =>
  dashboardStateQuery?.value?.data?.bookNumberList?.map((data) => ({
    label: data.time,
    value: data.bookNumber
  }))
)

const echartsPieData = computed(() =>
  dashboardStateQuery?.value?.data?.rateMap?.map((data) => ({
    label: t(`star.${data[0] - 1}`),
    value: data[1]
  }))
)
</script>

<template>
  <n-skeleton
    text
    :repeat="5"
    v-if="isPending"
  />

  <div v-else>
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
            show-separator
            ref="numberAnimationInstRef"
            :from="0"
            :to="dashboardStateQuery?.data.userNumber"
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
            show-separator
            ref="numberAnimationInstRef"
            :from="0"
            :to="dashboardStateQuery?.data.bookshelfNumber"
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
            show-separator
            ref="numberAnimationInstRef"
            :from="0"
            :to="dashboardStateQuery?.data.bookNumber"
          />
        </n-statistic>
      </n-card>
    </div>

    <div class="mt-10 md:flex">
      <n-card>
        <EchartsBar
          height="400px"
          :title="t('COMMON:books_uploaded_in_last_seven_days')"
          :dark="themeStore.currentTheme == ThemeEnum.DARK"
          :data="echartsBarData ?? []"
          :relyVariable="chartsStore.chartsRelyVariation"
          label
        />
      </n-card>
      <n-card class="mt-4 md:ml-4 md:mt-0 md:w-[50%]">
        <EchartsPie
          height="400px"
          :title="t('COMMON:user_satisfaction')"
          :dark="themeStore.currentTheme == ThemeEnum.DARK"
          :data="echartsPieData ?? []"
          :relyVariable="chartsStore.chartsRelyVariation"
          label
        />
      </n-card>
    </div>
  </div>
</template>
