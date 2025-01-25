import { emojis, emojisType, emojiType } from '@/mock/emojis'
import { useEmojiStore } from '@/shared/store/EmojiStore'
import { SmileOutlined } from '@ant-design/icons'
import clsx from 'clsx'
import { motion } from 'framer-motion'
import { PhotoTransformBase64 } from '../PhotoTransformBase64'
export function ChatEmojiAndPhoto() {
  const { t } = useTranslation(['EMOJI'])
  const [emojiOpen, setEmojiOpen] = useState(false)
  const emojiStore = useEmojiStore()
  return (
    <>
      <div className="space-x-3 text-2xl">
        <SmileOutlined onClick={() => setEmojiOpen(!emojiOpen)} />
        <PhotoTransformBase64 />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className={clsx(
            emojiOpen ? 'block' : 'hidden',
            'scroll absolute top-[-290px] flex h-[280px] w-[60%] flex-wrap overflow-y-auto rounded-2xl bg-white py-1 shadow-md dark:bg-[#141414] min-[375px]:min-w-[90%]'
          )}
        >
          {emojis.map((emojisData: emojisType, index) => (
            <div
              key={emojisData.type}
              className="flex flex-wrap"
            >
              {index == 0 && emojiStore.emojis.length != 0 ? (
                <>
                  <Divider orientation="left">{t('EMOJI:emojis_recently_used_emoticons')}</Divider>
                  {emojiStore.emojis.map((emoji, index) => (
                    <div
                      key={index}
                      className="mx-1 mb-2 w-[30px] cursor-pointer rounded-md text-center text-xl hover:bg-[#ececec]"
                      onClick={() => {
                        const recentEmoji = [emoji, ...emojiStore.emojis]
                        emojiStore.setEmojis(recentEmoji)
                      }}
                    >
                      {emoji}
                    </div>
                  ))}
                </>
              ) : null}
              <Divider orientation="left">{t('emojis', { context: emojisData.type })}</Divider>
              {emojisData.data.map((emoji: emojiType) => (
                <div
                  key={emojisData.type + emoji.id}
                  className="mx-1 mb-2 w-[30px] cursor-pointer rounded-md text-center text-xl hover:bg-[#ececec]"
                  onClick={() => {
                    const recentEmoji = [emoji.emoji, ...emojiStore.emojis]
                    emojiStore.setEmojis(recentEmoji)
                  }}
                >
                  {emoji.emoji}
                </div>
              ))}
            </div>
          ))}
        </motion.div>
      </div>
    </>
  )
}
