import { inkmock } from '@/mock/inkmock'
import request from '@/shared/API/request'
import InkCard from '@/shared/components/InkCard'
import { AllSelectBookFlag } from '@/shared/enums'
import { useActionBookStore } from '@/shared/store'
import { Ink } from '@/shared/types'
import { useQuery } from '@tanstack/react-query'
import { createLazyFileRoute } from '@tanstack/react-router'
import { message } from 'antd'

export function Page() {
  const [books, setBooks] = useState(inkmock.map((item) => ({ ...item, checked: false })))
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

  const queryBook = useQuery({
    queryKey: ['bookshelf_book', bookShelfId],
    queryFn: () => request.get(`/bookshelf/${bookShelfId}`)
  })

  console.log(queryBook)

  useEffect(() => {
    return () => {
      updateShowShelfFlag(false)
      updateCancelFlag(true)
    }
  }, [])

  useEffect(() => {
    if (allSelectBookFlag == AllSelectBookFlag.PARTIAL_SELECT_FLAG) {
      return
    }
    if (allSelectBookFlag == AllSelectBookFlag.ALL_SELECT_FLAG) {
      const currentBooks = Array.from(books)
      currentBooks.forEach((item) => {
        item.checked = false
      })
      setBooks(currentBooks)
    } else if (allSelectBookFlag == AllSelectBookFlag.NOT_ALL_SELECT_FLAG) {
      const currentBooks = Array.from(books)
      currentBooks.forEach((item) => {
        item.checked = true
      })
      setBooks(currentBooks)
    }
  }, [allSelectBookFlag])

  useEffect(() => {
    if (cancelFlag) {
      const currentBooks = Array.from(books)
      currentBooks.forEach((item) => {
        item.checked = false
      })
      updateAllSelectFlag(AllSelectBookFlag.PARTIAL_SELECT_FLAG)
      setBooks(currentBooks)
    }
  }, [cancelFlag])

  useEffect(() => {
    if (deleteBookFlag) {
      const deleteIds = books.reduce((ids: number[], book: Ink) => {
        if (book.checked) {
          ids.push(book.id)
        }
        return ids
      }, [])
      if (deleteIds.length != 0) {
        setBooks(books.filter((book) => !deleteIds.includes(book.id)))
        message.success('删除成功')
      }
      updateDeleteFlag(false)
    }
  }, [deleteBookFlag])

  return (
    <>
      <div className="">
        <div className="flex flex-wrap min-[375px]:justify-center md:justify-start">
          {queryBook.data?.data.data.map((item, index) => {
            return (
              <InkCard
                onClickCheckbox={() => {
                  if (!item.checked) {
                    updateCancelFlag(false)
                  }
                  if (item.checked) {
                    updateAllSelectFlag(AllSelectBookFlag.PARTIAL_SELECT_FLAG)
                  }
                  const currentBooks = Array.from(books)
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
