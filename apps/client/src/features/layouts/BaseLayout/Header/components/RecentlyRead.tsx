import { coverImg } from '@/assets/images'
import { getReadHistoryQuery } from '@/features/read-history'
import { ReadHistoryVo } from '@/features/read-history/types'
import { IndexedDBBookType } from '@/shared/types'
import { BookUtils } from '@/shared/utils'
import { IndexedDB } from '@/shared/utils/IndexedDBUtils'
import { TransformTimeUtils } from '@ink-spell/utils'
import React, { Dispatch, SetStateAction } from 'react'

interface RecentlyReadProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

export function RecentlyRead({ open, setOpen }: RecentlyReadProps) {
  const { t } = useTranslation(['COMMON'])
  const { data: recentlyBookData, status } = getReadHistoryQuery()
  const [loading, setLoading] = useState(true)
  const [state, setState] = useState<IndexedDBBookType[] | ReadHistoryVo[]>([])

  useEffect(() => {
    if (status === 'error') {
      initData()
      setLoading(false)
    }
    if (status === 'success') {
      setLoading(false)
      setState(recentlyBookData?.data)
    }
  }, [status])

  async function initData() {
    const data = (await IndexedDB.findAll()) as IndexedDBBookType[] | undefined
    if (data !== undefined) {
      setState(data)
    }
  }

  function onClose() {
    setOpen(false)
  }

  return (
    <Drawer
      title={t('last_reading')}
      onClose={onClose}
      open={open}
    >
      {loading ? (
        <Skeleton
          className="p-5"
          active
          paragraph={{ rows: 10 }}
        />
      ) : state.length === 0 ? (
        <EmptyPage name={t('COMMON:no_reading_history')} />
      ) : (
        <ul className="space-y-1">
          {state.map((item: ReadHistoryVo | IndexedDBBookType) => (
            <React.Fragment key={item.id}>
              {'book' in item ? (
                <li
                  className="flex cursor-pointer justify-between rounded-xl p-2 hover:bg-[#ececec] dark:hover:bg-[#3a3a3a]"
                  onClick={() => BookUtils.redirectToBookPage(item.book.id)}
                >
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
              ) : (
                <li
                  className="flex cursor-pointer justify-between rounded-xl p-2 hover:bg-[#ececec] dark:hover:bg-[#3a3a3a]"
                  onClick={() => BookUtils.redirectToBookPage(item.id as number)}
                >
                  <img
                    src={coverImg}
                    className="w-[70px] origin-center rounded-xl object-cover"
                  />
                  <div className="flex items-center justify-center">
                    <div className="w-[70px] font-bold">{t('COMMON:book_title')}</div>
                    <div className="w-[160px] truncate">{item.bookName}</div>
                  </div>
                </li>
              )}
              <Divider />
            </React.Fragment>
          ))}
        </ul>
      )}
    </Drawer>
  )
}
