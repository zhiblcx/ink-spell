import { BookShelfType } from '@/shared/types'
import { UrlUtils } from '@/shared/utils/UrlUtils'
import { cardLocation } from '@/shared/utils/waterfallLayout'
import { EllipsisOutlined, StarFilled, StarOutlined } from '@ant-design/icons'
import { useNavigate } from '@tanstack/react-router'
import Meta from 'antd/es/card/Meta'
import clsx from 'clsx'
import { motion } from 'framer-motion'
import { CircleX } from 'lucide-react'

interface BookShelfDetailType {
  bookshelf_detail: []
  userCollectBookShelfIds?: Array<Number>
  isIdsFlag?: boolean
  collectButton?: (item: BookShelfType) => void
  cancelCollectButton: (item: BookShelfType & { collectId?: number }) => void
}

export default function BookShelfDetail({
  bookshelf_detail,
  userCollectBookShelfIds,
  collectButton,
  cancelCollectButton,
  isIdsFlag = true
}: BookShelfDetailType) {
  const navigate = useNavigate()
  const [modal, contextHolder] = Modal.useModal()
  const noteGrantParent = useRef(null)
  const noteParent = useRef(null)
  const [fallLayout, setFallLayout] = useState(false)

  let handleResize = useCallback(() => {
    if (noteParent.current && noteGrantParent.current) {
      setFallLayout(cardLocation(noteParent, noteGrantParent))
    }
  }, [noteParent])

  useEffect(() => {
    if (window.innerWidth > 400) {
      setTimeout(() => {
        handleResize()
        setTimeout(() => {
          handleResize()
        }, 0)
      }, 500)
    } else {
      setFallLayout(true)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [window.innerWidth])

  const handleCancelCollect = (item: BookShelfType) => {
    modal.confirm({
      title: '取消收藏',
      icon: <CircleX className="mr-2 text-red-500" />,
      content: '确定要取消收藏这个书架吗？这个书架看起来不再是您的首选了吗？',
      okText: '确定',
      cancelText: '取消',
      maskClosable: true,
      onOk: () => {
        cancelCollectButton(item)
      }
    })
  }

  return (
    <>
      <Skeleton
        className={clsx(!fallLayout ? null : 'hidden', 'p-5')}
        active
        paragraph={{ rows: 10 }}
      />
      <motion.div
        ref={noteGrantParent}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        style={{ height: 'calc(100% - 80px)' }}
        className={clsx(
          fallLayout ? 'block' : 'hidden',
          window.innerWidth < 400 ? 'flex justify-center' : 'absolute',
          'scroll h-full overflow-hidden overflow-y-scroll'
        )}
      >
        <div
          className="relative"
          ref={noteParent}
        >
          {bookshelf_detail.map((item: BookShelfType) => (
            <div
              key={item.id}
              className="p-2"
            >
              <Card
                actions={[
                  isIdsFlag ? (
                    userCollectBookShelfIds?.includes(item.id) ? (
                      <StarFilled
                        style={{ color: 'rgb(253 224 71)' }}
                        key="collect"
                        onClick={() => handleCancelCollect(item)}
                      />
                    ) : (
                      <StarOutlined
                        key="no-collect"
                        className="hidden"
                        onClick={() => collectButton && collectButton(item)}
                      />
                    )
                  ) : (
                    <StarFilled
                      style={{ color: 'rgb(253 224 71)' }}
                      key="collect"
                      onClick={() => handleCancelCollect(item)}
                    />
                  ),
                  <EllipsisOutlined
                    key="ellipsis"
                    onClick={() => {
                      const id = UrlUtils.encodeUrlById(`${item.id}?userId=${item.userId}`)
                      navigate({ to: `/bookshelf/${id}` })
                    }}
                  />
                ]}
                className="w-[325px] cursor-default"
                hoverable
                style={{ width: 240 }}
                cover={
                  <img
                    alt="example"
                    className="h-[200px] object-cover"
                    src={import.meta.env.VITE_SERVER_URL + item.cover}
                  />
                }
              >
                <Meta
                  title={item.label}
                  description={item.description}
                  className="break-all"
                />
              </Card>
            </div>
          ))}
        </div>
        {contextHolder}
      </motion.div>
    </>
  )
}
