import { deleteBookShelfMutation } from '@/features/bookshelf'
import { selectBookByBookShelfIdQuery } from '@/features/bookshelf/query'
import { Ink } from '@/shared/types'
import { UrlUtils } from '@/shared/utils'
import { useEffect, useState } from 'react'
interface pageType {
  bookshelfId: string
}

export function Page() {
  const { bookshelfId }: pageType = Route.useParams()
  const url = UrlUtils.decodeUrlById(bookshelfId)
  const params = url.split('?')

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
  }, [bookshelfId])

  const { data: queryBook, isSuccess } = selectBookByBookShelfIdQuery(params[0])

  const queryClient = useQueryClient()
  const { mutate } = deleteBookShelfMutation(params[0], () =>
    queryClient.invalidateQueries({ queryKey: [QueryKeysEnum.BOOKSHELF_KEY] })
  )

  useEffect(() => {
    if (isSuccess) {
      setBooks(queryBook.data)
      updateAllSelectFlag(AllSelectBookEnum.PARTIAL_SELECT_FLAG)
      if (uploadFileFlag) {
        queryClient.invalidateQueries({
          queryKey: [QueryKeysEnum.BOOKSHELF_BOOK_KEY]
        })
        updateUploadFileFlag(false)
      }
    }
    return () => {
      updateShowShelfFlag(true)
      updateCancelFlag(true)
    }
  }, [queryBook?.data, uploadFileFlag])

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

export const Route = createLazyFileRoute('/_base/bookshelf/$bookshelfId')({
  component: () => <Page />
})
