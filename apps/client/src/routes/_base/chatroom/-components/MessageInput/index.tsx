import { Menu } from '@/shared/enums'
import { useMenuStore } from '@/shared/store'
import { User } from '@/shared/types'
import { InputRef, message } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import clsx from 'clsx'
import { Socket } from 'socket.io-client'

interface MessageInputType {
  socket: Socket
  user: User
}

export default function MessageInput({ socket, user }: MessageInputType) {
  const [messageValue, setMessageValue] = useState('')
  const { menu } = useMenuStore()
  const inputRef = useRef<InputRef>(null)

  const sendMessage = () => {
    if (messageValue.trim() === '') {
      message.error('不能发送空白信息')
      return
    }

    const newMessage = { message: messageValue, userId: user.id }
    socket.emit('newMessage', newMessage)
    setMessageValue('')
  }

  useEffect(() => {
    socket.emit('join', { name: user.username, id: user.id })

    return () => {
      socket.off('newMessage', handleNewMessage)
    }
  }, [user])

  return (
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
  )
}
