import { createLazyFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

import { inkmock } from '@/mock'
import BookShelf from '@/shared/components/BookShelf'
import EmptyPage from '@/shared/components/EmptyPage'
import { useActionBookStore } from '@/shared/store'

interface pageType {
  inkId: number
}

export const Route = createLazyFileRoute('/_base/bookshelf/$inkId')({
  component: () => <Page />
})

export function Page() {
  const { updateShowShelfFlag, updateCancelFlag } = useActionBookStore()
  const { inkId }: pageType = Route.useParams()
  const [inks, setInks] = useState(
    inkmock.filter((item) => {
      return item.bookshlef_id == inkId
    })
  )

  useEffect(() => {
    setInks(
      inkmock.filter((item) => {
        return item.bookshlef_id == inkId
      })
    )
    return () => {
      updateShowShelfFlag(true)
      updateCancelFlag(true)
    }
  }, [inkId])

  return (
    <>
      {inks.length === 0 ? (
        <EmptyPage name="暂时没有书籍，请先导入书籍哦~" />
      ) : (
        <BookShelf
          books={inks}
          setBooks={setInks}
        />
      )}
    </>
  )
}
