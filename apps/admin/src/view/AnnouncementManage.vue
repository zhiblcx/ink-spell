<script setup lang="ts">
import { deleteAnnouncementMutation } from '@/features/system/mutation'
import { getAnnouncementQuery } from '@/features/system/query'
import { AddAndUpdateAnnouncementModal, DataTablePagination, PopconfirmDelete } from '@/shared/components'
import { stateEnum } from '@/shared/components/AddAndUpdateAnnouncementModal/types'
import { PaginationParams } from '@/shared/constants'
import { SystemType } from '@/shared/types/SystemType'
import { TransformTimeUtils } from '@ink-spell/utils'
import { useTranslation } from 'i18next-vue'
import { DataTableColumn, NButton } from 'naive-ui'
import { InternalRowData } from 'naive-ui/es/data-table/src/interface'

const { t } = useTranslation(['COMMON'])
const page = ref(PaginationParams.DEFAULT_PAGE)
const pageSize = ref(PaginationParams.DEFAULT_PAGESIZE)
const showModalAdd = ref<boolean>(false)
const showModalUpdate = ref<boolean>(false)
const selectAnnouncement = ref<SystemType>()
const { data: announcementData, isPending } = getAnnouncementQuery(page, pageSize)
const columns = computed(
  (): Array<DataTableColumn> => [
    {
      title: t('COMMON:upload_timer'),
      key: 'createTimer',
      width: '200px'
    },
    {
      title: t('COMMON:announcement_text'),
      key: 'text'
    },
    {
      title: t('COMMON:actions'),
      key: 'actions',
      width: '200px',
      render: updateAndDeleteButton
    }
  ]
)

const { mutate: deleteAnnouncementMutate } = deleteAnnouncementMutation()

const updateAndDeleteButton = (system: InternalRowData) => {
  const updateButton = h(
    NButton,
    {
      style: { marginRight: '10px' },
      type: 'primary',
      onClick: () => {
        selectAnnouncement.value = {
          ...(system as SystemType)
        }
        showModalUpdate.value = true
      }
    },
    { default: () => t('COMMON:change') }
  )

  const deleteButton = h(PopconfirmDelete, { onConfirm: () => deleteAnnouncementMutate(system.id as number) })

  return [updateButton, deleteButton]
}

const data = computed(() => processData(announcementData?.value?.data?.items))

const processData = (announcement: SystemType[]) =>
  announcement?.map((announcement: SystemType) => ({
    ...announcement,
    createTimer: TransformTimeUtils.formatDateYMDHMS(new Date(announcement.createTimer))
  }))

const handleAdd = () => {
  showModalAdd.value = true
}
</script>

<template>
  <n-skeleton
    v-if="isPending"
    text
    :repeat="5"
  />
  <div v-else>
    <div class="mb-4 flex justify-end">
      <n-button
        type="primary"
        @click="handleAdd"
      >
        {{ t('COMMON:add') }}
      </n-button>
      <AddAndUpdateAnnouncementModal
        v-model="showModalAdd"
        :state="stateEnum.add"
      />
      <AddAndUpdateAnnouncementModal
        v-model="showModalUpdate"
        :state="stateEnum.update"
        v-model:announcement="selectAnnouncement"
      />
    </div>
    <DataTablePagination
      :columns="columns"
      :data="data"
      :page-count="announcementData?.data?.pageCount"
      v-model:page="page"
      v-model:page-size="pageSize"
    />
  </div>
</template>
