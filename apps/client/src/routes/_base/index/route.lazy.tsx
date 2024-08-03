import request from '@/shared/API/request'
import InkCard from '@/shared/components/InkCard'
import { AllSelectBookFlag } from '@/shared/enums'
import { useActionBookStore } from '@/shared/store'
import { Ink } from '@/shared/types'
import { useQuery } from '@tanstack/react-query'
import { createLazyFileRoute } from '@tanstack/react-router'

export function Page() {
  const [books, setBooks] = useState([] as Ink[])
  const {
    allSelectBookFlag,
    cancelFlag,
    deleteBookFlag,
    updateAllSelectFlag,
    updateCancelFlag,
    updateDeleteFlag,
    updateShowShelfFlag
  } = useActionBookStore()

  const { data } = useQuery({
    queryKey: ['bookshelf'],
    queryFn: () => request.get('/bookshelf')
  })

  const bookShelfId = data?.data.data[0].id

  const { data: queryBook, isSuccess } = useQuery({
    queryKey: ['bookshelf_book', bookShelfId],
    queryFn: () => request.get(`/bookshelf/${bookShelfId}`)
  })

  useEffect(() => {
    if (isSuccess) {
      setBooks(queryBook.data?.data)
    }
    return () => {
      updateShowShelfFlag(false)
      updateCancelFlag(true)
    }
  }, [isSuccess])

  useEffect(() => {
    if (books.length !== 0) {
      if (cancelFlag) {
        const currentBooks = Array.from(books)
        currentBooks.forEach((item: Ink) => (item.checked = false))
        updateAllSelectFlag(AllSelectBookFlag.PARTIAL_SELECT_FLAG)
        setBooks(currentBooks)
      }
    }
  }, [books, cancelFlag])

  useEffect(() => {
    if (allSelectBookFlag == AllSelectBookFlag.PARTIAL_SELECT_FLAG) {
      return
    }
    if (allSelectBookFlag == AllSelectBookFlag.ALL_SELECT_FLAG) {
      const currentBooks = Array.from(books)
      currentBooks.forEach((item: Ink) => (item.checked = false))
      setBooks(currentBooks)
    } else if (allSelectBookFlag == AllSelectBookFlag.NOT_ALL_SELECT_FLAG) {
      const currentBooks = Array.from(books)
      currentBooks.forEach((item: Ink) => (item.checked = true))
      setBooks(currentBooks)
    }
  }, [allSelectBookFlag])

  useEffect(() => {
    if (deleteBookFlag) {
      updateDeleteFlag(false)
    }
  }, [deleteBookFlag])

  return (
    <>
      <div className="">
        <div className="flex flex-wrap min-[375px]:justify-center md:justify-start">
          {books.map((item: Ink, index: number) => {
            return (
              <InkCard
                onClickCheckbox={() => {
                  if (!item.checked) {
                    updateCancelFlag(false)
                  }
                  if (item.checked) {
                    updateAllSelectFlag(AllSelectBookFlag.PARTIAL_SELECT_FLAG)
                  }
                  const currentBooks: Ink[] = Array.from(books)
                  currentBooks[index].checked = !item.checked
                  setBooks(currentBooks)
                }}
                ink={item}
                customClassName="mr-4 mb-3 mt-3"
                key={item.id}
                cancelFlag={cancelFlag}
              />
            )
          })}
        </div>
      </div>
    </>
  )
}

export const Route = createLazyFileRoute('/_base/')({
  component: () => <Page />
})
