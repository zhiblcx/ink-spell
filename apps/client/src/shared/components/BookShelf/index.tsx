import { selectMyBookShelfQuery } from '@/features/bookshelf'
import { selectOneselfInfoQuery } from '@/features/user'
import { AllSelectBookFlag } from '@/shared/enums'
import { EditBookShelfOpenFlag } from '@/shared/enums/EditBookShelfOpenFlag'
import { useActionBookStore } from '@/shared/store'
import { BookShelfType, Ink } from '@/shared/types'
import { useQuery } from '@tanstack/react-query'
import { UploadFile } from 'antd'
import EmptyPage from '../EmptyPage'
import { BookShelfList } from './components/BookShelfList'
import { OperateBookShelfModal } from './components/OperateBookShelfModal'

interface BookShelfPropsType {
  bookShelfId: number
  books: Ink[]
  setBooks: React.Dispatch<React.SetStateAction<Ink[]>>
}

export default function BookShelf({ bookShelfId, books, setBooks }: BookShelfPropsType) {
  const {
    allSelectBookFlag,
    cancelFlag,
    bookToBookShelfFlag,
    searchBookName,
    modifyBookShelfFlag,
    isOtherBookShelfFlag,
    updateAllSelectFlag,
    updateSearchBookName
  } = useActionBookStore()
  const [form] = Form.useForm()
  const [editBookShelfOpenFlag, setEditBookShelfOpenFlag] = useState(EditBookShelfOpenFlag.MODIFY)
  const [cover, setCover] = useState<UploadFile[]>([])
  const [selectOptions] = useState([{ value: 'new', label: '新建书架' }])
  const [selectBookShelfValue, setSelectBookShelfValue] = useState(selectOptions[0].value)
  const [options, setOptions] = useState([] as Ink[])
  const { data: query } = useQuery(selectOneselfInfoQuery)

  let acquireBookShelfFlag = false

  const { data, isSuccess, isPending } = selectMyBookShelfQuery()

  const currentBookShelf: BookShelfType = data?.data.data.filter((item: BookShelfType) => item.id == bookShelfId)[0]

  useEffect(() => {
    if (bookToBookShelfFlag || modifyBookShelfFlag) {
      // 修改
      if (modifyBookShelfFlag) {
        setCover([
          {
            uid: currentBookShelf.id.toString(),
            name: currentBookShelf.label,
            status: 'done',
            url: import.meta.env.VITE_SERVER_URL + currentBookShelf.cover
          }
        ])
        form.setFieldsValue({
          id: currentBookShelf.id,
          bookShelfName: currentBookShelf.label,
          status: currentBookShelf.isPublic,
          bookShelfDescription: currentBookShelf.description ?? '暂无描述'
        })
      } else {
        // 新增
        setSelectBookShelfValue(selectOptions[0].value)
        form.setFieldsValue({
          bookShelfId: selectOptions[0].value,
          status: false,
          bookShelfName: '',
          bookShelfDescription: ''
        })
        setCover([])
      }
      setEditBookShelfOpenFlag(EditBookShelfOpenFlag.INCREASE)
    }
  }, [bookToBookShelfFlag, modifyBookShelfFlag])

  useEffect(() => {
    if (allSelectBookFlag == AllSelectBookFlag.PARTIAL_SELECT_FLAG) {
      return
    }
    if (allSelectBookFlag == AllSelectBookFlag.ALL_SELECT_FLAG) {
      const currentBooks = Array.from(books)
      currentBooks.forEach((item: Ink) => (item.checked = false))
      setBooks(currentBooks)
    } else if (allSelectBookFlag == AllSelectBookFlag.NOT_ALL_SELECT_FLAG) {
      const currentBooks = Array.from(books)
      currentBooks.forEach((item: Ink) => (item.checked = true))
      setBooks(currentBooks)
    }
  }, [allSelectBookFlag])

  useEffect(() => {
    if (isSuccess) {
      if (!acquireBookShelfFlag) {
        data.data.data.forEach((item: BookShelfType) => {
          selectOptions.push({
            value: item.id.toString(),
            label: item.label
          })
        })
        acquireBookShelfFlag = true
      }
    }
    return () => updateSearchBookName('')
  }, [data?.data.data])

  useEffect(() => {
    setOptions(books)
  }, [books])

  useEffect(() => {
    if (searchBookName !== '') {
      const escapedKeyword = searchBookName.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
      const regexPattern = `.*${escapedKeyword}.*`
      const regex = new RegExp(regexPattern, 'i')
      const filterOptions = books.filter((item) => {
        return regex.test(item.name ?? '')
      })
      setOptions(filterOptions)
    } else {
      setOptions(books)
    }
  }, [searchBookName])

  return (
    <>
      {isPending ? (
        <Skeleton
          className="p-5"
          active
          paragraph={{ rows: 10 }}
        />
      ) : books.length === 0 ? (
        !isOtherBookShelfFlag ? (
          <EmptyPage name="暂时没有书籍，请先导入书籍哦~" />
        ) : (
          <EmptyPage name="该用户还没有上传书籍哦！快邀请TA分享吧！" />
        )
      ) : (
        <BookShelfList
          books={books}
          setBooks={setBooks}
          options={options}
          query={query}
        />
      )}

      <OperateBookShelfModal
        books={books}
        setBooks={setBooks}
        currentBookShelf={currentBookShelf}
        editBookShelfOpenFlag={editBookShelfOpenFlag}
        setEditBookShelfOpenFlag={setEditBookShelfOpenFlag}
        cover={cover}
        setCover={setCover}
        selectBookShelfValue={selectBookShelfValue}
        setSelectBookShelfValue={setSelectBookShelfValue}
        selectOptions={selectOptions}
      />
    </>
  )
}
