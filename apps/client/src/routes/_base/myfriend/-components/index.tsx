import { followUserByUserIdMutation, unfollowUserByFollowMutation } from '@/features/user'
import { axiosInstance } from '@/shared/API'
import { PersonCard } from '@/shared/components'
import { PaginationParams } from '@/shared/enums/PaginationParams'
import { User } from '@/shared/types'
import { UrlUtils } from '@/shared/utils/UrlUtils'
import { message } from 'antd'
import { AxiosError } from 'axios'
import { useTranslation } from 'react-i18next'
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

export default function MyFriend({
  api,
  type,
  username
}: {
  api: string
  type: string
  username?: string
}) {
  const { t } = useTranslation(['COMMON', 'PROMPT'])
  const router = useRouter()
  const [openFlag, setOpenFlag] = useState(false)
  const [lookUser, setLookUser] = useState<User | null>(null)

  // TODO: mobile 实现左滑关注
  const fetchProjects = async ({ pageParam }: { pageParam: PageParam }) => {
    try {
      let res
      if (username === undefined) {
        res = await axiosInstance.get(`${api}?page=${pageParam.page}&limit=${pageParam.limit}`)
      } else {
        res = await axiosInstance.get(
          `${api}${username}?page=${pageParam.page}&limit=${pageParam.limit}&username=${username}`
        )
      }
      return res.data.data
    } catch (_) {
      const error = _ as AxiosError
      message.error(
        (error.response?.data as { message?: string }).message || t('PROMPT:server_error')
      )
      return {
        items: [],
        page: PaginationParams.PAGE,
        limit: PaginationParams.LIMIT
      }
    }
  }

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isPending } = useInfiniteQuery({
    queryKey: [type],
    queryFn: fetchProjects,
    initialPageParam: { page: PaginationParams.PAGE, limit: PaginationParams.LIMIT },
    getNextPageParam: (lastPage) => {
      if (
        (lastPage.items.length === 0 && lastPage.page === 1) ||
        lastPage.items.length != PaginationParams.LIMIT
      ) {
        return undefined
      } else {
        return { page: parseInt(lastPage.currentPage) + 1, limit: PaginationParams.LIMIT }
      }
    },
    select: (data) => ({
      pages: data.pages.reduce((acc, item) => {
        return acc.concat(item.items)
      }, [])
    })
  })

  const queryClient = useQueryClient()

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: [type] })
  }, [username])

  const { mutate: followMutate } = followUserByUserIdMutation(
    () => queryClient.invalidateQueries({ queryKey: [FollowEnum.FOLLOWING] }),
    () => queryClient.invalidateQueries({ queryKey: [FollowEnum.FOLLOWER] })
  )

  const { mutate: cancelMutate } = unfollowUserByFollowMutation(() =>
    queryClient.invalidateQueries({ queryKey: [FollowEnum.FOLLOWING] })
  )

  const followClick = async (item: FollowerType) => {
    setOpenFlag(true)
    // TODO: 优化
    const query = await axiosInstance.get(`/user/${item.following.id}`)
    setLookUser(query.data.data as User)
  }

  const followingClick = async (item: FollowingType) => {
    setOpenFlag(true)
    // TODO: 优化
    const query = await axiosInstance.get(`/user/${item.follower.id}`)
    setLookUser(query.data.data as User)
  }

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
            // It is all, nothing more 🤐
            endMessage={<Divider plain>{t('PROMPT:no_more_prompt')}</Divider>}
            scrollableTarget={type}
          >
            {type === FollowEnum.FOLLOWING ? (
              <List
                dataSource={data?.pages}
                renderItem={(item: FollowerType) => (
                  <List.Item key={item.id}>
                    <List.Item.Meta
                      avatar={
                        <Avatar src={import.meta.env.VITE_SERVER_URL + item.following.avatar} />
                      }
                      title={
                        <span
                          className="cursor-pointer"
                          onClick={() => followClick(item)}
                        >
                          {item.following.username}
                        </span>
                      }
                      description={item.following.email ?? t('PROMPT:no_email_currently_available')}
                    />
                    <div className="flex space-x-2">
                      <div
                        className="cursor-pointer"
                        onClick={() => cancelMutate(item.following.id)}
                      >
                        {item.isMutual ? t('COMMON:mutual_following') : t('COMMON:unfollow')}
                      </div>
                      <div
                        className="cursor-pointer"
                        onClick={() => {
                          const id = UrlUtils.encodeUrlById(item.following.id.toString())
                          router.navigate({ to: `/otherbookshelf/${id}` })
                        }}
                      >
                        {t('COMMON:show_bookshelf')}
                      </div>
                    </div>
                  </List.Item>
                )}
              />
            ) : type === FollowEnum.FOLLOWER ? (
              <List
                dataSource={data?.pages}
                renderItem={(item: FollowingType) => (
                  <List.Item key={item.id}>
                    <List.Item.Meta
                      avatar={
                        <Avatar src={import.meta.env.VITE_SERVER_URL + item.follower.avatar} />
                      }
                      title={
                        <span onClick={() => followingClick(item)}>{item.follower.username}</span>
                      }
                      description={item.follower.email ?? t('PROMPT:no_email_currently_available')}
                    />
                    <div className="flex space-x-2">
                      <div
                        className="cursor-pointer"
                        onClick={() => followMutate(item.follower.id)}
                      >
                        {item.isMutual
                          ? t('COMMON:mutual_following')
                          : t('COMMON:return_to_customs')}
                      </div>
                      <div
                        className="cursor-pointer"
                        onClick={() => {
                          const id = UrlUtils.encodeUrlById(item.follower.id.toString())
                          router.navigate({ to: `/otherbookshelf/${id}` })
                        }}
                      >
                        {t('COMMON:show_bookshelf')}
                      </div>
                    </div>
                  </List.Item>
                )}
              />
            ) : (
              <List
                dataSource={data?.pages}
                renderItem={(item: User) => (
                  <List.Item key={item.id}>
                    <List.Item.Meta
                      avatar={<Avatar src={import.meta.env.VITE_SERVER_URL + item.avatar} />}
                      title={<span>{item.username}</span>}
                      description={item.email ?? t('PROMPT:no_email_currently_available')}
                    />
                    <div className="flex space-x-2">
                      <div
                        className="cursor-pointer"
                        onClick={() => followMutate(item.id)}
                      >
                        {t('COMMON:follow')}
                      </div>
                      <div
                        className="cursor-pointer"
                        onClick={() => {
                          const id = UrlUtils.encodeUrlById(item.id.toString())
                          router.navigate({ to: `/otherbookshelf/${id}` })
                        }}
                      >
                        {t('COMMON:show_bookshelf')}
                      </div>
                    </div>
                  </List.Item>
                )}
              />
            )}
          </InfiniteScroll>
        </div>
      )}

      <PersonCard
        openFlag={openFlag}
        setOpenFlag={setOpenFlag}
        lookUser={lookUser as User}
      />
    </>
  )
}
