import { request } from '@/shared/API'
import { Menu } from '@/shared/enums'
import { useMenuStore } from '@/shared/store'
import { User } from '@/shared/types'
import { useQuery } from '@tanstack/react-query'
import { createLazyFileRoute } from '@tanstack/react-router'
import { InputRef } from 'antd'
import clsx from 'clsx'
import { io } from 'socket.io-client'
import './index.scss'

export const Route = createLazyFileRoute('/_base/chatroom')({
  component: () => <Page />
})

interface MessageType {
  userId: number
  text: string
  user?: User
}

function Page() {
  const { TextArea } = Input
  const URL = import.meta.env.VITE_SERVER_URL
  const socket = io(URL)
  const inputRef = useRef<InputRef>(null)
  const [messageValue, setMessageValue] = useState('')
  const [peopleNumber, setPeopleNumber] = useState(0)
  const [messages, setMessages] = useState([] as MessageType[])
  const { menu } = useMenuStore()
  const { data: query, isSuccess } = useQuery({ queryKey: ['user'], queryFn: () => request.get('/user/profile') })

  useEffect(() => {
    if (isSuccess) {
      socket.on('connect', () => {
        console.log(socket.connected, '连接') // true
      })

      socket.emit('join', { name: query?.data.data.username })

      socket.on('join', (e) => {
        socket.emit('getRoomUsers')
      })

      socket.on('getRoomUsers', (num) => {
        setPeopleNumber(num)
      })

      socket.on('leave', (e) => {
        socket.emit('getRoomUsers')
      })

      socket.on('newMessage', handleNewMessage)

      inputRef.current!.focus({
        cursor: 'end'
      })
    }

    return () => {
      socket.off('newMessage', handleNewMessage)
      socket.emit('leave', { name: query?.data.data.username })
    }
  }, [isSuccess])

  socket.on('reconnect_attempt', () => {
    console.log(socket.connected, '尝试重新连接') // true
  })

  socket.on('reconnect', () => {
    console.log(socket.connected, '重新连接')
  })

  // 退出浏览器，退出
  window.addEventListener('beforeunload', function () {
    socket.emit('leave', { name: query?.data.data.username })
  })

  const handleNewMessage = (data: MessageType) => {
    setMessages((prevMessages) => [...prevMessages, data])
  }

  const sendMessage = () => {
    const newMessage = { message: messageValue, userId: query?.data.data.id }
    socket.emit('newMessage', newMessage)
    setMessageValue('')
  }

  return (
    <>
      <div>房间里有{peopleNumber}人</div>
      <ul
        className={clsx(
          'height scroll absolute mt-2 space-y-2 overflow-y-scroll',
          menu === Menu.EXTEND ? 'min-w-[80%]' : 'min-[375px]:min-w-[20%] md:min-w-[60%]'
        )}
      >
        {messages.map((item: MessageType, index) => {
          return (
            <li
              key={index}
              className="flex"
            >
              <Avatar
                src={import.meta.env.VITE_SERVER_URL + item.user?.avatar}
                size={34}
              />
              :<div className="ml-2 w-[85%] flex-wrap"> {item.text}</div>
            </li>
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
          className="mx-2"
        >
          发送消息
        </Button>
      </div>
    </>
  )
}
