import {
  cancelCollectBookShelfMutation,
  collectBookShelfMutation,
  selectUserCollectBookShelfByUserIdQuery,
  selectUserCollectBookShelfQuery
} from '@/features/bookshelf'
import { UrlUtils } from '@/shared/utils/UrlUtils'

export const Route = createLazyFileRoute('/_base/otherbookshelf/$userId')({
  component: () => <Page />
})

interface UserCollectType {
  id: number
  userId: number
  bookShelfId: number
}

export function Page() {
  const { t } = useTranslation(['PROMPT'])
  const { userId } = Route.useParams()
  const query = selectUserCollectBookShelfByUserIdQuery(UrlUtils.decodeUrlById(userId))
  const { data: userCollectQuery } = selectUserCollectBookShelfQuery()
  const userCollectBookShelfIds = userCollectQuery?.data.reduce(
    (acc: Array<number>, item: UserCollectType) => {
      return acc.concat(item.bookShelfId)
    },
    []
  )

  const queryClient = useQueryClient()

  // 收藏书架
  const { mutate: collectShelfMutate } = collectBookShelfMutation(() =>
    queryClient.invalidateQueries({ queryKey: [QueryKeysEnum.USER_COLLECT_KEY] })
  )

  // 取消收藏书架
  const { mutate: cancelCollectShelfMutate } = cancelCollectBookShelfMutation(() =>
    queryClient.invalidateQueries({ queryKey: [QueryKeysEnum.USER_COLLECT_KEY] })
  )

  return (
    <>
      {query.data?.data.data.length === 0 ? (
        <EmptyPage name={t('PROMPT:invite_to_share_bookshelf')} />
      ) : (
        <BookShelfDetail
          bookshelf_detail={query.data?.data ?? []}
          userCollectBookShelfIds={userCollectBookShelfIds}
          collectButton={(item) => collectShelfMutate(item.id)}
          cancelCollectButton={(item) => {
            const index = userCollectQuery?.data.findIndex(
              (collect: UserCollectType) => collect.bookShelfId === item.id
            )
            cancelCollectShelfMutate(userCollectQuery?.data[index].id)
          }}
        />
      )}
    </>
  )
}
