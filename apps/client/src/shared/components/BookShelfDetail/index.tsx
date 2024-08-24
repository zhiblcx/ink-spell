import { BookShelfType } from '@/shared/types/bookshelf'
import { UrlUtils } from '@/shared/utils/UrlUtils'
import { EllipsisOutlined, StarFilled, StarOutlined } from '@ant-design/icons'
import { useNavigate } from '@tanstack/react-router'
import Meta from 'antd/es/card/Meta'
import { motion } from 'framer-motion'

interface BookShelfDetailType {
  bookshelf_detail: []
  userCollectBookShelfIds?: Array<Number>
  isIdsFlag?: boolean
  collectButton?: (item: BookShelfType) => void
  cancelCollectButton: (item: BookShelfType & { collectId: number }) => void
}

export default function BookShelfDetail({
  bookshelf_detail,
  userCollectBookShelfIds,
  collectButton,
  cancelCollectButton,
  isIdsFlag = true
}: BookShelfDetailType) {
  const navigate = useNavigate()
  console.log(bookshelf_detail)
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      style={{ height: 'calc(100% - 115px)' }}
      className="scroll absolute h-full overflow-y-scroll"
    >
      <ul className="flex flex-wrap space-x-3 min-[375px]:justify-center md:justify-start">
        {bookshelf_detail.map((item: BookShelfType) => {
          return (
            <li
              className="pb-5"
              key={item.id}
            >
              <Card
                actions={[
                  isIdsFlag ? (
                    userCollectBookShelfIds?.includes(item.id) ? (
                      <StarFilled
                        style={{ color: 'rgb(253 224 71)' }}
                        key="collect"
                        onClick={() => cancelCollectButton(item)}
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
                      onClick={() => cancelCollectButton(item)}
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
                className="cursor-default"
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
                />
              </Card>
            </li>
          )
        })}
      </ul>
    </motion.div>
  )
}
