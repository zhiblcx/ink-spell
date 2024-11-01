import { selectMyBookShelfQuery } from '@/features/bookshelf'
import { selectOneselfInfoQuery } from '@/features/user'
import { EmptyPage } from '@/shared/components'
import { ALL_BOOK } from '@/shared/constants'
import { AllSelectBookFlag, EditBookShelfOpenFlag } from '@/shared/enums'
import { useActionBookStore } from '@/shared/store'
import { BookShelfType, Ink } from '@/shared/types'
import { UploadFile } from 'antd'
import { useTranslation } from 'react-i18next'
import { BookShelfList, OperateBookShelfModal } from './components'

interface BookShelfPropsType {
  bookShelfId: number
  books: Ink[]
  setBooks: React.Dispatch<React.SetStateAction<Ink[]>>
}

export default function BookShelf({ bookShelfId, books, setBooks }: BookShelfPropsType) {
  const {
    allSelectBookFlag,
    bookToBookShelfFlag,
    searchBookName,
    modifyBookShelfFlag,
    isOtherBookShelfFlag,
    updateSearchBookName
  } = useActionBookStore()
  const { t } = useTranslation(['COMMON', 'PROMPT'])
  const [form] = Form.useForm()
  const [editBookShelfOpenFlag, setEditBookShelfOpenFlag] = useState(EditBookShelfOpenFlag.MODIFY)
  const [cover, setCover] = useState<UploadFile[]>([])
  const [selectOptions] = useState([{ value: 'new', label: t('COMMON:create_new_bookshelf') }])
  const [selectBookShelfValue, setSelectBookShelfValue] = useState(selectOptions[0].value)
  const [options, setOptions] = useState([] as Ink[])
  const { data: query } = selectOneselfInfoQuery()

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
          bookShelfDescription: currentBookShelf.description ?? t('COMMON:no_description')
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
          if (item.label === ALL_BOOK.label) {
            selectOptions.push({
              value: item.id.toString(),
              label: t('COMMON:all_book')
            })
          } else {
            selectOptions.push({
              value: item.id.toString(),
              label: item.label
            })
          }
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
          <EmptyPage name={t('PROMPT:import_books_prompt')} />
        ) : (
          <EmptyPage name={t('PROMPT:invite_to_share_books')} />
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
