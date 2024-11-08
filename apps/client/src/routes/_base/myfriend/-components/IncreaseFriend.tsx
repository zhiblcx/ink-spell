import Search from 'antd/es/input/Search'
import MyFriend from '.'
import { FollowEnum } from './FollowEnum'

export default function IncreaseFriend() {
  const [value, setValue] = useState<string>()
  const [search, setSearch] = useState(false)
  const { t } = useTranslation('VALIDATION')

  return (
    <>
      <Search
        placeholder={t('add_friend_username')}
        className="mb-4 ml-4 w-[240px]"
        onSearch={(e) => {
          setValue(e)
          setSearch(true)
        }}
      />

      {search ? (
        <MyFriend
          type={FollowEnum.INCREASE}
          api="/user/username/"
          username={value}
        />
      ) : null}
    </>
  )
}
