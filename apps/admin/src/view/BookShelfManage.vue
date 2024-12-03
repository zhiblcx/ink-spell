<script setup lang="ts">
import { deleteBookShelfByIdMutation, selectAllBookshelfQuery } from '@/features/bookshelf'
import { BookshelfDataVo } from '@/features/bookshelf/types'
import { DataTablePagination, PopconfirmDelete } from '@/shared/components'
import { PaginationParams, SERVER_URL } from '@/shared/constants'
import { useTranslation } from 'i18next-vue'
import { DataTableColumn, NAvatar, NButton } from 'naive-ui'
import { InternalRowData } from 'naive-ui/es/data-table/src/interface'

const { t } = useTranslation(['COMMON', 'VALIDATION'])
const selectOptions = computed(() => [
  { label: t('COMMON:bookshelf_name'), value: '书架名' },
  { label: t('COMMON:username'), value: '用户名' }
])

const page = ref(PaginationParams.DEFAULT_PAGE)
const pageSize = ref(PaginationParams.DEFAULT_PAGESIZE)
const columns = computed(
  (): Array<DataTableColumn> => [
    {
      title: t('COMMON:username'),
      key: 'username'
    },
    {
      title: t('COMMON:cover'),
      key: 'cover',
      align: 'center',
      render: (bookshelf) => h(NAvatar, { src: bookshelf.cover as string, size: 40 })
    },
    {
      title: t('COMMON:bookshelf_status'),
      key: 'bookshelf_status'
    },
    {
      title: t('COMMON:books_count'),
      key: 'books_count'
    },
    {
      title: t('COMMON:collected_users'),
      key: 'collected_users'
    },
    {
      title: t('COMMON:bookshelf_details'),
      key: 'bookshelf_details'
    },
    {
      title: t('COMMON:actions'),
      key: 'actions',
      width: '200px',
      render: deleteBookshelf
    }
  ]
)

const data = computed(() =>
  allBookshelfData?.value?.data.items.map((data: BookshelfDataVo) => ({
    id: data.id,
    username: data.user.username,
    bookshelf_name: data.label,
    books_count: data.bookCount,
    bookshelf_status: data.isPublic ? t('COMMON:public') : t('COMMON:private'),
    collected_users: data.collectBookShelfPeople,
    bookshelf_details: data.description ?? t('COMMON:not_available'),
    cover: SERVER_URL + data.cover,
    disabled: data.allFlag
  }))
)

const { data: allBookshelfData } = selectAllBookshelfQuery(page, pageSize)
const { mutate: deleteBookshelfMutate } = deleteBookShelfByIdMutation(page.value, pageSize.value)

const deleteBookshelf = (bookshelf: InternalRowData) =>
  h(PopconfirmDelete, {
    disabled: bookshelf.disabled as boolean,
    onConfirm: () => deleteBookshelfMutate(bookshelf.id as number)
  })
</script>

<template>
  <n-input-group class="mb-4">
    <n-select
      :style="{ width: '120px' }"
      :options="selectOptions"
      :placeholder="selectOptions[0].label"
    />
    <n-input
      :style="{ width: '200px' }"
      :placeholder="t('VALIDATION:search_keywords')"
    />
    <n-button type="primary"> {{ t('COMMON:search') }} </n-button>
  </n-input-group>

  <DataTablePagination
    :columns="columns"
    :data="data"
    :page-count="allBookshelfData?.data.totalPages"
    v-model:page="page"
    v-model:page-size="pageSize"
  />
</template>
