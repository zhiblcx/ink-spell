<script setup lang="ts">
import { deleteUserByIdMutation, resetUserPasswordMutation } from '@/features/user'
import { selectAllUserInfoQuery, selectUserInfoByUsernameQuery } from '@/features/user/select'
import { UserDataVo } from '@/features/user/types'
import { DataTablePagination, PopconfirmDelete } from '@/shared/components'
import { PaginationParams } from '@/shared/constants'
import { SERVER_URL } from '@/shared/constants/app'
import { useTranslation } from 'i18next-vue'
import { DataTableColumn, NAvatar, NButton } from 'naive-ui'
import { InternalRowData } from 'naive-ui/es/data-table/src/interface'

const page = ref(PaginationParams.DEFAULT_PAGE)
const pageSize = ref(PaginationParams.DEFAULT_PAGESIZE)
const search = ref<string>('')

const { t } = useTranslation(['AUTH', 'COMMON', 'VALIDATION'])
const columns = computed(
  (): Array<DataTableColumn> => [
    {
      title: t('COMMON:username'),
      key: 'username'
    },
    {
      title: t('COMMON:account'),
      key: 'account'
    },
    {
      title: t('COMMON:avatar'),
      key: 'avatar',
      align: 'center',
      render: (user) => h(NAvatar, { src: user.avatar as string, round: true, size: 40 })
    },
    {
      title: t('COMMON:bookshelf_count'),
      key: 'bookshelf_count'
    },
    {
      title: t('COMMON:books_count'),
      key: 'books_count'
    },
    {
      title: t('COMMON:followers_count'),
      key: 'followers'
    },
    {
      title: t('COMMON:following_count'),
      key: 'following'
    },
    {
      title: t('COMMON:reading_total_duration'),
      key: 'reading_total_duration'
    },
    {
      title: t('COMMON:last_login_time'),
      key: 'offlineTime'
    },
    {
      title: t('COMMON:recently_read_books'),
      key: 'recently_read_books',
      render: () => h(NButton, { type: 'primary' }, { default: () => t('COMMON:show') })
    },
    {
      title: t('COMMON:actions'),
      key: 'actions',
      width: '200px',
      render: actions
    }
  ]
)

const data = computed(() =>
  allUserInfoData?.value?.data.items.map((user: UserDataVo) => ({
    ...user,
    avatar: SERVER_URL + user.avatar,
    bookshelf_count: user.bookShelfs,
    books_count: user.books,
    reading_total_duration: user.offlineTime === null ? 0 : user.offlineTime,
    offlineTime: user.offlineTime === null ? t('AUTH:never_logged_in') : user.offlineTime
  }))
)
const searchData = ref([])

const userInfoByUsernameQuery = selectUserInfoByUsernameQuery(search, page, pageSize)
const { data: allUserInfoData } = selectAllUserInfoQuery(page, pageSize)
const { mutate: deleteUserMutate } = deleteUserByIdMutation(page.value, pageSize.value)
const { mutate: resetUserPasswordMutate } = resetUserPasswordMutation()

const actions = (user: InternalRowData) => {
  const resetButton = h(PopconfirmDelete, {
    content: t('COMMON:reset'),
    type: 'warning',
    style: { marginRight: '10px' },
    onConfirm: () => resetUserPasswordMutate(user.id as number)
  })
  const deleteButton = h(PopconfirmDelete, { onConfirm: () => deleteUserMutate(user.id as number) })

  return [resetButton, deleteButton]
}

const handlerSearch = async () => {
  if (search.value.trim() != '') {
    searchData.value = (await userInfoByUsernameQuery?.refetch()).data?.data.items.map((user: UserDataVo) => ({
      ...user,
      avatar: SERVER_URL + user.avatar,
      bookshelf_count: user.bookShelfs,
      books_count: user.books,
      reading_total_duration: user.offlineTime === null ? 0 : user.offlineTime,
      offlineTime: user.offlineTime === null ? t('AUTH:never_logged_in') : user.offlineTime
    }))
  }
}
</script>

<template>
  <n-input-group class="mb-4">
    <n-input
      :style="{ width: '200px' }"
      :placeholder="t('search_username')"
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
    :page-count="allUserInfoData?.data.totalPages"
    v-model:page="page"
    v-model:page-size="pageSize"
  />
</template>
