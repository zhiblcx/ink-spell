import { createLazyFileRoute } from '@tanstack/react-router'
import { io } from 'socket.io-client'

export const Route = createLazyFileRoute('/_base/chatroom')({
  component: () => <Page />
})

interface MessageType {
  name: string
  text: string
}

function Page() {
  const URL = import.meta.env.VITE_SERVER_URL
  const socket = io(URL)
  const [peopleNumber, setPeopleNumber] = useState(0)
  const [messages, setMessages] = useState([] as MessageType[])

  useEffect(() => {
    socket.on('connect', () => {
      console.log(socket.connected) // true
    })

    socket.emit('getRoomUsers')

    socket.on('getRoomUsers', (num) => {
      setPeopleNumber(num)
    })

    socket.emit('join', { name: '佳佳' })

    socket.on('join', (e) => {
      console.log(e, 'join')
    })

    const handleNewMessage = (data: MessageType) => {
      setMessages((prevMessages) => [...prevMessages, data])
    }

    socket.on('newMessage', handleNewMessage)

    return () => {
      socket.off('newMessage', handleNewMessage)
    }
  }, [])

  const sendMessage = () => {
    const newMessage = { message: 'hello world', name: '佳佳' }
    socket.emit('newMessage', newMessage)
  }

  return (
    <>
      <div>房间里有{peopleNumber}人</div>
      <ul>
        {messages.map((item: MessageType, index) => {
          return (
            <li key={index}>
              {item.name} : {item.text}
            </li>
          )
        })}
      </ul>
      <Button onClick={sendMessage}>发送消息</Button>
    </>
  )
}
