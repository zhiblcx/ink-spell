import { selectBookByBookShelfIdQuery, selectMyBookShelfQuery } from '@/features/bookshelf'
import BookShelf from '@/shared/components/BookShelf'
import { AllSelectBookFlag } from '@/shared/enums'
import { useActionBookStore } from '@/shared/store'
import { Ink } from '@/shared/types'
import { useQueryClient } from '@tanstack/react-query'
import { createLazyFileRoute } from '@tanstack/react-router'

export function Page() {
  const [_, setBooks] = useState<Ink[]>([])
  const {
    uploadFileFlag,
    updateAllSelectFlag,
    updateCancelFlag,
    updateShowShelfFlag,
    updateUploadFileFlag,
    updateIsOtherBookShelfFlag
  } = useActionBookStore()

  const { data } = selectMyBookShelfQuery()
  const bookShelfId = data?.data.data[0].id
  const { data: queryBook, isLoading } = selectBookByBookShelfIdQuery(bookShelfId)

  const queryClient = useQueryClient()
  useEffect(() => {
    setBooks(queryBook?.data?.data ?? [])
    updateAllSelectFlag(AllSelectBookFlag.PARTIAL_SELECT_FLAG)
    if (uploadFileFlag) {
      queryClient.invalidateQueries({ queryKey: ['bookshelf_book'] })
      updateUploadFileFlag(false)
    }
    updateIsOtherBookShelfFlag(false)
    return () => {
      updateShowShelfFlag(false)
      updateCancelFlag(true)
    }
  }, [queryBook?.data?.data, uploadFileFlag])

  return (
    <>
      {isLoading ? (
        <Skeleton
          className="p-5"
          active
          paragraph={{ rows: 10 }}
        />
      ) : (
        <BookShelf
          bookShelfId={bookShelfId}
          books={queryBook?.data?.data}
          setBooks={setBooks}
        />
      )}
    </>
  )
}

export const Route = createLazyFileRoute('/_base/')({
  component: () => <Page />
})
