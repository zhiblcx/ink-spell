import { menuList } from '@/mock'
import { request } from '@/shared/API'
import { Menu } from '@/shared/enums'
import { MessageEnum } from '@/shared/enums/MessageEnum'
import { useMenuStore } from '@/shared/store'
import { User } from '@/shared/types'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from '@tanstack/react-router'
import { InputRef, message } from 'antd'
import clsx from 'clsx'
import lodash from 'lodash'
import React from 'react'
import useSmoothScroll from 'react-smooth-scroll-hook'
import { io } from 'socket.io-client'
import '../index.scss'

interface MessageType {
  id: number
  userId: number
  text: string
  user?: User
  type: string
}

export default function ChatRoom() {
  const URL = import.meta.env.VITE_SERVER_URL
  const socket = io(URL)
  const inputRef = useRef<InputRef>(null)
  const router = useRouter()
  const chatContent = useRef(null)
  const [disableFlag, setDisableFlag] = useState(false)
  const [messageValue, setMessageValue] = useState('')
  const [peopleNumber, setPeopleNumber] = useState(0)
  const [messages, setMessages] = useState([] as MessageType[])
  const { TextArea } = Input
  const { menu } = useMenuStore()
  const { data: query, isSuccess } = useQuery({ queryKey: ['user'], queryFn: () => request.get('/user/profile') })
  const { scrollTo } = useSmoothScroll({
    ref: chatContent,
    speed: Infinity,
    direction: 'y'
  })

  useEffect(() => {
    if (router.latestLocation.pathname !== menuList[2].label) {
      leaveRoom()
    }
  }, [router.latestLocation.pathname])

  useEffect(() => {
    if (isSuccess) {
      socket.on('connect', () => {
        console.log(socket.connected, '连接') // true
        socket.emit('join', { name: query?.data.data.username, id: query?.data.data.id })
      })

      socket.on('join', () => {
        socket.emit('getRoomUsers')
        emitGetMessages()
      })

      const emitGetMessages = lodash.throttle(() => {
        socket.emit('getMessages')
      }, 2000)

      socket.on('getRoomUsers', (num) => {
        setPeopleNumber(num)
      })

      socket.on('leave', (data) => {
        socket.emit('getRoomUsers')
        setMessages((prevMessages) => [...prevMessages, data])
      })

      socket.on('getMessages', (data) => {
        getMessages(data)
      })

      const getMessages = lodash.debounce((data) => {
        const result = data.map((item: MessageType) => {
          if (item.type === MessageEnum.MESSAGE) {
            item.type = item.userId === query?.data.data.id ? MessageEnum.MESSAGE_SELF : MessageEnum.MESSAGE_OTHER
          }
          return item
        })
        setMessages((prevMessages) => [...prevMessages, ...result])
        setTimeout(() => {
          inputRef.current!.focus({ cursor: 'end' })
          scrollTo(`#y-item-${result[result.length - 1].id}`)
        })
      }, 3000)
    }

    return () => {
      socket.off('newMessage', handleNewMessage)
    }
  }, [isSuccess])

  socket.on('err', (e) => {
    console.log('出错了')
    console.log(e)
  })

  // 退出浏览器，退出
  window.onbeforeunload = () => {
    leaveRoom()
  }

  const leaveRoom = () => {
    socket.emit('leave', { name: query?.data.data.username, id: query?.data.data.id })
  }

  const handleNewMessage = (data: MessageType) => {
    console.log('接受到消息', data)
    data.type = data.userId === query?.data.data.id ? MessageEnum.MESSAGE_SELF : MessageEnum.MESSAGE_OTHER
    setMessages((prevMessages) => {
      setTimeout(() => {
        scrollTo(`#y-item-${data.id}`)
      }, 50)
      return [...prevMessages, data]
    })
  }

  socket.on('newMessage', handleNewMessage)

  const sendMessage = () => {
    if (messageValue.trim() === '') {
      message.error('不能发送空白信息')
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
    }, 3000)
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
          <div>房间里有{peopleNumber}人</div>
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
                        src={import.meta.env.VITE_SERVER_URL + item.user?.avatar}
                        size={34}
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
              placeholder="请输入想说的话..."
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
              发送消息
            </Button>
          </div>
        </>
      )}
    </>
  )
}
