import InfiniteScroll from 'react-infinite-scroll-component'

interface DataType {
  gender: string
  name: {
    title: string
    first: string
    last: string
  }
  email: string
  picture: {
    large: string
    medium: string
    thumbnail: string
  }
  nat: string
}

export default function MyFriend() {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<DataType[]>([])

  // TODO mobile 实现左滑删除

  const loadMoreData = () => {
    if (loading) {
      return
    }
    setLoading(true)
    fetch('https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo')
      .then((res) => res.json())
      .then((body) => {
        setData([...data, ...body.results])
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    loadMoreData()
  }, [])
  return (
    <div
      id="scrollableDiv"
      style={{
        height: 600,
        overflow: 'auto',
        padding: '0 16px 0 0'
      }}
      className="scroll"
    >
      <InfiniteScroll
        dataLength={data.length}
        next={loadMoreData}
        hasMore={data.length < 50}
        loader={
          <Skeleton
            avatar
            paragraph={{ rows: 1 }}
            active
          />
        }
        endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
        scrollableTarget="scrollableDiv"
      >
        <List
          dataSource={data}
          renderItem={(item) => (
            <List.Item key={item.email}>
              <List.Item.Meta
                avatar={<Avatar src={item.picture.large} />}
                title={item.name.last}
                description={item.email}
              />
              <div className="flex space-x-2">
                <div
                  onClick={() => {
                    console.log('互相关注')
                  }}
                >
                  互相关注
                </div>
                <div
                  onClick={() => {
                    console.log('回关')
                  }}
                >
                  回关
                </div>
                <div
                  onClick={() => {
                    console.log('查看书架')
                  }}
                >
                  查看书架
                </div>
              </div>
            </List.Item>
          )}
        />
      </InfiniteScroll>
    </div>
  )
}
