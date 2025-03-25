import { selectOneselfInfoQuery } from '@/features/user'
import { CHAR_ROOM } from '@/shared/constants'
import { MessageType, User } from '@/shared/types'
import { TextAreaRef } from 'antd/es/input/TextArea'
import useSmoothScroll from 'react-smooth-scroll-hook'
import CharContent from './CharContent'
import ChatFooter from './ChatFooter'
import { socket } from './socket.io'

export default function ChatRoom() {
  const { t } = useTranslation(['PROMPT'])
  const inputRef = useRef<TextAreaRef>(null)
  const chatContent = useRef<HTMLUListElement>(null)
  const location = useLocation()
  const [lookUser, setLookUser] = useState<User | null>(null)
  const [openFlag, setOpenFlag] = useState(false)
  const [messageValue, setMessageValue] = useState('')
  const [peopleNumber, setPeopleNumber] = useState(0)
  const [loading, setLoading] = useState(true)
  const [messages, setMessages] = useState([] as MessageType[])
  const [count, setCount] = useState(0)
  const { data: query, isSuccess } = selectOneselfInfoQuery()
  const connectionInitializedRef = useRef(false)
  const { scrollTo } = useSmoothScroll({
    ref: chatContent,
    speed: Infinity,
    direction: 'y'
  })

  function socketConnect() {
    socket.emit('join', { name: query?.data.username, id: query?.data.id })
    socket.on('join', (data) => {
      if (query?.data.id !== data.userId) {
        handleNewMessage(data)
      }
      socket.emit('getMessages')
      socket.emit('getRoomUsers')
    })
    socket.once('getMessages', acquireMessage)
    socket.on('getRoomUsers', setPeopleNumber)
    socket.on('newMessage', handleNewMessage)
    socket.on('leave', (data) => {
      socket.emit('getRoomUsers')
      setMessages((prevMessages) => [...prevMessages, data])
      setCount((preCount) => preCount + 1)
    })
  }

  // 初始化数据
  useEffect(() => {
    if (!isSuccess || connectionInitializedRef.current) return

    connectionInitializedRef.current = true

    socket.connect()

    if (socket.connected) {
      console.log('socket 已连接，立即执行')
      socketConnect()
    } else {
      console.log('等待 socket 连接')
      socket.once('connect', socketConnect)
    }

    // 关闭网站触发
    window.addEventListener('beforeunload', leaveRoom)
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
      if (item.type.includes(MessageEnum.IMAGE) || item.type.includes(MessageEnum.TEXT)) {
        item.type =
          (item.userId === query?.data.id ? MessageEnum.MESSAGE_SELF : MessageEnum.MESSAGE_OTHER) +
          '-' +
          item.type
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

  // 处理新消息
  const handleNewMessage = (data: MessageType) => {
    if (data.type !== MessageEnum.JOIN) {
      data.type =
        (data.userId === query?.data.id ? MessageEnum.MESSAGE_SELF : MessageEnum.MESSAGE_OTHER) +
        '-' +
        data.type
    }
    if (chatContent.current) {
      const container = chatContent.current
      if (
        Math.ceil(container.scrollHeight) - 5 - Math.floor(container.scrollTop) <=
          Math.ceil(container.clientHeight) ||
        data.type.includes(MessageEnum.MESSAGE_SELF)
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

  // 离开房间
  const leaveRoom = () => {
    socket.emit('leave', { name: query?.data.username, id: query?.data.id })
    socket.disconnect()
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
          {!socket.connected ? (
            <>
              {t('PROMPT:failed_to_join_room')}
              <EmptyPage name={t('PROMPT:connection_failed')} />
            </>
          ) : (
            <>
              {t('PROMPT:people_in_room', { peopleNumber: peopleNumber })}
              <CharContent
                chatContent={chatContent}
                setLookUser={setLookUser}
                setOpenFlag={setOpenFlag}
                messages={messages}
                scrollTo={scrollTo}
                count={count}
                setCount={setCount}
              />
              <ChatFooter
                messageValue={messageValue}
                setMessageValue={setMessageValue}
                inputRef={inputRef}
                socket={socket}
                userId={query?.data.id}
              />
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
