import { message } from 'antd'
import TextArea, { TextAreaRef } from 'antd/es/input/TextArea'
import clsx from 'clsx'
import { Socket } from 'socket.io-client'

interface ChatFooterType {
  messageValue: string
  setMessageValue: React.Dispatch<React.SetStateAction<string>>
  inputRef: React.RefObject<TextAreaRef>
  socket: Socket
  userId: number
}

export default function ChatFooter({
  messageValue,
  setMessageValue,
  inputRef,
  socket,
  userId
}: ChatFooterType) {
  const { t } = useTranslation(['COMMON', 'VALIDATION', 'PROMPT'])
  const { menu } = useMenuStore()
  const { clickEmoji } = useEmojiStore()
  const { emoticon, setEmoticon } = useEmoticonStore()
  const [disableFlag, setDisableFlag] = useState(false)

  // 用户发送消息
  const sendMessage = (enable = false) => {
    if (enable) {
      socket.emit('newMessage', { message: emoticon, userId: userId, enable })
    } else {
      if (!messageValue.trim()) {
        message.error(t('PROMPT:no_blank_message'))
        return
      }
      const newMessage = { message: messageValue, userId: userId, enable }
      socket.emit('newMessage', newMessage)
      setMessageValue('')
      handlerDisableButton()
    }
  }

  // 发送消息后禁用按钮，1秒后启用
  const handlerDisableButton = () => {
    setDisableFlag(true)
    setTimeout(() => {
      setDisableFlag(false)
    }, 1000)
  }

  useEffect(() => {
    if (clickEmoji.emoji) {
      if (!messageValue) {
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

  useEffect(() => {
    if (emoticon !== null) {
      sendMessage(true)
      setEmoticon(null)
    }
  }, [emoticon])

  return (
    <div className="absolute bottom-8 pt-1 min-[375px]:min-w-[90%] md:min-w-[70%]">
      <ChatEmojiAndPhoto />
      <div
        className={clsx(
          { 'min-[375px]:hidden md:flex': menu !== MenuEnum.EXTEND },
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
          onPressEnter={() => sendMessage()}
          maxLength={200}
          style={{ resize: 'none' }}
        />
        <Button
          onClick={() => sendMessage()}
          disabled={disableFlag}
          className="min-[375px]:min-w-[70px]"
        >
          {t('COMMON:send')}
        </Button>
      </div>
    </div>
  )
}
