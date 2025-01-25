import { ChatEmojiAndPhoto } from '@/shared/components'
import { useEmojiStore, useMenuStore } from '@/shared/store'
import TextArea, { TextAreaRef } from 'antd/es/input/TextArea'
import clsx from 'clsx'

interface ChatFooterType {
  disableFlag: boolean
  messageValue: string
  setMessageValue: React.Dispatch<React.SetStateAction<string>>
  inputRef: React.RefObject<TextAreaRef>
  sendMessage: (enable?: boolean) => void
}

export default function ChatFooter({
  disableFlag,
  messageValue,
  setMessageValue,
  inputRef,
  sendMessage
}: ChatFooterType) {
  const { t } = useTranslation(['COMMON', 'VALIDATION'])
  const { menu } = useMenuStore()
  const { clickEmoji } = useEmojiStore()

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

  return (
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
          onPressEnter={() => sendMessage(false)}
          maxLength={200}
          style={{ resize: 'none' }}
        />
        <Button
          onClick={() => sendMessage(false)}
          disabled={disableFlag}
          className="min-[375px]:min-w-[70px]"
        >
          {t('COMMON:send')}
        </Button>
      </div>
    </div>
  )
}
