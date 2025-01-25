import { useMenuStore } from '@/shared/store'
import { User } from '@/shared/types'
import { MessageType } from '@/shared/types/MessageType'
import { VerticalAlignBottomOutlined } from '@ant-design/icons'
import { TransformTimeUtils } from '@ink-spell/utils'
import clsx from 'clsx'
import React from 'react'
import styles from '../index.module.scss'

interface CharContentType {
  chatContent: React.RefObject<HTMLUListElement>
  setLookUser: React.Dispatch<React.SetStateAction<User | null>>
  setOpenFlag: React.Dispatch<React.SetStateAction<boolean>>
  messages: MessageType[]
  scrollTo: (target?: string | number | undefined, offset?: number | undefined) => void
}

export default function CharContent({
  chatContent,
  setOpenFlag,
  setLookUser,
  messages,
  scrollTo
}: CharContentType) {
  const { menu } = useMenuStore()
  const [count, setCount] = useState(0)

  function handleScrollBottom(scroll: React.UIEvent<HTMLUListElement, UIEvent>) {
    const scrollElement = scroll.target as HTMLElement
    const scrollTop = Math.ceil(scrollElement.scrollTop)
    const scrollHeight = scrollElement.scrollHeight
    const clientHeight = scrollElement.clientHeight
    if (scrollHeight - scrollTop <= clientHeight) {
      setCount(0)
    }
  }

  return (
    <ul
      ref={chatContent}
      onScroll={(scroll) => handleScrollBottom(scroll)}
      className={clsx(
        `scroll absolute mt-2 space-y-4 overflow-y-scroll ${styles.height}`,
        menu === MenuEnum.EXTEND
          ? `min-[375px]:w-[92%] ${styles.width_extend} `
          : `min-[375px]:min-w-[20%] ${styles.width_shrink}`
      )}
    >
      {messages.map((item: MessageType) => {
        return (
          <React.Fragment key={item.id}>
            {item.type.includes(MessageEnum.MESSAGE_OTHER) && (
              <li
                className="ml-2 flex"
                id={`y-item-${item.id}`}
              >
                <Avatar
                  className="cursor-pointer"
                  src={import.meta.env.VITE_SERVER_URL + item.user?.avatar}
                  size={34}
                  onClick={() => {
                    setLookUser(item.user ?? null)
                    setOpenFlag(true)
                  }}
                />
                <div className="ml-2 flex max-w-[80%] flex-col items-start">
                  <div className="flex">
                    <span className="mr-1 text-xs">{item.user?.username}</span>
                    <span className="text-xs text-gray-400">
                      {TransformTimeUtils.formatDateMDHM()}
                    </span>
                  </div>
                  <div className="break-all rounded-md bg-[#f5f5f5] p-2 dark:bg-[#262729]">
                    {item.type.includes(MessageEnum.IMAGE) ? <img src={item.text} /> : item.text}
                  </div>
                </div>
              </li>
            )}

            {item.type.includes(MessageEnum.MESSAGE_SELF) && (
              <li
                className="mr-2 flex justify-end"
                id={`y-item-${item.id}`}
              >
                <div className="mr-2 flex max-w-[80%] flex-col items-end overflow-hidden">
                  <div className="flex">
                    <span className="mr-1 text-xs text-gray-400">
                      {TransformTimeUtils.formatDateMDHM()}
                    </span>
                    <span className="text-xs">{item.user?.username}</span>
                  </div>
                  <div className="break-all rounded-md bg-[#89d961] p-2 dark:bg-[#262729]">
                    {item.type.includes(MessageEnum.IMAGE) ? <img src={item.text} /> : item.text}
                  </div>
                </div>
                <Avatar
                  src={import.meta.env.VITE_SERVER_URL + item.user?.avatar}
                  size={34}
                />
              </li>
            )}

            {(item.type === MessageEnum.JOIN || item.type === MessageEnum.LEAVE) && (
              <li
                className="flex justify-center"
                id={`y-item-${item.id}`}
              >
                {item.type === MessageEnum.LEAVE && (
                  <span className="rounded-md p-2 text-red-400">{item.text}</span>
                )}
                {item.type === MessageEnum.JOIN && (
                  <span className="rounded-md p-2 text-[#89d961]">{item.text}</span>
                )}
              </li>
            )}
          </React.Fragment>
        )
      })}

      {/* 悬浮按钮 */}
      <FloatButton
        icon={<VerticalAlignBottomOutlined />}
        className={clsx(
          count === 0 ? 'hidden' : 'block',
          'min-[375px]:bottom-[100px] min-[375px]:right-[30px] md:bottom-[110px] md:right-[200px]'
        )}
        onClick={() => {
          scrollTo(`#y-item-${messages[messages.length - 1].id}`)
          setCount(0)
        }}
        badge={{ count: count, overflowCount: 99 }}
      />
    </ul>
  )
}
