import { request } from '@/shared/API'
import BookShelf from '@/shared/components/BookShelf'
import { AllSelectBookFlag } from '@/shared/enums'
import { useActionBookStore } from '@/shared/store'
import { Ink } from '@/shared/types'
import { UrlUtils } from '@/shared/utils/UrlUtils'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createLazyFileRoute, useNavigate } from '@tanstack/react-router'
import { message } from 'antd'
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

  const { data: queryBook, isSuccess } = useQuery({
    queryKey: ['bookshelf_book', params[0]],
    queryFn: () => request.get(`/bookshelf/${params[0]}`)
  })

  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: () => request.delete(`/bookshelf/${params[0]}`),
    onSuccess: (data) => {
      message.success(data.data.message)
      navigate({ to: '/', replace: true })
      queryClient.invalidateQueries({ queryKey: ['bookshelf'] })
    }
  })

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
