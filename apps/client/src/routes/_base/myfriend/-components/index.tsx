import { followUserByUserIdMutation, unfollowUserByFollowMutation } from '@/features/user'
import { request } from '@/shared/API'
import { PaginationParams } from '@/shared/enums/PaginationParams'
import { User } from '@/shared/types'
import { UrlUtils } from '@/shared/utils/UrlUtils'
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from '@tanstack/react-router'
import InfiniteScroll from 'react-infinite-scroll-component'
import { FollowEnum } from './FollowEnum'

interface FollowerType {
  id: number
  following: User
  isMutual: boolean
}

interface FollowingType {
  id: number
  follower: User
  isMutual: boolean
}

interface PageParam {
  page: number
  limit: number
}

export default function MyFriend({ api, type }: { api: string; type: string }) {
  const router = useRouter()

  // TODO mobile 实现左滑删除
  const fetchProjects = async ({ pageParam }: { pageParam: PageParam }) => {
    const res = await request.get(`${api}?page=${pageParam.page}&limit=${pageParam.limit}`)
    return res.data.data
  }

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isPending } = useInfiniteQuery({
    queryKey: [type],
    queryFn: fetchProjects,
    initialPageParam: { page: PaginationParams.PAGE, limit: PaginationParams.LIMIT },
    getNextPageParam: (lastPage) => {
      return lastPage.items.length != PaginationParams.LIMIT
        ? undefined
        : { page: parseInt(lastPage.currentPage) + 1, limit: PaginationParams.LIMIT }
    },
    select: (data) => ({
      pages: data.pages.reduce((acc, item) => {
        return acc.concat(item.items)
      }, [])
    })
  })

  const queryClient = useQueryClient()
  const { mutate: followMutate } = followUserByUserIdMutation(
    () => queryClient.invalidateQueries({ queryKey: [FollowEnum.FOLLOWING] }),
    () => queryClient.invalidateQueries({ queryKey: [FollowEnum.FOLLOWER] })
  )

  const { mutate: cancelMutate } = unfollowUserByFollowMutation(() =>
    queryClient.invalidateQueries({ queryKey: [FollowEnum.FOLLOWING] })
  )

  return (
    <>
      {isPending ? (
        <Skeleton
          avatar
          paragraph={{ rows: 3 }}
          active
        />
      ) : (
        <div
          id={type}
          style={{
            height: 500,
            overflow: 'auto',
            padding: '0 16px 0 0'
          }}
          className="scroll"
        >
          <InfiniteScroll
            dataLength={data?.pages.length}
            next={fetchNextPage}
            hasMore={hasNextPage || isFetchingNextPage}
            loader={
              <Skeleton
                avatar
                paragraph={{ rows: 3 }}
                active
                className="p-3"
              />
            }
            endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
            scrollableTarget={type}
          >
            {type === FollowEnum.FOLLOWING ? (
              <List
                dataSource={data?.pages}
                renderItem={(item: FollowerType) => (
                  <List.Item key={item.id}>
                    <List.Item.Meta
                      avatar={<Avatar src={import.meta.env.VITE_SERVER_URL + item.following.avatar} />}
                      title={item.following.username}
                      description={item.following.email ?? '暂无邮箱'}
                    />
                    <div className="flex space-x-2">
                      <div
                        className="cursor-pointer"
                        onClick={() => cancelMutate(item.following.id)}
                      >
                        {item.isMutual ? '互相关注' : '取关'}
                      </div>
                      <div
                        className="cursor-pointer"
                        onClick={() => {
                          const id = UrlUtils.encodeUrlById(item.following.id.toString())
                          router.navigate({ to: `/otherbookshelf/${id}` })
                        }}
                      >
                        查看书架
                      </div>
                    </div>
                  </List.Item>
                )}
              />
            ) : (
              <List
                dataSource={data?.pages}
                renderItem={(item: FollowingType) => (
                  <List.Item key={item.id}>
                    <List.Item.Meta
                      avatar={<Avatar src={import.meta.env.VITE_SERVER_URL + item.follower.avatar} />}
                      title={item.follower.username}
                      description={item.follower.email ?? '暂无邮箱'}
                    />
                    <div className="flex space-x-2">
                      <div
                        className="cursor-pointer"
                        onClick={() => followMutate(item.follower.id)}
                      >
                        {item.isMutual ? '互相关注' : '回关'}
                      </div>
                      <div
                        className="cursor-pointer"
                        onClick={() => {
                          const id = UrlUtils.encodeUrlById(item.follower.id.toString())
                          router.navigate({ to: `/otherbookshelf/${id}` })
                        }}
                      >
                        查看书架
                      </div>
                    </div>
                  </List.Item>
                )}
              />
            )}
          </InfiniteScroll>
        </div>
      )}
    </>
  )
}
