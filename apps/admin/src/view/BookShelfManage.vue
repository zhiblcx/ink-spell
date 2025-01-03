<script setup lang="ts">
import { deleteBookShelfByIdMutation, selectAllBookshelfQuery, selectBookshelfSearchQuery } from '@/features/bookshelf'
import { BookshelfDataVo } from '@/features/bookshelf/types'
import { TagVo } from '@/features/tag'
import { DataTablePagination, PopconfirmDelete } from '@/shared/components'
import { DEFAULT_TAG_COLORS, PaginationParams, SERVER_URL } from '@/shared/constants'
import { LanguageEnum } from '@/shared/enums/LanguageEnum'
import { useLanguageStore } from '@/shared/store'
import { useTranslation } from 'i18next-vue'
import { DataTableColumn, NAvatar, NButton, NTag } from 'naive-ui'
import { InternalRowData } from 'naive-ui/es/data-table/src/interface'

const languageStore = useLanguageStore()
const { t } = useTranslation(['COMMON', 'VALIDATION'])
const selectOptions = computed(() => [
  { label: t('COMMON:bookshelf_name'), value: 'bookshelfName' },
  { label: t('COMMON:username'), value: 'username' }
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
      title: t('COMMON:bookshelf_name'),
      key: 'bookshelf_name'
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
      title: t('COMMON:tag'),
      key: 'label',
      render: bookshelfTag
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

const data = computed(() => processData(allBookshelfData?.value?.data.items))
const search = ref<string>('')
const select = ref(selectOptions.value[0].value)
const searchData = ref<any>([])
const { data: allBookshelfData, isPending } = selectAllBookshelfQuery(page, pageSize)
const { mutate: deleteBookshelfMutate } = deleteBookShelfByIdMutation(page.value, pageSize.value)
const { data: selectBookshelfSearchData, refetch: selectBookshelfSearchRefetch } = selectBookshelfSearchQuery(
  page,
  pageSize,
  select,
  search
)

const deleteBookshelf = (bookshelf: InternalRowData) =>
  h(PopconfirmDelete, {
    disabled: bookshelf.disabled as boolean,
    onConfirm: () => deleteBookshelfMutate(bookshelf.id as number)
  })

const bookshelfTag = (bookshelf: InternalRowData, index: number) => {
  return (bookshelf?.tags as TagVo[])?.map((tag: TagVo, i: number) =>
    h(
      NTag,
      {
        style: {
          marginRight: '3px'
        },
        color: { color: DEFAULT_TAG_COLORS[(index + 2 * i) % DEFAULT_TAG_COLORS.length], textColor: 'white' },
        bordered: false
      },
      { default: () => (languageStore.language === LanguageEnum.CHINESE ? tag.nameChinese : tag.nameEnglish) }
    )
  )
}

const processData = (bookshelfs: BookshelfDataVo[]) =>
  bookshelfs?.map((data: BookshelfDataVo) => ({
    id: data.id,
    username: data.user.username,
    bookshelf_name: data.label,
    books_count: data.bookCount,
    bookshelf_status: data.isPublic ? t('COMMON:public') : t('COMMON:private'),
    collected_users: data.collectBookShelfPeople,
    bookshelf_details: data.description ?? t('COMMON:not_available'),
    cover: SERVER_URL + data.cover,
    disabled: data.allFlag,
    tags: data.tags
  }))

const handlerSelect = (value: string) => (select.value = value)
const handlerSearch = async () => {
  if (search.value.trim() != '') {
    await selectBookshelfSearchRefetch()
    searchData.value = processData(selectBookshelfSearchData?.value?.data.items)
    page.value = 1
  }
}
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
      :page-count="
        searchData.length === 0 ? allBookshelfData?.data.totalPages : selectBookshelfSearchData?.data.totalPages
      "
      v-model:page="page"
      v-model:page-size="pageSize"
    />
  </div>
</template>
