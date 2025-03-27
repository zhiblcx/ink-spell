<script setup lang="ts">
import { downloadBookByIdMutation } from '@/features/book'
import { BookDataVo } from '@/features/book/types'
import { selectBookshelfByIdShowBookQuery } from '@/features/bookshelf'
import { DataTablePagination } from '@/shared/components'
import { PaginationParams, SERVER_URL } from '@/shared/constants'
import { useTranslation } from 'i18next-vue'
import { DataTableColumn, NAvatar, NButton } from 'naive-ui'

const bookshelfId = defineModel<number>('bookshelfId', { required: true })
const showModal = defineModel<boolean>('showModal', { required: true })

const { t } = useTranslation(['COMMON'])
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
    }
  ]
)

const { data: selectBookshelfByIdShowBookData, isPending } = selectBookshelfByIdShowBookQuery(
  bookshelfId,
  page,
  pageSize
)
const { mutate: downloadMutate } = downloadBookByIdMutation()

const data = computed(() => processBookData(selectBookshelfByIdShowBookData?.value?.data.items))

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
  <n-modal
    v-model:show="showModal"
    class="custom-card w-[85%]"
    preset="card"
    :title="t('bookshelf_details')"
    size="huge"
    :bordered="false"
  >
    <n-skeleton
      text
      :repeat="5"
      v-if="isPending"
    />

    <div v-else>
      <DataTablePagination
        :columns="columns"
        :data="data"
        :page-count="selectBookshelfByIdShowBookData?.data.totalPages"
        v-model:page="page"
        v-model:page-size="pageSize"
      />
    </div>
  </n-modal>
</template>
