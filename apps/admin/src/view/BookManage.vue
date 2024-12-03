<script setup lang="ts">
import {
  deleteBookByIdMutation,
  downloadBookByIdMutation,
  selectAllBookQuery,
  selectBookByUsernameAndBookshelfNameQuery
} from '@/features/book'
import { BookDataVo } from '@/features/book/types'
import { DataTablePagination, PopconfirmDelete } from '@/shared/components'
import { PaginationParams, SERVER_URL } from '@/shared/constants'
import { useTranslation } from 'i18next-vue'
import { DataTableColumn, NAvatar, NButton } from 'naive-ui'
import { InternalRowData } from 'naive-ui/es/data-table/src/interface'

const selectOptions = computed(() => [
  { label: t('COMMON:bookshelf_name'), value: 'bookshelfName' },
  { label: t('COMMON:username'), value: 'username' }
])
const { t } = useTranslation(['COMMON', 'VALIDATION'])
const page = ref(PaginationParams.DEFAULT_PAGE)
const pageSize = ref(PaginationParams.DEFAULT_PAGESIZE)
const select = ref<string>(selectOptions.value[0].value)
const search = ref<string>('')
const searchData = ref<any>([])

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

const { data: allBookData, isPending } = selectAllBookQuery(page, pageSize)
const { data: bookSearchData, ...bookSearchQuery } = selectBookByUsernameAndBookshelfNameQuery(
  page,
  pageSize,
  select,
  search
)
const { mutate: downloadMutate } = downloadBookByIdMutation()
const { mutate: deleteMutate } = deleteBookByIdMutation(page.value, pageSize.value)

const updateAndDeleteButton = (book: InternalRowData) => {
  const updateButton = h(
    NButton,
    {
      style: { marginRight: '10px' },
      type: 'primary',
      onClick: () => {
        window.$message.warning('暂不支持')
      }
    },
    { default: () => t('COMMON:change') }
  )

  const deleteButton = h(PopconfirmDelete, { onConfirm: () => deleteMutate(book.id as number) })

  return [updateButton, deleteButton]
}

const data = computed(() => processBookData(allBookData?.value?.data.items))

const handlerSelect = (value: string) => (select.value = value)

const handlerSearch = async () => {
  if (search.value.trim() != '') {
    await bookSearchQuery.refetch()
    searchData.value = processBookData(bookSearchData?.value?.data.items)
    page.value = 1
  }
}

// 定义一个函数来处理书籍数据的转换
const processBookData = (books: BookDataVo[]) =>
  books?.map((book: BookDataVo) => ({
    id: book.id,
    username: book.user.username,
    book_name: book.name,
    belonging_bookshelf: book.bookShelf.label,
    cover: SERVER_URL + book.cover,
    book_introduction: book.description ?? t('not_available'),
    author: book.author ?? t('not_available'),
    bookshelf_details: book.bookShelf.description ?? t('not_available')
  }))
</script>

<template>
  <n-skeleton
    text
    :repeat="5"
    v-if="isPending"
  />

  <div v-else>
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

    <DataTablePagination
      :columns="columns"
      :data="searchData.length === 0 ? data : searchData"
      :page-count="searchData.length === 0 ? allBookData?.data.totalPages : bookSearchData?.data.totalPages"
      v-model:page="page"
      v-model:page-size="pageSize"
    />
  </div>
</template>
