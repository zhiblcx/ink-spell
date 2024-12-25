<script setup lang="ts">
import { PaginationParams } from '@/shared/constants'
import { DataTableColumn } from 'naive-ui'

interface DataTablePaginationType {
  columns: Array<DataTableColumn>
  data: any[] | undefined
  pageCount: number | undefined
}

const props = defineProps<DataTablePaginationType>()
const page = defineModel<number>('page', { required: true })
const pageSize = defineModel<number>('pageSize', { required: true })

const pagination = computed(() => ({
  page: page.value,
  pageSize: pageSize.value,
  pageCount: props.pageCount ?? PaginationParams.DEFAULT_PAGECOUNT,
  pageSizes: PaginationParams.DEFAULT_PAGESIZES,
  showSizePicker: true,
  onChange: (currentPage: number) => {
    page.value = currentPage
    pagination.value.page = currentPage
  },
  onUpdatePageSize: (currentPageSize: number) => {
    pageSize.value = currentPageSize
    pagination.value.pageSize = currentPageSize
  }
}))
</script>

<template>
  <n-data-table
    size="small"
    :columns="props.columns"
    :bordered="false"
    :single-line="false"
    :pagination="pagination"
    :max-height="495"
    striped
    remote
    :scroll-x="1400"
    :data="props.data ?? []"
  />
</template>
