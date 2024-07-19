import { createLazyFileRoute } from '@tanstack/react-router'
import { Page } from '../../index/route.lazy'
import { Button } from 'antd'

export const Route = createLazyFileRoute('/_base/bookshelf/$id')({
  component: () => <BookShelf />
})

function BookShelf() {
  return (
    <>
      <Page />
    </>
  )
}
