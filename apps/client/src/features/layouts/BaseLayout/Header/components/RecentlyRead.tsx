import { getReadHistoryQuery } from '@/features/read-history'
import { ReadHistoryVo } from '@/features/read-history/types'
import { BookUtils } from '@/shared/utils'
import { TransformTimeUtils } from '@ink-spell/utils'
import React, { Dispatch, SetStateAction } from 'react'

interface RecentlyReadProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

export function RecentlyRead({ open, setOpen }: RecentlyReadProps) {
  const { t } = useTranslation(['COMMON'])
  const { data: recentlyBook, isLoading } = getReadHistoryQuery()

  function onClose() {
    setOpen(false)
  }

  return (
    <Drawer
      title={t('profile_recently_read')}
      onClose={onClose}
      open={open}
    >
      {!isLoading ? (
        recentlyBook?.data.length === 0 ? (
          <EmptyPage name={t('COMMON:no_reading_history')} />
        ) : (
          <ul className="space-y-1">
            {recentlyBook?.data.map((item: ReadHistoryVo) => (
              <React.Fragment key={item.id}>
                <li className="flex cursor-pointer justify-between rounded-xl p-2 hover:bg-[#ececec] dark:hover:bg-[#3a3a3a]">
                  <img
                    src={import.meta.env.VITE_SERVER_URL + item.book.cover}
                    className="w-[70px] origin-center rounded-xl object-cover"
                  />
                  <div>
                    <div className="flex">
                      <div className="w-[70px] font-bold">{t('COMMON:book_title')}</div>
                      <div className="w-[160px] truncate">{item.book.name}</div>
                    </div>
                    <div className="flex">
                      <div className="w-[70px] font-bold">{t('COMMON:author')}</div>
                      <div className="w-[160px] truncate">
                        {item.book.author ? item.book.author : t('COMMON:no_author')}
                      </div>
                    </div>
                    <div className="flex">
                      <div className="w-[70px] font-bold">{t('COMMON:last_reading')}</div>
                      <div className="w-[160px] truncate">
                        {TransformTimeUtils.formatDateYMDHM(new Date(item.endTime))}
                      </div>
                    </div>
                    <div className="flex">
                      <div className="w-[70px] font-bold">{t('COMMON:schedule')}</div>
                      <div className="w-[160px] truncate">
                        {BookUtils.acquireBookSchedule(item.book.id)}
                      </div>
                    </div>
                  </div>
                </li>
                <Divider />
              </React.Fragment>
            ))}
          </ul>
        )
      ) : (
        <Skeleton
          className="p-5"
          active
          paragraph={{ rows: 10 }}
        />
      )}
    </Drawer>
  )
}
