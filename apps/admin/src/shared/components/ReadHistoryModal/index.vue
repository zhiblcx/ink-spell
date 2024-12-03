<script setup lang="ts">
import { selectReadHistoryByUserIdQuery } from '@/features/book'
import { ReadHistoryDataVo } from '@/features/user/types'
import { SERVER_URL } from '@/shared/constants'
import { TransformTimeUtils } from '@ink-spell/utils'
import { useTranslation } from 'i18next-vue'
import { DataTableColumn, NAvatar } from 'naive-ui'

const { userId } = defineProps<{ userId: number }>()
const searchId = ref<number>(0)
const showModal = defineModel()
const { t } = useTranslation(['COMMON'])
const columns = computed(
  (): Array<DataTableColumn> => [
    { title: t('COMMON:book_name'), key: 'bookName' },
    {
      title: t('COMMON:cover'),
      key: 'cover',
      render: (rowData) => h(NAvatar, { src: rowData.cover as string, size: 40 })
    },
    { title: t('COMMON:author'), key: 'author' },
    { title: t('COMMON:book_detail'), key: 'bookDetail' },
    { title: t('COMMON:reading_total_duration'), key: 'duration' },
    { title: t('COMMON:upload_timer'), key: 'updateTimer' }
  ]
)

const { data: readHistoryData, refetch } = selectReadHistoryByUserIdQuery(searchId)

watch(
  () => userId,
  () => {
    searchId.value = userId
    refetch()
  }
)

const data = computed(() =>
  readHistoryData?.value?.data?.map((read: ReadHistoryDataVo) => ({
    bookName: read.book.name,
    cover: SERVER_URL + read.book.cover,
    author: read.book.author ?? t('COMMON:not_available'),
    bookDetail: read.book.description ?? t('COMMON:not_available'),
    duration: read.readTime,
    updateTimer: TransformTimeUtils.formatDateYMDHMS(read.book.createTimer)
  }))
)
</script>

<template>
  <n-modal
    v-model:show="showModal"
    class="custom-card w-[70%]"
    preset="card"
    :title="t('COMMON:recently_read_books')"
    size="huge"
    :bordered="false"
  >
    <n-data-table
      class="h-[70vh]"
      :columns="columns"
      :bordered="false"
      :single-line="false"
      :max-height="420"
      striped
      remote
      :data="data ?? []"
    />
  </n-modal>
</template>
