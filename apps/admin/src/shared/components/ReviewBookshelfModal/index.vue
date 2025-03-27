<script setup lang="ts">
import { operateBookShelfByIdMutation, selectApplyBookshelfQuery } from '@/features/bookshelf'
import { BookshelfDataVo } from '@/features/bookshelf/types'
import { TagVo } from '@/features/tag'
import { BookshelfIdShowBookModal, DataTablePagination, PopconfirmReject } from '@/shared/components'
import { DEFAULT_TAG_COLORS, PaginationParams, SERVER_URL } from '@/shared/constants'
import { LanguageEnum } from '@/shared/enums/LanguageEnum'
import { useLanguageStore } from '@/shared/store'
import { ReviewStatus } from '@/shared/types/ReviewStatus'
import { useTranslation } from 'i18next-vue'
import { DataTableColumn, NAvatar, NButton, NTag } from 'naive-ui'
import { InternalRowData } from 'naive-ui/es/data-table/src/interface'

const languageStore = useLanguageStore()
const { t } = useTranslation(['COMMON', 'VALIDATION'])
const page = ref(PaginationParams.DEFAULT_PAGE)
const pageSize = ref(PaginationParams.DEFAULT_PAGESIZE)
const showModal = defineModel()
const BookshelfDetailOpen = ref<boolean>(false)
const selectBookshelfId = ref<number>(0)
const columns = computed(
  (): Array<DataTableColumn> => [
    {
      title: 'id',
      key: 'id',
      width: '50px'
    },
    {
      title: t('COMMON:bookshelf_name'),
      key: 'bookshelf_name',
      width: '100px'
    },
    {
      title: t('COMMON:cover'),
      key: 'cover',
      width: '50px',
      align: 'center',
      render: (bookshelf) => h(NAvatar, { src: bookshelf.cover as string, size: 40 })
    },
    {
      title: t('COMMON:tag'),
      key: 'label',
      width: '100px',
      render: bookshelfTag
    },
    {
      title: t('COMMON:bookshelf_details'),
      key: 'bookshelf_details',
      width: '100px'
    },
    {
      title: t('COMMON:actions'),
      key: 'actions',
      width: '100px',
      render: actionsBookshelf
    }
  ]
)

const data = computed(() => processData(allBookshelfData?.value?.data.items))
const { data: allBookshelfData, isPending } = selectApplyBookshelfQuery(page, pageSize)
const { mutate: operateBookshelfMutate } = operateBookShelfByIdMutation()

const actionsBookshelf = (bookshelf: InternalRowData) =>
  h('div', { style: { display: 'flex', gap: '5px' } }, [
    h(
      NButton,
      {
        type: 'info',
        onClick: () => {
          selectBookshelfId.value = bookshelf.id as number
          BookshelfDetailOpen.value = true
        }
      },
      t('COMMON:detail')
    ),
    h(
      NButton,
      {
        type: 'primary',
        onClick: () => operateBookshelfMutate({ bookShelfId: bookshelf.id as number, review: ReviewStatus.APPROVED })
      },
      t('COMMON:agree')
    ),
    h(PopconfirmReject, {
      onConfirm: () => operateBookshelfMutate({ bookShelfId: bookshelf.id as number, review: ReviewStatus.REJECTED })
    })
  ])

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
    bookshelf_name: data.label,
    bookshelf_status: data.isPublic ? t('COMMON:public') : t('COMMON:private'),
    bookshelf_details: data.description ?? t('COMMON:not_available'),
    cover: SERVER_URL + data.cover,
    tags: data.tags
  }))
</script>

<template>
  <n-modal
    v-model:show="showModal"
    class="custom-card w-[85%]"
    preset="card"
    :title="t('COMMON:review_bookshelf')"
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
        :page-count="allBookshelfData?.data.totalPages"
        v-model:page="page"
        v-model:page-size="pageSize"
      />
    </div>

    <BookshelfIdShowBookModal
      v-model:bookshelfId="selectBookshelfId"
      v-model:showModal="BookshelfDetailOpen"
    />
  </n-modal>
</template>
