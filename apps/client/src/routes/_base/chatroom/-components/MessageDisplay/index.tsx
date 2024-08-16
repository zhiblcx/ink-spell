import { Menu } from '@/shared/enums'
import { MessageEnum } from '@/shared/enums/MessageEnum'
import { useMenuStore } from '@/shared/store'
import { User } from '@/shared/types'
import clsx from 'clsx'
import lodash from 'lodash'
import React from 'react'
import useSmoothScroll from 'react-smooth-scroll-hook'
import { Socket } from 'socket.io-client'

interface MessageType {
  id: number
  userId: number
  text: string
  user?: User
  type: string
}

interface MessageDisplayType {
  socket: Socket
  user: User
}

export default function MessageDisplay({ socket, user }: MessageDisplayType) {
  const chatContent = useRef(null)
  const [peopleNumber, setPeopleNumber] = useState(0)
  const [messages, setMessages] = useState([] as MessageType[])
  const { menu } = useMenuStore()
  const { scrollTo } = useSmoothScroll({
    ref: chatContent,
    speed: Infinity,
    direction: 'y'
  })

  useEffect(() => {
    socket.on('join', () => {
      socket.emit('getRoomUsers')
      emitGetMessages()
    })

    const emitGetMessages = lodash.debounce(() => {
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

    const getMessages = (data: MessageType[]) => {
      const result = data.map((item: MessageType) => {
        if (item.type === MessageEnum.MESSAGE) {
          if (item.userId === user.id) {
            return {
              ...item,
              type: MessageEnum.MESSAGE_SELF
            }
          } else {
            return {
              ...item,
              type: MessageEnum.MESSAGE_OTHER
            }
          }
        }
        return item
      })
      setMessages((prevMessages) => [...prevMessages, ...result])
      setTimeout(() => {
        scrollTo(`#y-item-${result[result.length - 1].id}`)
      }, 0)
    }
  }, [user])

  return (
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
                  {item.type === MessageEnum.LEAVE && <span className="rounded-md p-2 text-red-400">{item.text}</span>}
                  {item.type === MessageEnum.JOIN && <span className="rounded-md p-2 text-[#89d961]">{item.text}</span>}
                </li>
              )}
            </React.Fragment>
          )
        })}
      </ul>
    </>
  )
}
