import { selectBookByBookShelfIdQuery, selectMyBookShelfQuery } from '@/features/bookshelf'
import { AllSelectBookFlag, QueryKeys } from '@/shared/enums'
import { useActionBookStore } from '@/shared/store'
import { Ink } from '@/shared/types'

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
  const bookShelfId = data?.data[0].id
  const { data: queryBook, isLoading } = selectBookByBookShelfIdQuery(bookShelfId)

  const queryClient = useQueryClient()
  useEffect(() => {
    setBooks(queryBook?.data ?? [])
    updateAllSelectFlag(AllSelectBookFlag.PARTIAL_SELECT_FLAG)
    if (uploadFileFlag) {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.BOOKSHELF_BOOK_KEY] })
      updateUploadFileFlag(false)
    }
    updateIsOtherBookShelfFlag(false)
    return () => {
      updateShowShelfFlag(false)
      updateCancelFlag(true)
    }
  }, [queryBook?.data, uploadFileFlag])

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
          books={queryBook?.data}
          setBooks={setBooks}
        />
      )}
    </>
  )
}

export const Route = createLazyFileRoute('/_base/')({
  component: () => <Page />
})
