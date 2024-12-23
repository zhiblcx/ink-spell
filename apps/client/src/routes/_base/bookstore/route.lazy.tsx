import { createLazyFileRoute } from '@tanstack/react-router'
import { BookStoreTable } from './-components'

export const Route = createLazyFileRoute('/_base/bookstore')({
  component: BookStoreTable
})
