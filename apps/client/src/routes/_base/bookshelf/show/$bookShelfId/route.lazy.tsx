import { downloadBookShelfNotesMutation } from '@/features/bookshelf'
import { selectBookByBookShelfIdQuery } from '@/features/bookshelf/query'
import EmptyPage from '@/shared/components/EmptyPage'
import { Book } from '@/shared/types/book'
import { UrlUtils } from '@/shared/utils/UrlUtils'
import { cardLocation } from '@/shared/utils/waterfallLayout'
import { createLazyFileRoute } from '@tanstack/react-router'
import { FloatButton } from 'antd'
import { motion } from 'framer-motion'

export const Route = createLazyFileRoute('/_base/bookshelf/show/$bookShelfId')({
  component: () => <Page />
})

interface pageType {
  bookShelfId: string
}

function Page() {
  const { bookShelfId }: pageType = Route.useParams()
  const id = UrlUtils.decodeUrlById(bookShelfId)
  const { data: query, isSuccess, isPending } = selectBookByBookShelfIdQuery(id)
  const [data, setData] = useState([])
  const noteParent = useRef(null)
  const noteGrantParent = useRef(null)
  const [fallLayout, setFallLayout] = useState(false)
  const { mutate } = downloadBookShelfNotesMutation()

  useEffect(() => {
    const handleResize = () => {
      cardLocation(noteParent, noteGrantParent)
    }
    setFallLayout(cardLocation(noteParent, noteGrantParent))

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [window.innerWidth, noteParent.current, noteGrantParent.current])

  useEffect(() => {
    if (isSuccess) {
      setData(query?.data.data)
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
        <EmptyPage name="暂时没有书籍，请先导入书籍哦~" />
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
                    <div>作者名：{item.author || '暂无'}</div>
                    <div>主角：{item.protagonist || '暂无'}</div>
                    <div>描述：{item.description || '暂无'}</div>
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
