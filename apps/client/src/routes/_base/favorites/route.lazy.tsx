import {
  cancelCollectBookShelfMutation,
  selectUserCollectBookShelfQuery
} from '@/features/bookshelf'
import { BookShelfDetail, EmptyPage } from '@/shared/components'
import { QueryKeys } from '@/shared/enums'
import { BookShelfType } from '@/shared/types'
import { useTranslation } from 'react-i18next'

export const Route = createLazyFileRoute('/_base/favorites')({
  component: () => <Page />
})

interface CollectBookShelfType {
  bookShelf: BookShelfType
  id: number
}

function Page() {
  const { t } = useTranslation(['PROMPT'])
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
        <EmptyPage name={t('PROMPT:no_bookshelf_collected')} />
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
