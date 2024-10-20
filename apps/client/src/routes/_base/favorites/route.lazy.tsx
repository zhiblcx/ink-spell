import { cancelCollectBookShelfMutation } from '@/features/bookshelf'
import { selectUserCollectBookShelfQuery } from '@/features/bookshelf/query'
import BookShelfDetail from '@/shared/components/BookShelfDetail'
import EmptyPage from '@/shared/components/EmptyPage'
import { QueryKeys } from '@/shared/enums'
import { BookShelfType } from '@/shared/types'
import { useQueryClient } from '@tanstack/react-query'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_base/favorites')({
  component: () => <Page />
})

interface CollectBookShelfType {
  bookShelf: BookShelfType
  id: number
}

function Page() {
  const { data: userCollectQuery } = selectUserCollectBookShelfQuery()

  const queryClient = useQueryClient()
  const { mutate: cancelCollectShelfMutate } = cancelCollectBookShelfMutation(() =>
    queryClient.invalidateQueries({ queryKey: [QueryKeys.USER_COLLECT_KEY] })
  )

  const bookShelfDetail = userCollectQuery?.data.data.reduce(
    (acc: Array<BookShelfType & { collectId: number }>, item: CollectBookShelfType) => {
      return acc.concat({ ...item.bookShelf, collectId: item.id })
    },
    []
  )

  return (
    <>
      {bookShelfDetail === undefined || userCollectQuery?.data.data.length === 0 ? (
        <EmptyPage name="您还没有收藏任何书架呢！快来收藏您喜欢的书架吧！" />
      ) : (
        <BookShelfDetail
          bookshelf_detail={bookShelfDetail ?? []}
          cancelCollectButton={(item) => cancelCollectShelfMutate(item.collectId as number)}
          isIdsFlag={false}
        />
      )}
    </>
  )
}
