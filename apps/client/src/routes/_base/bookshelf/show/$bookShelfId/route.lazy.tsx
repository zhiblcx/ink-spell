import { downloadBookShelfNotesMutation, selectBookByBookShelfIdQuery } from '@/features/bookshelf'
import { Book } from '@/shared/types'
import { UrlUtils } from '@/shared/utils/UrlUtils'
import { cardLocation } from '@/shared/utils/waterfallLayout'
import { FloatButton } from 'antd'
import { motion } from 'framer-motion'

export const Route = createLazyFileRoute('/_base/bookshelf/show/$bookShelfId')({
  component: () => <Page />
})

interface pageType {
  bookShelfId: string
}

function Page() {
  const { t } = useTranslation(['COMMON', 'PROMPT'])
  const { bookShelfId }: pageType = Route.useParams()
  const id = UrlUtils.decodeUrlById(bookShelfId)
  const { data: query, isSuccess, isPending } = selectBookByBookShelfIdQuery(id)
  const [data, setData] = useState([])
  const noteParent = useRef(null)
  const noteGrantParent = useRef(null)
  const [fallLayout, setFallLayout] = useState(false)
  const { mutate } = downloadBookShelfNotesMutation()

  useEffect(() => {
    let handleResize = () => {
      cardLocation(noteParent, noteGrantParent)
    }
    if (window.innerWidth > 400) {
      handleResize = () => {
        cardLocation(noteParent, noteGrantParent)
      }
      setFallLayout(cardLocation(noteParent, noteGrantParent))
    } else {
      handleResize = () => {}
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [window.innerWidth, noteParent.current, noteGrantParent.current])

  useEffect(() => {
    if (isSuccess) {
      setData(query?.data)
    }
  }, [isSuccess])

  return (
    <>
      {isPending ? (
        <Skeleton
          className="p-5"
          active
          paragraph={{ rows: 10 }}
        />
      ) : data.length === 0 && fallLayout ? (
        <EmptyPage name={t('PROMPT:import_books_prompt')} />
      ) : (
        <motion.div
          ref={noteGrantParent}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          style={{ height: 'calc(100% - 80px)' }}
          className="scroll absolute h-full overflow-hidden overflow-y-scroll"
        >
          <div
            className="relative"
            ref={noteParent}
          >
            {data.map((item: Book) => (
              <div
                className="p-2"
                key={item.id}
              >
                <Card
                  title={item.name}
                  className="w-[325px]"
                >
                  <div className="space-y-1">
                    <div>
                      {t('COMMON:author')}：{item.author || t('COMMON:not_available')}
                    </div>
                    <div>
                      {t('COMMON:description')}：{item.protagonist || t('COMMON:not_available')}
                    </div>
                    <div>
                      {t('COMMON:description')}：{item.description || t('COMMON:not_available')}
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>

          <FloatButton
            type="primary"
            onClick={() => mutate(parseInt(id))}
          />
        </motion.div>
      )}
    </>
  )
}
