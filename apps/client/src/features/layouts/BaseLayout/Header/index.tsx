import { selectBookByBookShelfIdQuery, selectMyBookShelfQuery } from '@/features/bookshelf'
import { selectOneselfInfoQuery, updateUserPasswordMutation } from '@/features/user'
import { useActionBookStore, useMenuStore } from '@/shared/store'
import { Book } from '@/shared/types'
import { UrlUtils } from '@/shared/utils'
import { ReactNode } from '@tanstack/react-router'
import { AlignLeft, AlignRight, RotateCw } from 'lucide-react'
import { AvatarItems, ImportBook, ResetPassword, SettingMenu } from './components'

export default function Header() {
  const { t } = useTranslation('PROMPT')
  const router = useRouter()
  const showSearchReg = /^\/$|^\/bookshelf\/.*$/
  const { menu, setMenu } = useMenuStore()
  const { updateSearchBookName } = useActionBookStore()
  const [options, setOptions] = useState([])
  const [optionTotal, setOptionTotal] = useState([])
  const [openFlag, setOpenFlag] = useState(false)
  const [form] = Form.useForm()

  const reg = /\d+/
  const urlSplit = router.latestLocation.href.split('/')
  const url = `/${urlSplit[1]}/${urlSplit.length === 3 ? UrlUtils.decodeUrlById(urlSplit[2]) : undefined}`
  const match = url.match(reg)

  const { data: myBookShelf } = selectMyBookShelfQuery()
  let bookShelfId = match !== null ? match[0] : myBookShelf?.data[0].id

  // TODO: remove undefined
  const { data: queryBook, isSuccess } = selectBookByBookShelfIdQuery(bookShelfId as string)

  useEffect(() => {
    if (isSuccess) {
      setOptionTotal(
        queryBook.data.map((item: Book) => ({
          label: item.name,
          value: item.name
        }))
      )
    }
  }, [isSuccess])

  const query = selectOneselfInfoQuery()
  const { mutate } = updateUserPasswordMutation()

  function Icon(props: ReactNode) {
    return (
      <div onClick={props.onClick}>
        {menu === MenuEnum.EXTEND ? (
          <AlignLeft
            className="mr-2 cursor-pointer"
            size={30}
          />
        ) : (
          <AlignRight
            className="mr-2 cursor-pointer"
            size={30}
          />
        )}
      </div>
    )
  }

  // 点击搜索框的标志
  const onSearch = (value: string) => {
    updateSearchBookName(value)
  }

  // 点击下拉条目
  const handleSearch = (value: string) => {
    const filterOptions = optionTotal.filter((item) => fuzzySearch(value, item))
    setOptions(filterOptions)
  }

  function fuzzySearch(keyword: string, item: { label: string }) {
    const escapedKeyword = keyword.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
    const regexPattern = `.*${escapedKeyword}.*`
    return new RegExp(regexPattern, 'i').test(item.label)
  }

  // 刷新页面
  function refresh() {
    location.reload()
  }

  return (
    <div className="flex items-center justify-between py-4">
      <div className="flex items-center">
        <Icon
          onClick={() => {
            setMenu(menu === MenuEnum.EXTEND ? MenuEnum.SHRINK : MenuEnum.EXTEND)
          }}
        />
        {showSearchReg.test(router.latestLocation.pathname) ? (
          <AutoComplete
            options={options}
            onSelect={onSearch}
            onSearch={handleSearch}
          >
            <Input.Search
              className="mx-2 flex items-center justify-center min-[375px]:mx-0 min-[375px]:w-[145px] md:w-[200px]"
              placeholder={t('search_book_name')}
              onSearch={onSearch}
              enterButton
            />
          </AutoComplete>
        ) : null}
      </div>
      <div className="flex items-center justify-center min-[375px]:ml-2 min-[375px]:space-x-2 md:mr-10 md:space-x-4">
        <RotateCw onClick={refresh} />

        <SettingMenu />

        <AvatarItems
          setOpenFlag={setOpenFlag}
          avatar={query.data?.data.avatar}
        />

        <ImportBook bookShelfId={bookShelfId} />
      </div>

      <ResetPassword
        form={form}
        openFlag={openFlag}
        setOpenFlag={setOpenFlag}
        mutate={mutate}
      />
    </div>
  )
}
