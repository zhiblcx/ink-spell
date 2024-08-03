import { createLazyFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

import { request } from '@/shared/API'
import BookShelf from '@/shared/components/BookShelf'
import EmptyPage from '@/shared/components/EmptyPage'
import { AllSelectBookFlag } from '@/shared/enums'
import { useActionBookStore } from '@/shared/store'
import { Ink } from '@/shared/types'
import { useQuery, useQueryClient } from '@tanstack/react-query'

interface pageType {
  bookId: number
}

export function Page() {
  const { bookId }: pageType = Route.useParams()

  const [books, setBooks] = useState([] as Ink[])
  const { uploadFileFlag, updateAllSelectFlag, updateCancelFlag, updateShowShelfFlag, updateUploadFileFlag } =
    useActionBookStore()
  const { data: queryBook, isSuccess } = useQuery({
    queryKey: ['bookshelf_book', bookId],
    queryFn: () => request.get(`/bookshelf/${bookId}`)
  })

  const queryClient = useQueryClient()
  useEffect(() => {
    if (isSuccess) {
      setBooks(queryBook.data?.data)
      updateAllSelectFlag(AllSelectBookFlag.PARTIAL_SELECT_FLAG)
      if (uploadFileFlag) {
        queryClient.invalidateQueries({ queryKey: ['bookshelf_book'] })
        updateUploadFileFlag(false)
      }
    }
    return () => {
      updateShowShelfFlag(false)
      updateCancelFlag(true)
    }
  }, [queryBook?.data?.data, uploadFileFlag])

  return (
    <>
      {books.length === 0 ? (
        <EmptyPage name="暂时没有书籍，请先导入书籍哦~" />
      ) : (
        <BookShelf
          books={books}
          setBooks={setBooks}
        />
      )}
    </>
  )
}

export const Route = createLazyFileRoute('/_base/bookshelf/$bookId')({
  component: () => <Page />
})
