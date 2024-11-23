import { Dispatch, SetStateAction } from 'react'

interface RecentlyReadProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

export function RecentlyRead({ open, setOpen }: RecentlyReadProps) {
  const { t } = useTranslation('COMMON')
  function onClose() {
    setOpen(false)
  }

  return (
    <Drawer
      title={t('profile_recently_read')}
      onClose={onClose}
      open={open}
    >
      <ul className="space-y-1">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
          <li
            key={item}
            className="flex cursor-pointer justify-between rounded-xl p-2 hover:bg-[#ececec] dark:hover:bg-[#3a3a3a]"
          >
            <div>
              <div className="flex">
                <div className="w-[100px]">书名</div>
                <div>平凡的世界</div>
              </div>
              <div className="flex">
                <div className="w-[100px]">作者名</div>
                <div>路遥</div>
              </div>
              <div className="flex">
                <div className="w-[100px]">最近一次阅读</div>
                <div>2024/11/23 10:53</div>
              </div>
              <div className="flex">
                <div className="w-[100px]">进度</div>
                <div>50.5%</div>
              </div>
            </div>
            <img
              src="https://via.placeholder.com/80"
              className="rounded-xl"
            />
          </li>
        ))}
      </ul>
    </Drawer>
  )
}
