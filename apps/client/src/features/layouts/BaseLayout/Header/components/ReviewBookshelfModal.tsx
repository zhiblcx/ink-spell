import { applyBookShelfMutation, BookShelfDao, showApplyBookShelfQuery } from '@/features/bookshelf'
import { ReviewStatus } from '@/shared/enums/reviewStatus'
import { Dispatch, SetStateAction } from 'react'

interface ReviewBookshelfProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

export function ReviewBookshelfModal({ open, setOpen }: ReviewBookshelfProps) {
  const { t } = useTranslation(['COMMON'])
  const { data: applyBookshelfData, isLoading } = showApplyBookShelfQuery()
  const queryClient = useQueryClient()
  const { mutate: applyBookshelfMutate } = applyBookShelfMutation(() =>
    queryClient.invalidateQueries({ queryKey: [QueryKeysEnum.REVIEW_BOOKSHELF_KEY] })
  )
  function onClose() {
    setOpen(false)
  }

  return (
    <Drawer
      title={t('last_reading')}
      onClose={onClose}
      open={open}
    >
      {isLoading ? (
        <Skeleton
          className="p-5"
          active
          paragraph={{ rows: 10 }}
        />
      ) : applyBookshelfData?.data.length === 0 ? (
        <EmptyPage name={t('COMMON:no_reading_history')} />
      ) : (
        <ul className="space-y-1">
          {applyBookshelfData?.data.map((item: BookShelfDao) => (
            <li
              key={item.id}
              className="flex justify-between rounded-xl p-2"
            >
              <img
                src={import.meta.env.VITE_SERVER_URL + item.cover}
                className="w-[70px] origin-center rounded-xl object-cover"
              />
              <div className="flex cursor-default flex-col justify-around">
                <div className="flex">
                  <div className="w-[70px] font-bold">{t('COMMON:bookshelf_name')}</div>
                  <div className="w-[160px] truncate">{item.label}</div>
                </div>
                <div className="flex">
                  <div className="w-[70px] font-bold">{t('COMMON:bookshelf_status')}</div>
                  {item.review === ReviewStatus.PENDING && (
                    <div className="w-[160px] truncate text-[#d97706] dark:text-[#f59e0b]">
                      {t('COMMON:review_status.pending')}
                    </div>
                  )}
                  {item.review === ReviewStatus.REJECTED && (
                    <div
                      className="w-[160px] cursor-pointer truncate text-[#dc2626] dark:text-[#f87171]"
                      onClick={() => applyBookshelfMutate(item.id)}
                    >
                      {t('COMMON:review_status.rejected')}
                    </div>
                  )}
                  {item.review === ReviewStatus.APPROVED && (
                    <div className="w-[160px] truncate text-[#059669] dark:text-[#34d399]">
                      {t('COMMON:review_status.approved')}
                    </div>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Drawer>
  )
}
