import { selectOneselfInfoQuery } from '@/features/user'
import { CHAR_ROOM } from '@/shared/constants'
import { Menu, MessageEnum } from '@/shared/enums'
import { useMenuStore } from '@/shared/store'
import { User } from '@/shared/types'
import { VerticalAlignBottomOutlined } from '@ant-design/icons'
import { InputRef, message } from 'antd'
import clsx from 'clsx'
import React from 'react'
import { useTranslation } from 'react-i18next'
import useSmoothScroll from 'react-smooth-scroll-hook'
import styles from '../index.module.scss'
import { socket } from './socket.io'

interface MessageType {
  id: number
  userId: number
  text: string
  user?: User
  type: string
}

export default function ChatRoom() {
  const { t } = useTranslation(['COMMON', 'VALIDATION', 'PROMPT'])
  const inputRef = useRef<InputRef>(null)
  const router = useRouter()
  const chatContent = useRef(null)
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
  const { data: query, isSuccess } = selectOneselfInfoQuery()
  const { scrollTo } = useSmoothScroll({
    ref: chatContent,
    speed: Infinity,
    direction: 'y'
  })
  let reconnect = false

  // 是否离开聊天室
  useEffect(() => {
    if (router.latestLocation.pathname !== CHAR_ROOM.URL) {
      leaveRoom()
    }
  }, [router.latestLocation.pathname])

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
      scrollTo(`#y-item-${result[result.length - 1].id}`)
    }, 200)
  }

  // 初始化数据
  useEffect(() => {
    if (isSuccess && !reconnect) {
      reconnect = true
      socket.open()
      socket.emit('join', { name: query?.data.username, id: query?.data.id })

      socket.on('join', (data) => {
        setConnect(true)
        if (query?.data.id !== data.userId) {
          handleNewMessage(data)
        }
        socket.emit('getMessages')
        socket.emit('getRoomUsers')
      })

      socket.once('getMessages', (data) => {
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

  // 离开房间
  const leaveRoom = () => {
    socket.emit('leave', { name: query?.data.username, id: query?.data.id })
    socket.close()
  }

  // 处理新消息
  const handleNewMessage = (data: MessageType) => {
    data.type =
      data.userId === query?.data.id ? MessageEnum.MESSAGE_SELF : MessageEnum.MESSAGE_OTHER
    if (chatContent.current) {
      const container = chatContent.current as HTMLElement
      if (
        Math.ceil(container.scrollHeight) - Math.floor(container.scrollTop) <=
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

  // 发送消息后禁用按钮，2秒后启用
  const handlerDisableButton = () => {
    setDisableFlag(true)
    setTimeout(() => {
      setDisableFlag(false)
    }, 2000)
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
                onScroll={(scroll) => {
                  const scrollTop = Math.ceil((scroll.target as HTMLElement).scrollTop)
                  const scrollHeight = (scroll.target as HTMLElement).scrollHeight
                  const clientHeight = (scroll.target as HTMLElement).clientHeight
                  if (scrollHeight - scrollTop <= clientHeight) {
                    setCount(0)
                  }
                }}
                className={clsx(
                  `scroll absolute mt-2 space-y-4 overflow-y-scroll ${styles.height}`,
                  menu === Menu.EXTEND
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
                            <span className="text-xs">{item.user?.username}</span>
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
                            <span className="text-xs">{item.user?.username}</span>
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
              <div
                className={clsx(
                  menu === Menu.EXTEND ? '' : 'min-[375px]:hidden md:flex',
                  'absolute bottom-8 flex items-center space-x-3 min-[375px]:min-w-[90%] md:min-w-[70%]'
                )}
              >
                <TextArea
                  value={messageValue}
                  onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                    setMessageValue(e.target.value)
                  }}
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
