import { createLazyFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

import BookShelf from '@/shared/components/BookShelf'
import { inkmock } from '@/mock'
import { useActionBook } from '@/shared/store'

interface pageType {
  inkId: number
}

export const Route = createLazyFileRoute('/_base/bookshelf/$inkId')({
  component: () => <Page />
})

export function Page() {
  const { updateShowShelfFlag, updateCancelFlag } = useActionBook()
  const { inkId }: pageType = Route.useParams()
  const [inks, setInks] = useState(
    inkmock.filter((item) => {
      return item.category_id == inkId
    })
  )

  useEffect(() => {
    setInks(
      inkmock.filter((item) => {
        return item.category_id == inkId
      })
    )
    return () => {
      updateShowShelfFlag(true)
      updateCancelFlag(true)
    }
  }, [inkId])

  return (
    <>
      <BookShelf
        books={inks}
        setBooks={setInks}
      />
    </>
  )
}
