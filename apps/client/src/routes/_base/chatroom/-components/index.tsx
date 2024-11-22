import { selectOneselfInfoQuery } from '@/features/user'
import { ChatEmojiAndPhoto } from '@/shared/components'
import { CHAR_ROOM } from '@/shared/constants'
import { useEmojiStore, useMenuStore } from '@/shared/store'
import { User } from '@/shared/types'
import { TransformTimeUtils } from '@/shared/utils'
import { VerticalAlignBottomOutlined } from '@ant-design/icons'
import { message } from 'antd'
import { TextAreaRef } from 'antd/es/input/TextArea'
import clsx from 'clsx'
import React from 'react'
import useSmoothScroll from 'react-smooth-scroll-hook'
import styles from '../index.module.scss'
import { socket } from './socket.io'

interface MessageType {
  id: number
  userId: number
  text: string
  user?: User
  type: string
  createTimer: string
}

export default function ChatRoom() {
  const { t } = useTranslation(['COMMON', 'VALIDATION', 'PROMPT'])
  const inputRef = useRef<TextAreaRef>(null)
  const chatContent = useRef<HTMLUListElement>(null)
  const location = useLocation()
  const [connect, setConnect] = useState(false)
  const [lookUser, setLookUser] = useState<User | null>(null)
  const [openFlag, setOpenFlag] = useState(false)
  const [disableFlag, setDisableFlag] = useState(false)
  const [messageValue, setMessageValue] = useState('')
  const [peopleNumber, setPeopleNumber] = useState(0)
  const [loading, setLoading] = useState(true)
  const [messages, setMessages] = useState([] as MessageType[])
  const [count, setCount] = useState(0)
  const { TextArea } = Input
  const { menu } = useMenuStore()
  const { clickEmoji } = useEmojiStore()
  const { data: query, isSuccess } = selectOneselfInfoQuery()
  const { scrollTo } = useSmoothScroll({
    ref: chatContent,
    speed: Infinity,
    direction: 'y'
  })
  let reconnect = false

  useEffect(() => {
    if (clickEmoji.emoji) {
      if (messageValue === undefined || messageValue === '') {
        setMessageValue(clickEmoji.emoji)
      } else {
        // 此时输入框已有文字 selectionStart
        // inputRef.current?.resizableTextArea?.textArea.selectionStart 此时光标下标
        // 将 clickEmoji 插入到光标位置
        const start = inputRef.current?.resizableTextArea?.textArea.selectionStart
        const end = inputRef.current?.resizableTextArea?.textArea.selectionEnd
        const value = messageValue.slice(0, start) + clickEmoji.emoji + messageValue.slice(end)
        setMessageValue(value)
      }
    }
  }, [clickEmoji.timer])

  // 初始化数据
  useEffect(() => {
    if (isSuccess && !reconnect) {
      console.log('正在连接')
      reconnect = true
      socket.open()
      socket.emit('join', { name: query?.data.username, id: query?.data.id })

      socket.on('join', (data) => {
        console.log('连接成功')
        setConnect(true)
        if (query?.data.id !== data.userId) {
          handleNewMessage(data)
        }
        socket.emit('getMessages')
        socket.emit('getRoomUsers')
      })

      socket.once('getMessages', (data: MessageType[]) => {
        acquireMessage(data)
      })

      socket.on('getRoomUsers', (num) => {
        setPeopleNumber(num)
      })

      socket.on('newMessage', handleNewMessage)

      socket.on('leave', (data) => {
        socket.emit('getRoomUsers')
        setMessages((prevMessages) => [...prevMessages, data])
        setCount((preCount) => preCount + 1)
      })

      // 关闭网站触发
      window.addEventListener('beforeunload', leaveRoom)
    }
  }, [isSuccess])

  // 离开页面退出房间
  useEffect(() => {
    if (location.pathname !== CHAR_ROOM.URL) {
      leaveRoom()
    }
  }, [location])

  function acquireMessage(data: MessageType[]) {
    // 获取历史消息
    const result = data.map((item: MessageType) => {
      if (item.type === MessageEnum.MESSAGE) {
        item.type =
          item.userId === query?.data.id ? MessageEnum.MESSAGE_SELF : MessageEnum.MESSAGE_OTHER
      }
      return item
    })

    setMessages(() => [...(result as MessageType[])])

    setLoading(false)
    setTimeout(() => {
      if (chatContent.current) {
        chatContent.current.scrollTop = chatContent.current.scrollHeight
      }
    })
  }

  // 离开房间
  const leaveRoom = () => {
    console.log('离开房间')
    socket.emit('leave', { name: query?.data.username, id: query?.data.id })
    socket.close()
  }

  // 处理新消息
  const handleNewMessage = (data: MessageType) => {
    console.log(data)
    if (data.type !== MessageEnum.JOIN) {
      data.type =
        data.userId === query?.data.id ? MessageEnum.MESSAGE_SELF : MessageEnum.MESSAGE_OTHER
    }
    if (chatContent.current) {
      const container = chatContent.current
      if (
        Math.ceil(container.scrollHeight) - 5 - Math.floor(container.scrollTop) <=
          Math.ceil(container.clientHeight) ||
        data.type === MessageEnum.MESSAGE_SELF
      ) {
        setMessages((prevMessages) => {
          setTimeout(() => {
            scrollTo(`#y-item-${data.id}`)
          }, 100)
          return [...prevMessages, data]
        })
      } else {
        setMessages((prevMessages) => [...prevMessages, data])
        setCount((preCount) => preCount + 1)
      }
    }
  }

  // 用户发送消息
  const sendMessage = () => {
    if (messageValue.trim() === '') {
      message.error(t('PROMPT:no_blank_message'))
      return
    }
    const newMessage = { message: messageValue, userId: query?.data.id }
    socket.emit('newMessage', newMessage)
    setMessageValue('')
    handlerDisableButton()
  }

  // 发送消息后禁用按钮，1秒后启用
  const handlerDisableButton = () => {
    setDisableFlag(true)
    setTimeout(() => {
      setDisableFlag(false)
    }, 1000)
  }

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
    <>
      {loading ? (
        <Skeleton
          className="p-5"
          active
          paragraph={{ rows: 10 }}
        />
      ) : (
        <>
          <div>
            {!connect
              ? t('PROMPT:failed_to_join_room')
              : t('PROMPT:people_in_room', { peopleNumber: peopleNumber })}
          </div>
          {!connect ? (
            <EmptyPage name={t('PROMPT:connection_failed')} />
          ) : (
            <>
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
                      {item.type === MessageEnum.MESSAGE_OTHER && (
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
                              {item.text}
                            </div>
                          </div>
                        </li>
                      )}

                      {item.type === MessageEnum.MESSAGE_SELF && (
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
                              {item.text}
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

              <div className="absolute bottom-8 pt-1 min-[375px]:min-w-[90%] md:min-w-[70%]">
                <ChatEmojiAndPhoto />
                <div
                  className={clsx(
                    menu === MenuEnum.EXTEND ? '' : 'min-[375px]:hidden md:flex',
                    'mt-3 flex items-center space-x-3'
                  )}
                >
                  <TextArea
                    value={messageValue}
                    onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                      setMessageValue(e.target.value)
                    }
                    ref={inputRef}
                    placeholder={t('VALIDATION:enter_message')}
                    showCount
                    onPressEnter={sendMessage}
                    maxLength={200}
                    style={{ resize: 'none' }}
                  />
                  <Button
                    onClick={sendMessage}
                    disabled={disableFlag}
                    className="min-[375px]:min-w-[70px]"
                  >
                    {t('COMMON:send')}
                  </Button>
                </div>
              </div>
            </>
          )}
          <PersonCard
            openFlag={openFlag}
            setOpenFlag={setOpenFlag}
            lookUser={lookUser as User}
          />
        </>
      )}
    </>
  )
}
