import { selectBookByBookShelfIdQuery, selectMyBookShelfQuery } from '@/features/bookshelf'
import { Ink } from '@/shared/types'

export const Route = createLazyFileRoute('/_base/')({
  component: () => <Page />
})

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

  const { data: selectMyBookShelfData } = selectMyBookShelfQuery()
  const bookShelfId = selectMyBookShelfData?.data[0].id
  const { data: queryBook, isLoading } = selectBookByBookShelfIdQuery(bookShelfId)

  const queryClient = useQueryClient()

  useEffect(() => {
    setBooks(queryBook?.data ?? [])
    updateAllSelectFlag(AllSelectBookEnum.PARTIAL_SELECT_FLAG)
    if (uploadFileFlag) {
      queryClient.invalidateQueries({ queryKey: [QueryKeysEnum.BOOKSHELF_BOOK_KEY] })
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
          books={queryBook?.data ?? []}
          setBooks={setBooks}
        />
      )}
    </>
  )
}
