import { deleteBookByBookIdAPI, request } from '@/shared/API'
import InkCard from '@/shared/components/InkCard'
import { AllSelectBookFlag } from '@/shared/enums'
import { useActionBookStore } from '@/shared/store'
import { Ink } from '@/shared/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createLazyFileRoute } from '@tanstack/react-router'
import { message } from 'antd'

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

  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: (item: Ink) => deleteBookByBookIdAPI(item.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookshelf_book'] })
      message.success('删除成功')
    }
  })

  useEffect(() => {
    if (isSuccess) {
      setBooks(queryBook.data?.data)
    }
    return () => {
      updateShowShelfFlag(false)
      updateCancelFlag(true)
    }
  }, [queryBook?.data?.data])

  useEffect(() => {
    if (books.length !== 0) {
      if (cancelFlag) {
        const currentBooks = Array.from(books)
        currentBooks.forEach((item: Ink) => (item.checked = false))
        updateAllSelectFlag(AllSelectBookFlag.PARTIAL_SELECT_FLAG)
        setBooks(currentBooks)
      }
    }
  }, [cancelFlag])

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
      // 删除书本
      const remainBook = books.filter((item) => {
        if (item.checked) {
          mutate(item)
          return false
        }
        return true
      })
      setBooks(remainBook)
      updateDeleteFlag(false)
      updateCancelFlag(true)
    }
  }, [deleteBookFlag])

  return (
    <>
      <div className="flex flex-wrap min-[375px]:justify-center md:justify-start">
        {books.map((item: Ink, index: number) => {
          return (
            <InkCard
              onClickCheckbox={() => {
                // 显示地下那一行菜单
                if (!item.checked) {
                  updateCancelFlag(false)
                }
                const currentBooks: Ink[] = Array.from(books)
                currentBooks[index].checked = !item.checked
                setBooks(currentBooks)

                // 判断用户是否是部分选择
                const flag = currentBooks.some((item) => !item.checked)
                !flag
                  ? updateAllSelectFlag(AllSelectBookFlag.NOT_ALL_SELECT_FLAG)
                  : updateAllSelectFlag(AllSelectBookFlag.PARTIAL_SELECT_FLAG)
              }}
              ink={item}
              customClassName="mr-4 mb-3 mt-3"
              key={item.id}
              cancelFlag={cancelFlag}
            />
          )
        })}
      </div>
    </>
  )
}

export const Route = createLazyFileRoute('/_base/')({
  component: () => <Page />
})
