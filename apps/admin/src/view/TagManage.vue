<script setup lang="ts">
import { deleteTagMutation, getAllTagQuery, getTagSearchQuery, TagVo } from '@/features/tag'
import { AddAndUpdateTagModal, DataTablePagination, PopconfirmDelete } from '@/shared/components'
import { stateEnum } from '@/shared/components/AddAndUpdateTagModal/types'
import { PaginationParams } from '@/shared/constants'
import { TransformTimeUtils } from '@ink-spell/utils'
import dayjs from 'dayjs'
import { useTranslation } from 'i18next-vue'
import { NButton } from 'naive-ui'
import { InternalRowData } from 'naive-ui/es/data-table/src/interface'

const { t } = useTranslation(['COMMON', 'VALIDATION'])
const selectOptions = computed(() => [
  { label: t('COMMON:tag') + t('COMMON:chinese_name'), value: 'nameChinese' },
  { label: t('COMMON:tag') + t('COMMON:english_name'), value: 'nameEnglish' }
])
const page = ref(PaginationParams.DEFAULT_PAGE)
const pageSize = ref(PaginationParams.DEFAULT_PAGESIZE)
const pageCount = ref(PaginationParams.DEFAULT_PAGECOUNT)
const search = ref<string>('')
const select = ref(selectOptions.value[0].value)
const searchData = ref<any>([])
const showModalAdd = ref<boolean>(false)
const showModalUpdate = ref<boolean>(false)
const selectTag = ref<TagVo>()
const columns = computed(() => [
  { title: t('COMMON:chinese_name'), key: 'chinese_name' },
  { title: t('COMMON:english_name'), key: 'english_name' },
  { title: t('COMMON:shelf_frequency'), key: 'shelf_frequency' },
  { title: t('COMMON:upload_timer'), key: 'upload_timer' },
  { title: t('actions'), key: 'actions', render: updateAndDeleteButton }
])

const { data: allTagData, isPending } = getAllTagQuery(page, pageSize)
const { data: tagSearchData, refetch } = getTagSearchQuery(page, pageSize, select, search)
const { mutate: deleteTagMutate } = deleteTagMutation(page.value, pageSize.value)

const data = computed(() => processData(allTagData?.value?.data?.items))

const updateAndDeleteButton = (tag: InternalRowData) => {
  const updateButton = h(
    NButton,
    {
      style: { marginRight: '10px' },
      type: 'primary',
      onClick: () => {
        selectTag.value = {
          ...(tag as TagVo),
          nameChinese: tag.chinese_name as string,
          nameEnglish: tag.english_name as string
        }
        showModalUpdate.value = true
      }
    },
    { default: () => t('COMMON:change') }
  )

  const deleteButton = h(PopconfirmDelete, { onConfirm: () => deleteTagMutate(tag.id as number) })

  return [updateButton, deleteButton]
}
const handlerSelect = (value: string) => (select.value = value)
const handlerSearch = async () => {
  if (search.value.trim() != '') {
    await refetch()
    searchData.value = processData(tagSearchData?.value?.data?.items)
  }
}

const processData = (tags: TagVo[]) =>
  tags?.map((tag: TagVo) => ({
    id: tag.id,
    english_name: tag.nameEnglish,
    chinese_name: tag.nameChinese,
    shelf_frequency: tag._count.useFrequency,
    upload_timer: TransformTimeUtils.formatDateYMDHMS(dayjs(tag.createTimer))
  }))

const handleAdd = () => {
  showModalAdd.value = true
}
</script>

<template>
  <n-skeleton
    text
    :repeat="5"
    v-if="isPending"
  />

  <div v-else>
    <div class="flex">
      <n-input-group class="mb-4">
        <n-select
          :style="{ width: '120px' }"
          :options="selectOptions"
          :placeholder="selectOptions[0].label"
          @update:value="handlerSelect"
        />
        <n-input
          :style="{ width: '200px' }"
          :placeholder="t('VALIDATION:search_keywords')"
          v-model:value="search"
        />
        <n-button
          type="primary"
          @click="handlerSearch"
        >
          {{ t('COMMON:search') }}
        </n-button>
      </n-input-group>

      <n-button
        type="primary"
        @click="handleAdd"
      >
        {{ t('COMMON:add') }}
      </n-button>
      <AddAndUpdateTagModal
        v-model="showModalAdd"
        :state="stateEnum.add"
      />
      <AddAndUpdateTagModal
        v-model="showModalUpdate"
        :state="stateEnum.update"
        v-model:select-tag="selectTag"
      />
    </div>

    <DataTablePagination
      :columns="columns"
      :data="searchData.length > 0 ? searchData : data"
      :page-count="pageCount"
      v-model:page="page"
      v-model:page-size="pageSize"
    />
  </div>
</template>
