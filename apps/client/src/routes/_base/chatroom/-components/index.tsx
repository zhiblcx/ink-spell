import { selectAllMessages, selectOneselfInfoQuery } from '@/features/user'
import EmptyPage from '@/shared/components/EmptyPage'
import PersonCard from '@/shared/components/PersonCard'
import { CHAR_ROOM } from '@/shared/constants'
import { Menu } from '@/shared/enums'
import { MessageEnum } from '@/shared/enums/MessageEnum'
import { useMenuStore } from '@/shared/store'
import { User } from '@/shared/types'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from '@tanstack/react-router'
import { InputRef, message } from 'antd'
import clsx from 'clsx'
import React from 'react'
import { useTranslation } from 'react-i18next'
import useSmoothScroll from 'react-smooth-scroll-hook'
import '../index.scss'
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
  const [messages, setMessages] = useState([] as MessageType[])
  const { TextArea } = Input
  const { menu } = useMenuStore()
  const { data: query, isSuccess } = useQuery(selectOneselfInfoQuery)
  const { data: messageQuery, isSuccess: isMessageSuccess } = useQuery(selectAllMessages())
  const { scrollTo } = useSmoothScroll({
    ref: chatContent,
    speed: Infinity,
    direction: 'y'
  })

  useEffect(() => {
    if (router.latestLocation.pathname !== CHAR_ROOM.URL) {
      leaveRoom()
    }
  }, [router.latestLocation.pathname])

  useEffect(() => {
    if (isMessageSuccess) {
      const getMessages = (data: MessageType[]) => {
        const result = data.map((item: MessageType) => {
          if (item.type === MessageEnum.MESSAGE) {
            item.type = item.userId === query?.data.data.id ? MessageEnum.MESSAGE_SELF : MessageEnum.MESSAGE_OTHER
          }
          return item
        })
        setMessages(() => [...(result as MessageType[])])
        setTimeout(() => {
          scrollTo(`#y-item-${result[result.length - 1].id}`)
        }, 200)
      }

      getMessages(messageQuery.data.data)
    }
  }, [isMessageSuccess])

  let reconnect = false
  useEffect(() => {
    if (isSuccess && isMessageSuccess && !reconnect) {
      reconnect = true
      socket.open()
      socket.emit('join', { name: query?.data.data.username, id: query?.data.data.id })

      socket.on('join', (data) => {
        setConnect(true)
        setMessages((prevMessages) => [...prevMessages, data])
        setTimeout(() => {
          scrollTo(`#y-item-${data.id}`)
        }, 200)

        socket.emit('getRoomUsers')
      })

      socket.on('getRoomUsers', (num) => {
        setPeopleNumber(num)
      })

      socket.on('newMessage', handleNewMessage)

      socket.on('leave', (data) => {
        socket.emit('getRoomUsers')
        setMessages((prevMessages) => [...prevMessages, data])
      })

      window.addEventListener('beforeunload', leaveRoom)
    }
  }, [isSuccess])

  const leaveRoom = () => {
    console.log('离开了')
    socket.emit('leave', { name: query?.data.data.username, id: query?.data.data.id })
    socket.close()
  }

  const handleNewMessage = (data: MessageType) => {
    data.type = data.userId === query?.data.data.id ? MessageEnum.MESSAGE_SELF : MessageEnum.MESSAGE_OTHER
    setMessages((prevMessages) => {
      setTimeout(() => {
        scrollTo(`#y-item-${data.id}`)
      }, 100)
      return [...prevMessages, data]
    })
  }

  const sendMessage = () => {
    if (messageValue.trim() === '') {
      message.error(t('PROMPT:no_blank_message'))
      return
    }

    const newMessage = { message: messageValue, userId: query?.data.data.id }
    socket.emit('newMessage', newMessage)
    setMessageValue('')
    handlerDisableButton()
  }

  const handlerDisableButton = () => {
    setDisableFlag(true)
    setTimeout(() => {
      setDisableFlag(false)
    }, 2000)
  }

  return (
    <>
      {messages.length === 0 ? (
        <Skeleton
          className="p-5"
          active
          paragraph={{ rows: 10 }}
        />
      ) : (
        <>
          <div>
            {!connect ? t('PROMPT:failed_to_join_room') : t('PROMPT:people_in_room', { peopleNumber: peopleNumber })}
          </div>
          {!connect ? (
            <EmptyPage name={t('PROMPT:connection_failed')} />
          ) : (
            <>
              <ul
                ref={chatContent}
                className={clsx(
                  'height scroll absolute mt-2 space-y-4 overflow-y-scroll',
                  menu === Menu.EXTEND ? 'w-[93%]' : 'min-[375px]:min-w-[20%] md:min-w-[70%]'
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
                            <div className="break-all rounded-md bg-[#f5f5f5] p-2 dark:bg-[#262729]">{item.text}</div>
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
                            <div className="break-all rounded-md bg-[#89d961] p-2 dark:bg-[#262729]">{item.text}</div>
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
                  className="mx-2"
                >
                  {t('COMMON:send_message')}
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
