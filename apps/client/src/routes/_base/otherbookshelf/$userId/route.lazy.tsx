import { request } from '@/shared/API'
import EmptyPage from '@/shared/components/EmptyPage'
import { BookShelfType } from '@/shared/types/bookshelf'
import { UrlUtils } from '@/shared/utils/UrlUtils'
import { EllipsisOutlined, StarFilled, StarOutlined } from '@ant-design/icons'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createLazyFileRoute } from '@tanstack/react-router'
import { message } from 'antd'
import { AxiosError } from 'axios'
import { motion } from 'framer-motion'

export const Route = createLazyFileRoute('/_base/otherbookshelf/$userId')({
  component: () => <Page />
})

interface UserCollectType {
  id: number
  userId: number
  bookShelfId: number
}

export function Page() {
  const { userId } = Route.useParams()

  const query = useQuery({
    queryKey: ['user-bookshelf'],
    queryFn: () => request.get(`/user/bookshelf/${UrlUtils.decodeUrlById(userId)}`)
  })

  const { data: userCollectQuery } = useQuery({
    queryKey: ['user-collect'],
    queryFn: () => request.get('/collect/bookshelf')
  })

  const userCollectBookShelfIds = userCollectQuery?.data.data.reduce((acc: Array<number>, item: UserCollectType) => {
    return acc.concat(item.bookShelfId)
  }, [])

  const queryClient = useQueryClient()

  // 收藏书架
  const { mutate: collectShelfMutate } = useMutation({
    mutationFn: (bookShelfId: number) => request.post(`/collect/bookshelf/${bookShelfId}`),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['user-collect'] })
      message.success(data.data.message)
    },
    onError: (result: AxiosError) => {
      const data = (result.response?.data as { message?: string })?.message ?? '服务器错误'
      message.error(data)
    }
  })

  // 取消收藏书架
  const { mutate: cancelCollectShelfMutate } = useMutation({
    mutationFn: (bookShelfId: number) => request.delete(`/collect/bookshelf/${bookShelfId}`),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['user-collect'] })
      message.success(data.data.message)
    },
    onError: (result: AxiosError) => {
      const data = (result.response?.data as { message?: string })?.message ?? '服务器错误'
      message.error(data)
    }
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
                      userCollectBookShelfIds.includes(item.id) ? (
                        <StarFilled
                          style={{ color: 'rgb(253 224 71)' }}
                          key="collect"
                          onClick={() => {
                            const index = userCollectQuery?.data.data.findIndex(
                              (collect: UserCollectType) => collect.bookShelfId === item.id
                            )
                            cancelCollectShelfMutate(userCollectQuery?.data.data[index].id)
                          }}
                        />
                      ) : (
                        <StarOutlined
                          key="no-collect"
                          className="hidden"
                          onClick={() => {
                            collectShelfMutate(item.id)
                          }}
                        />
                      ),
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
