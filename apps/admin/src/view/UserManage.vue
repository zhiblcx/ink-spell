<script setup lang="ts">
import { deleteUserByIdMutation, resetUserPasswordMutation } from '@/features/user'
import { selectAllUserInfoQuery, selectUserInfoByUsernameQuery } from '@/features/user/select'
import { UserDataVo } from '@/features/user/types'
import { DataTablePagination, PopconfirmDelete, ReadHistoryModal } from '@/shared/components'
import { PaginationParams } from '@/shared/constants'
import { SERVER_URL } from '@/shared/constants/app'
import { useTranslation } from 'i18next-vue'
import { DataTableColumn, NAvatar, NButton } from 'naive-ui'
import { InternalRowData } from 'naive-ui/es/data-table/src/interface'

const page = ref(PaginationParams.DEFAULT_PAGE)
const pageSize = ref(PaginationParams.DEFAULT_PAGESIZE)
const search = ref<string>('')
const showModal = ref(false)
const selectUserId = ref<number>(-1)
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
      render: (user) =>
        h(
          NButton,
          {
            type: 'primary',
            text: true,
            onClick: () => {
              showModal.value = true
              selectUserId.value = user.id as number
            }
          },
          { default: () => t('COMMON:show') }
        )
    },
    {
      title: t('COMMON:actions'),
      key: 'actions',
      width: '200px',
      render: actions
    }
  ]
)

const data = computed(() => processUserData(allUserInfoData?.value?.data.items))
const searchData = ref<any>([])

const { data: userInfoSearchData, ...userInfoByUsernameQuery } = selectUserInfoByUsernameQuery(search, page, pageSize)
const { data: allUserInfoData, isPending } = selectAllUserInfoQuery(page, pageSize)
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
    await userInfoByUsernameQuery?.refetch()
    searchData.value = processUserData(userInfoSearchData?.value?.data?.items)
    page.value = 1
  }
}

const processUserData = (users: UserDataVo[]) =>
  users?.map((user: UserDataVo) => ({
    ...user,
    avatar: SERVER_URL + user.avatar,
    bookshelf_count: user.bookShelfs,
    books_count: user.books,
    reading_total_duration: user.offlineTime === null ? 0 : user.offlineTime,
    offlineTime: user.offlineTime === null ? t('AUTH:never_logged_in') : user.offlineTime
  }))
</script>

<template>
  <n-skeleton
    text
    :repeat="5"
    v-if="isPending"
  />

  <div v-else>
    <ReadHistoryModal
      v-model="showModal"
      :user-id="selectUserId"
    />
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
      :page-count="searchData.length === 0 ? allUserInfoData?.data.totalPages : userInfoSearchData?.data.totalPages"
      v-model:page="page"
      v-model:page-size="pageSize"
    />
  </div>
</template>
