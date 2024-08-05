import { request } from '@/shared/API'
import BookShelf from '@/shared/components/BookShelf'
import { AllSelectBookFlag } from '@/shared/enums'
import { useActionBookStore } from '@/shared/store'
import { Ink } from '@/shared/types'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { createLazyFileRoute } from '@tanstack/react-router'

export function Page() {
  const [books, setBooks] = useState<Ink[]>([])
  const { uploadFileFlag, updateAllSelectFlag, updateCancelFlag, updateShowShelfFlag, updateUploadFileFlag } =
    useActionBookStore()

  const { data } = useQuery({
    queryKey: ['bookshelf'],
    queryFn: () => request.get('/bookshelf')
  })
  const bookShelfId = data?.data.data[0].id
  const { data: queryBook, isSuccess } = useQuery({
    queryKey: ['bookshelf_book', bookShelfId],
    queryFn: () => request.get(`/bookshelf/${bookShelfId}`)
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
    <BookShelf
      books={books}
      setBooks={setBooks}
    />
  )
}

export const Route = createLazyFileRoute('/_base/')({
  component: () => <Page />
})
