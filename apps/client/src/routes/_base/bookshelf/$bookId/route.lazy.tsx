import { deleteBookShelfMutation } from '@/features/bookshelf'
import { selectBookByBookShelfIdQuery } from '@/features/bookshelf/query'
import BookShelf from '@/shared/components/BookShelf'
import { AllSelectBookFlag } from '@/shared/enums'
import { useActionBookStore } from '@/shared/store'
import { Ink } from '@/shared/types'
import { UrlUtils } from '@/shared/utils/UrlUtils'
import { useQueryClient } from '@tanstack/react-query'
import { createLazyFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
interface pageType {
  bookId: string
}

export function Page() {
  const { bookId }: pageType = Route.useParams()
  const url = UrlUtils.decodeUrlById(bookId)
  const params = url.split('?')

  const navigate = useNavigate()
  const [books, setBooks] = useState([] as Ink[])
  const {
    uploadFileFlag,
    deleteShelfFlag,
    updateAllSelectFlag,
    updateCancelFlag,
    updateShowShelfFlag,
    updateUploadFileFlag,
    updateDeleteShelfFlag,
    updateIsOtherBookShelfFlag
  } = useActionBookStore()

  useEffect(() => {
    if (params.length === 2) {
      updateIsOtherBookShelfFlag(true)
    } else {
      updateIsOtherBookShelfFlag(false)
    }
  }, [bookId])

  const { data: queryBook, isSuccess } = selectBookByBookShelfIdQuery(params[0])

  const queryClient = useQueryClient()
  const { mutate } = deleteBookShelfMutation(params[0], () =>
    queryClient.invalidateQueries({ queryKey: ['bookshelf'] })
  )

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
      updateShowShelfFlag(true)
      updateCancelFlag(true)
    }
  }, [queryBook?.data?.data, uploadFileFlag])

  useEffect(() => {
    if (deleteShelfFlag) {
      mutate()
      updateDeleteShelfFlag(false)
    }
  }, [deleteShelfFlag])

  return (
    <BookShelf
      bookShelfId={parseInt(params[0])}
      books={books}
      setBooks={setBooks}
    />
  )
}

export const Route = createLazyFileRoute('/_base/bookshelf/$bookId')({
  component: () => <Page />
})
