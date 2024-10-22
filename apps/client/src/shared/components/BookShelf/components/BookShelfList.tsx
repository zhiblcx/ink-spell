import { collectBookByBookIdMutation, deleteBookByBookIdMutation } from '@/features/book'
import { AllSelectBookFlag, QueryKeys } from '@/shared/enums'
import { useActionBookStore } from '@/shared/store'
import { Book, Ink } from '@/shared/types'
import { BookUtils } from '@/shared/utils'
import { EllipsisOutlined, StarFilled, StarOutlined } from '@ant-design/icons'
import { useQueryClient } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import InkCard from '../../InkCard'

interface BookShelfListProps {
  books: Ink[]
  setBooks: React.Dispatch<React.SetStateAction<Ink[]>>
  options: Ink[]
  query: AxiosResponse<any, any> | undefined
}

export function BookShelfList({ books, setBooks, options, query }: BookShelfListProps) {
  const { t } = useTranslation(['COMMON'])
  const {
    deleteBookFlag,
    cancelFlag,
    isOtherBookShelfFlag,
    updateAllSelectFlag,
    updateCancelFlag,
    updateDeleteBookFlag
  } = useActionBookStore()

  const queryClient = useQueryClient()
  const collectBookMd5 = query?.data.data.booksInfo.reduce((acc: Array<string>, item: Book) => acc.concat(item.md5), [])
  const { mutate } = deleteBookByBookIdMutation(() =>
    queryClient.invalidateQueries({ queryKey: [QueryKeys.BOOKSHELF_BOOK_KEY] })
  )

  const { mutate: cancelCollectBookMutate } = deleteBookByBookIdMutation(() =>
    queryClient.invalidateQueries({ queryKey: [QueryKeys.USER_KEY] })
  )
  const { mutate: collectBookMutate } = collectBookByBookIdMutation(() =>
    queryClient.invalidateQueries({ queryKey: [QueryKeys.USER_KEY] })
  )

  useEffect(() => {
    if (deleteBookFlag) {
      // 删除书本
      const remainBook = books.filter((item) => {
        if (item.checked) {
          mutate(item.id)
          return false
        }
        return true
      })
      setBooks(remainBook)
      updateDeleteBookFlag(false)
      updateCancelFlag(true)
    }
  }, [deleteBookFlag])

  useEffect(() => {
    if (books.length !== 0) {
      if (cancelFlag) {
        const currentBooks = Array.from(books)
        currentBooks.forEach((item: Ink) => (item.checked = false))
        updateAllSelectFlag(AllSelectBookFlag.PARTIAL_SELECT_FLAG)
        setBooks(currentBooks)
      }
    }
  }, [cancelFlag])

  return isOtherBookShelfFlag ? (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      style={{ height: 'calc(100% - 115px)' }}
      className="scroll absolute h-full overflow-y-scroll"
    >
      <ul className="flex flex-wrap space-x-3 min-[375px]:justify-center md:justify-start">
        {books
          .filter((book) => options.some((option) => option.id === book.id))
          .reverse()
          .map((item: Ink) => {
            return (
              <li
                className="flex pb-5"
                key={item.id}
              >
                <Card
                  actions={[
                    collectBookMd5.includes(item.md5) ? (
                      <StarFilled
                        style={{ color: 'rgb(253 224 71)' }}
                        key="collect"
                        onClick={() => {
                          const index = query?.data.data.booksInfo.findIndex((ink: Book) => ink.md5 === item.md5)
                          cancelCollectBookMutate(query?.data.data.booksInfo[index].id)
                        }}
                      />
                    ) : (
                      <StarOutlined
                        key="no-collect"
                        className="hidden"
                        onClick={() => collectBookMutate(item.id)}
                      />
                    ),
                    <EllipsisOutlined
                      key="ellipsis"
                      onClick={() => BookUtils.redirectToBookPage(item)}
                    />
                  ]}
                  className="cursor-default overflow-hidden"
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
                  <p className="roboto text-xl font-bold">
                    <span> {item.name ? `${item.name}` : t('COMMON:no_book_title_available')}</span>
                  </p>
                  <p className="roboto">{item.author ? item.author : t('COMMON:no_author')}</p>
                  <p className="roboto">
                    {item.protagonist
                      ? `
      ${item.protagonist.split('|')[0]}|${item.protagonist.split('|')[1]}`
                      : t('COMMON:no_main_character')}
                  </p>
                  <p className="roboto line-clamp-3 w-[90%] break-all">
                    {item.description === null || item.description === ''
                      ? t('COMMON:no_description')
                      : item.description}
                  </p>
                </Card>
              </li>
            )
          })}
      </ul>
    </motion.div>
  ) : (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      style={{ height: 'calc(100% - 115px)' }}
      className="scroll absolute h-full overflow-y-scroll"
    >
      <ul className="flex flex-wrap min-[375px]:justify-center md:justify-start">
        {books
          .filter((book) => options.some((option) => option.id === book.id))
          .reverse()
          .map((item: Ink) => {
            const localBooks = JSON.parse(BookUtils.getBooks() ?? '[]')
            const index = localBooks.find((i: Array<string>) => i[0] == item.id.toString())
            const schedule = index ? ((index[1].currentChapter / index[1].allChapter) * 100).toFixed(1) + '%' : '0.0%'

            return (
              <li key={item.id}>
                <InkCard
                  onClickCheckbox={() => {
                    // 显示地下那一行菜单
                    if (!item.checked) {
                      updateCancelFlag(false)
                    }
                    const currentBooks: Ink[] = Array.from(books)
                    currentBooks[currentBooks.findIndex((i) => i.id === item.id)].checked = !item.checked
                    setBooks(currentBooks)

                    // 判断用户是否是部分选择
                    const flag = currentBooks.some((item) => !item.checked)
                    !flag
                      ? updateAllSelectFlag(AllSelectBookFlag.NOT_ALL_SELECT_FLAG)
                      : updateAllSelectFlag(AllSelectBookFlag.PARTIAL_SELECT_FLAG)
                  }}
                  ink={item}
                  schedule={schedule}
                  customClassName="mr-4 mb-3 mt-3"
                  cancelFlag={cancelFlag}
                />
              </li>
            )
          })}
      </ul>
    </motion.div>
  )
}
