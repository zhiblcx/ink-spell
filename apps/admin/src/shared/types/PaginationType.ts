export type PaginationType = {
  page: number
  pageSize: number
  pageCount?: number
  pageSizes: number[]
  showSizePicker: boolean
  onChange: (page: number) => void
  onUpdatePageSize: (pageSize: number) => void
}
