import { request } from '@/shared/API'
import BookShelf from '@/shared/components/BookShelf'
import EmptyPage from '@/shared/components/EmptyPage'
import { AllSelectBookFlag } from '@/shared/enums'
import { useActionBookStore } from '@/shared/store'
import { Ink } from '@/shared/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createLazyFileRoute, useNavigate } from '@tanstack/react-router'
import { message } from 'antd'
import { useEffect, useState } from 'react'
interface pageType {
  bookId: number
}

export function Page() {
  const { bookId }: pageType = Route.useParams()
  const navigate = useNavigate()
  const [books, setBooks] = useState([] as Ink[])
  const {
    uploadFileFlag,
    deleteShelfFlag,
    updateAllSelectFlag,
    updateCancelFlag,
    updateShowShelfFlag,
    updateUploadFileFlag,
    updateDeleteShelfFlag
  } = useActionBookStore()

  const { data: queryBook, isSuccess } = useQuery({
    queryKey: ['bookshelf_book', bookId],
    queryFn: () => request.get(`/bookshelf/${bookId}`)
  })

  const { mutate } = useMutation({
    mutationFn: () => request.delete(`/bookshelf/${bookId}`),
    onSuccess: (data) => {
      message.success(data.data.message)
      navigate({ to: '/', replace: true })
    }
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
