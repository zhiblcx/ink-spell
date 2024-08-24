import { request } from '@/shared/API'
import BookShelfDetail from '@/shared/components/BookShelfDetail'
import EmptyPage from '@/shared/components/EmptyPage'
import { BookShelfType } from '@/shared/types/bookshelf'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createLazyFileRoute } from '@tanstack/react-router'
import { message } from 'antd'
import { AxiosError } from 'axios'

export const Route = createLazyFileRoute('/_base/collectbookshelf')({
  component: () => <Page />
})

interface CollectBookShelfType {
  bookShelf: BookShelfType
  id: number
}

function Page() {
  const { data: userCollectQuery } = useQuery({
    queryKey: ['user-collect'],
    queryFn: () => request.get('/collect/bookshelf')
  })

  const queryClient = useQueryClient()
  const { mutate: cancelCollectShelfMutate } = useMutation({
    mutationFn: (bookShelfId: number) => request.delete(`/collect/bookshelf/${bookShelfId}`),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['user-collect'] })
      message.success(data.data.message)
    },
    onError: (result: AxiosError) => {
      const data = (result.response?.data as { message?: string })?.message ?? '服务器错误'
      message.error(data)
    }
  })

  const bookShelfDetail = userCollectQuery?.data.data.reduce(
    (acc: Array<BookShelfType & { collectId: number }>, item: CollectBookShelfType) => {
      return acc.concat({ ...item.bookShelf, collectId: item.id })
    },
    []
  )

  return (
    <>
      {bookShelfDetail.length === 0 ? (
        <EmptyPage name="您还没有收藏任何书架呢！快来收藏您喜欢的书架吧！" />
      ) : (
        <BookShelfDetail
          bookshelf_detail={bookShelfDetail ?? []}
          cancelCollectButton={(item) => cancelCollectShelfMutate(item.collectId)}
          isIdsFlag={false}
        />
      )}
    </>
  )
}
