import { request } from '@/shared/API'
import EmptyPage from '@/shared/components/EmptyPage'
import { BookShelfType } from '@/shared/types/bookshelf'
import { UrlUtils } from '@/shared/utils/UrlUtils'
import { EllipsisOutlined, StarFilled, StarOutlined } from '@ant-design/icons'
import { useQuery } from '@tanstack/react-query'
import { createLazyFileRoute } from '@tanstack/react-router'
import { motion } from 'framer-motion'

export const Route = createLazyFileRoute('/_base/otherbookshelf/$userId')({
  component: () => <Page />
})

export function Page() {
  const { userId } = Route.useParams()

  const query = useQuery({
    queryKey: ['user-bookshelf'],
    queryFn: () => request.get(`/user/bookshelf/${UrlUtils.decodeUrlById(userId)}`)
  })

  const { Meta } = Card
  return (
    <>
      {query.data?.data.data.length === 0 ? (
        <EmptyPage name="该用户还没有公开书架哦！快邀请TA分享吧！" />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          style={{ height: 'calc(100% - 115px)' }}
          className="scroll absolute h-full overflow-y-scroll"
        >
          <ul className="flex flex-wrap space-x-3 min-[375px]:justify-center md:justify-start">
            {query.data?.data.data.map((item: BookShelfType) => {
              return (
                <li
                  className="pb-5"
                  key={item.id}
                >
                  <Card
                    actions={[
                      <StarOutlined
                        key="no-collect"
                        onClick={() => {
                          console.log('收藏')
                        }}
                      />,
                      <StarFilled
                        style={{ color: 'rgb(253 224 71)' }}
                        key="collect"
                        onClick={() => {
                          console.log('取消收藏')
                        }}
                      />,
                      <EllipsisOutlined
                        key="ellipsis"
                        onClick={() => {
                          console.log('更多')
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
      )}
    </>
  )
}
