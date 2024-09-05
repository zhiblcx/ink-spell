import { selectBookByBookShelfIdQuery } from '@/features/bookshelf/query'
import EmptyPage from '@/shared/components/EmptyPage'
import { Book } from '@/shared/types/book'
import { UrlUtils } from '@/shared/utils/UrlUtils'
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
  const { data: query, isSuccess, isLoading } = selectBookByBookShelfIdQuery(id)
  const [data, setData] = useState([])
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    if (isSuccess) {
      setData(query?.data.data)
    }
  }, [isSuccess])

  return (
    <>
      {isLoading ? (
        <Skeleton
          className="p-5"
          active
          paragraph={{ rows: 10 }}
        />
      ) : data.length === 0 ? (
        <EmptyPage name="暂时没有书籍，请先导入书籍哦~" />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          style={{ height: 'calc(100% - 80px)' }}
          className="scroll absolute h-full overflow-y-scroll"
        >
          <List
            grid={{ gutter: windowWidth >= 400 ? 16 : 4, column: windowWidth >= 400 ? 3 : 1 }}
            className="p-3"
            dataSource={data}
            renderItem={(item: Book) => (
              <List.Item className="min-[375px]:w-[320px] md:w-[450px]">
                <Card title={item.name}>
                  <div>
                    <div>作者名：{item.author || '暂无'}</div>
                    <div>主角：{item.protagonist || '暂无'}</div>
                    <div>描述：{item.description || '暂无'}</div>
                  </div>
                </Card>
              </List.Item>
            )}
          />
          <FloatButton
            type="primary"
            onClick={() => console.log('onClick')}
          />
        </motion.div>
      )}
    </>
  )
}
