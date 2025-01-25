import { selectMyBookShelfQuery } from '@/features/bookshelf'
import { selectOneselfInfoQuery } from '@/features/user'
import { ALL_BOOK } from '@/shared/constants'
import { BookShelfType, Ink } from '@/shared/types'
import { BookShelfList, OperateBookShelfModal } from './components'

interface BookShelfPropsType {
  bookShelfId: number
  books: Ink[]
  setBooks: React.Dispatch<React.SetStateAction<Ink[]>>
}

export function BookShelf({ bookShelfId, books, setBooks }: BookShelfPropsType) {
  const { allSelectBookFlag, searchBookName, isOtherBookShelfFlag, updateSearchBookName } =
    useActionBookStore()
  const { t } = useTranslation(['COMMON', 'PROMPT'])
  const [selectOptions] = useState([{ value: 'new', label: t('COMMON:create_new_bookshelf') }])
  const [selectBookShelfValue, setSelectBookShelfValue] = useState(selectOptions[0].value)
  const [options, setOptions] = useState([] as Ink[])
  const { data: query } = selectOneselfInfoQuery()

  let acquireBookShelfFlag = false

  const { data, isSuccess, isPending } = selectMyBookShelfQuery()

  const currentBookShelf: BookShelfType = data?.data.filter(
    (item: BookShelfType) => item.id == bookShelfId
  )[0]

  useEffect(() => {
    if (allSelectBookFlag == AllSelectBookEnum.PARTIAL_SELECT_FLAG) {
      return
    }
    if (allSelectBookFlag == AllSelectBookEnum.ALL_SELECT_FLAG) {
      const currentBooks = Array.from(books)
      currentBooks.forEach((item: Ink) => (item.checked = false))
      setBooks(currentBooks)
    } else if (allSelectBookFlag == AllSelectBookEnum.NOT_ALL_SELECT_FLAG) {
      const currentBooks = Array.from(books)
      currentBooks.forEach((item: Ink) => (item.checked = true))
      setBooks(currentBooks)
    }
  }, [allSelectBookFlag])

  useEffect(() => {
    if (isSuccess) {
      if (!acquireBookShelfFlag) {
        data.data.forEach((item: BookShelfType) => {
          if (item.label === ALL_BOOK.label) {
            selectOptions.push({
              value: item.id.toString(),
              label: t('COMMON:sidebar', { context: ALL_BOOK.label })
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
  }, [data?.data])

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
        selectBookShelfValue={selectBookShelfValue}
        setSelectBookShelfValue={setSelectBookShelfValue}
        selectOptions={selectOptions}
      />
    </>
  )
}
