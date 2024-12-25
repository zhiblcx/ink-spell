<script setup lang="ts">
import { deleteAnnouncementMutation } from '@/features/system/mutation'
import { getFeedbackQuery } from '@/features/system/query'
import { DataTablePagination, PopconfirmDelete } from '@/shared/components'
import { PaginationParams } from '@/shared/constants'
import { SystemType } from '@/shared/types/SystemType'
import { TransformTimeUtils } from '@ink-spell/utils'
import { useTranslation } from 'i18next-vue'
import { DataTableColumn } from 'naive-ui'
import { InternalRowData } from 'naive-ui/es/data-table/src/interface'

const { t } = useTranslation(['COMMON'])
const page = ref(PaginationParams.DEFAULT_PAGE)
const pageSize = ref(PaginationParams.DEFAULT_PAGESIZE)
const { data: announcementData, isPending } = getFeedbackQuery(page, pageSize)
const columns = computed(
  (): Array<DataTableColumn> => [
    {
      title: t('COMMON:upload_timer'),
      key: 'createTimer',
      width: '200px'
    },
    {
      title: t('COMMON:feedback_text'),
      key: 'text'
    },
    {
      title: t('COMMON:actions'),
      key: 'actions',
      width: '200px',
      render: deleteButton
    }
  ]
)

const { mutate: deleteAnnouncementMutate } = deleteAnnouncementMutation()

const deleteButton = (system: InternalRowData) => {
  const deleteButton = h(PopconfirmDelete, { onConfirm: () => deleteAnnouncementMutate(system.id as number) })

  return [deleteButton]
}

const data = computed(() => processData(announcementData?.value?.data?.items))

const processData = (announcement: SystemType[]) =>
  announcement?.map((announcement: SystemType) => ({
    ...announcement,
    createTimer: TransformTimeUtils.formatDateYMDHMS(new Date(announcement.createTimer))
  }))
</script>

<template>
  <n-skeleton
    v-if="isPending"
    text
    :repeat="5"
  />
  <div v-else>
    <DataTablePagination
      :columns="columns"
      :data="data"
      :page-count="announcementData?.data?.pageCount"
      v-model:page="page"
      v-model:page-size="pageSize"
    />
  </div>
</template>
