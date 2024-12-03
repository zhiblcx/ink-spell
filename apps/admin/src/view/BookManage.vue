<script setup lang="ts">
import { deleteBookByIdMutation, downloadBookByIdMutation, selectAllBookQuery } from '@/features/book'
import { BookDataVo } from '@/features/book/types'
import { DataTablePagination, PopconfirmDelete } from '@/shared/components'
import { PaginationParams, SERVER_URL } from '@/shared/constants'
import { useTranslation } from 'i18next-vue'
import { DataTableColumn, NAvatar, NButton } from 'naive-ui'
import { InternalRowData } from 'naive-ui/es/data-table/src/interface'

interface BookManageDataType {
  id: number
  username: string
  book_name: string
  belonging_bookshelf: string
  cover: string
  book_introduction: string
  author: string
  bookshelf_details: string
  [x: string]: unknown
}

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
      title: t('COMMON:book_name'),
      key: 'book_name'
    },
    {
      title: t('COMMON:cover'),
      key: 'cover',
      align: 'center',
      render: (rowData) => h(NAvatar, { src: rowData.cover as string, size: 40 })
    },
    {
      title: t('COMMON:author'),
      key: 'author'
    },
    {
      title: t('COMMON:belonging_bookshelf'),
      key: 'belonging_bookshelf'
    },
    {
      title: t('COMMON:bookshelf_details'),
      key: 'bookshelf_details'
    },
    {
      title: t('COMMON:book_introduction'),
      key: 'book_introduction'
    },
    {
      title: t('COMMON:book_detail'),
      key: 'book_detail',
      render: (book) =>
        h(
          NButton,
          { text: true, type: 'primary', onClick: () => downloadMutate(book.id as number) },
          { default: () => t('COMMON:download') }
        )
    },
    {
      title: t('COMMON:actions'),
      key: 'actions',
      width: '200px',
      render: updateAndDeleteButton
    }
  ]
)

const { mutate: downloadMutate } = downloadBookByIdMutation()
const { mutate: deleteMutate } = deleteBookByIdMutation(page.value, pageSize.value)

const updateAndDeleteButton = (book: BookManageDataType | InternalRowData) => {
  const updateButton = h(
    NButton,
    {
      style: { marginRight: '10px' },
      type: 'primary',
      onClick: () => {
        console.log('update')
      }
    },
    { default: () => t('COMMON:change') }
  )

  const deleteButton = h(PopconfirmDelete, { onConfirm: () => deleteMutate(book.id as number) })

  return [updateButton, deleteButton]
}

const { data: allBookData } = selectAllBookQuery(page, pageSize)

const processedData = computed(() =>
  allBookData?.value?.data.items.map((book: BookDataVo) => ({
    id: book.id,
    username: book.user.username,
    book_name: book.name,
    belonging_bookshelf: book.bookShelf.label,
    cover: SERVER_URL + book.cover,
    book_introduction: book.description ?? t('not_available'),
    author: book.author ?? t('not_available'),
    bookshelf_details: book.bookShelf.description ?? t('not_available')
  }))
)
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
    :data="processedData"
    :page-count="allBookData?.data.totalPages"
    v-model:page="page"
    v-model:page-size="pageSize"
  />
</template>
