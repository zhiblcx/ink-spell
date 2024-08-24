import { request } from '@/shared/API'
import BookShelfDetail from '@/shared/components/BookShelfDetail'
import EmptyPage from '@/shared/components/EmptyPage'
import { UrlUtils } from '@/shared/utils/UrlUtils'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createLazyFileRoute } from '@tanstack/react-router'
import { message } from 'antd'
import { AxiosError } from 'axios'

export const Route = createLazyFileRoute('/_base/otherbookshelf/$userId')({
  component: () => <Page />
})

interface UserCollectType {
  id: number
  userId: number
  bookShelfId: number
}

export function Page() {
  const { userId } = Route.useParams()

  const query = useQuery({
    queryKey: ['user-bookshelf'],
    queryFn: () => request.get(`/user/bookshelf/${UrlUtils.decodeUrlById(userId)}`)
  })

  const { data: userCollectQuery } = useQuery({
    queryKey: ['user-collect'],
    queryFn: () => request.get('/collect/bookshelf')
  })

  const userCollectBookShelfIds = userCollectQuery?.data.data.reduce((acc: Array<number>, item: UserCollectType) => {
    return acc.concat(item.bookShelfId)
  }, [])

  const queryClient = useQueryClient()

  // 收藏书架
  const { mutate: collectShelfMutate } = useMutation({
    mutationFn: (bookShelfId: number) => request.post(`/collect/bookshelf/${bookShelfId}`),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['user-collect'] })
      message.success(data.data.message)
    },
    onError: (result: AxiosError) => {
      const data = (result.response?.data as { message?: string })?.message ?? '服务器错误'
      message.error(data)
    }
  })

  // 取消收藏书架
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

  return (
    <>
      {query.data?.data.data.length === 0 ? (
        <EmptyPage name="该用户还没有公开书架哦！快邀请TA分享吧！" />
      ) : (
        <BookShelfDetail
          bookshelf_detail={query.data?.data.data ?? []}
          userCollectBookShelfIds={userCollectBookShelfIds}
          collectButton={(item) => collectShelfMutate(item.id)}
          cancelCollectButton={(item) => {
            const index = userCollectQuery?.data.data.findIndex(
              (collect: UserCollectType) => collect.bookShelfId === item.id
            )
            cancelCollectShelfMutate(userCollectQuery?.data.data[index].id)
          }}
        />
      )}
    </>
  )
}
