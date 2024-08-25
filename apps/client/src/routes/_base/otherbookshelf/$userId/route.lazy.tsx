import { cancelCollectBookShelfMutation, collectBookShelfMutation } from '@/features/bookshelf'
import { selectUserCollectBookShelfByUserIdQuery, selectUserCollectBookShelfQuery } from '@/features/bookshelf/query'
import BookShelfDetail from '@/shared/components/BookShelfDetail'
import EmptyPage from '@/shared/components/EmptyPage'
import { UrlUtils } from '@/shared/utils/UrlUtils'
import { useQueryClient } from '@tanstack/react-query'
import { createLazyFileRoute } from '@tanstack/react-router'

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
  const query = selectUserCollectBookShelfByUserIdQuery(UrlUtils.decodeUrlById(userId))
  const { data: userCollectQuery } = selectUserCollectBookShelfQuery()
  const userCollectBookShelfIds = userCollectQuery?.data.data.reduce((acc: Array<number>, item: UserCollectType) => {
    return acc.concat(item.bookShelfId)
  }, [])

  const queryClient = useQueryClient()

  // 收藏书架
  const { mutate: collectShelfMutate } = collectBookShelfMutation(() =>
    queryClient.invalidateQueries({ queryKey: ['user-collect'] })
  )

  // 取消收藏书架
  const { mutate: cancelCollectShelfMutate } = cancelCollectBookShelfMutation(() =>
    queryClient.invalidateQueries({ queryKey: ['user-collect'] })
  )

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
