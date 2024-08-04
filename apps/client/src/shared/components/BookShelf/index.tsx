import { deleteBookByBookIdAPI, request } from '@/shared/API'
import InkCard from '@/shared/components/InkCard'
import { AllSelectBookFlag } from '@/shared/enums'
import { useActionBookStore } from '@/shared/store'
import { Ink } from '@/shared/types'
import { BookShelfType } from '@/shared/types/bookshelf'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { message } from 'antd'
import { motion } from 'framer-motion'
import { Suspense } from 'react'

interface BookShelfPropsType {
  books: Ink[]
  setBooks: React.Dispatch<React.SetStateAction<Ink[]>>
}

interface operateBookShelfType {
  operate: string
  bookShelfInfo: object
  api: string
}

function BookShelf({ books = [], setBooks }: BookShelfPropsType) {
  const {
    allSelectBookFlag,
    cancelFlag,
    deleteBookFlag,
    bookToBookShelfFlag,
    updateAllSelectFlag,
    updateCancelFlag,
    updateDeleteFlag,
    updateBookToBookShelfFlag
  } = useActionBookStore()
  const [form] = Form.useForm()
  const [addBookShelfOpenFlag, setAddBookShelfOpenFlag] = useState(false)
  const [selectOptions] = useState([
    {
      value: 'new',
      label: '新建书架'
    }
  ])
  let acquireBookShelfFlag = false
  const [selectBookShelfValue, setSelectBookShelfValue] = useState('new')

  const { data, isSuccess } = useQuery({
    queryKey: ['bookshelf'],
    queryFn: () => request.get('/bookshelf')
  })

  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: (item: Ink) => deleteBookByBookIdAPI(item.id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['bookshelf_book'] })
      message.success(data.data.data.message)
    }
  })

  const { mutate: operateBookShelfMutate } = useMutation({
    mutationFn: (result: operateBookShelfType) => {
      if (result.operate === 'add') {
        return request.post(result.api, result.bookShelfInfo)
      } else {
        return request.put(result.api, result.bookShelfInfo)
      }
    },
    onSuccess: (data) => {
      if (data.data.data.md5 === undefined) {
        handlerUpdateBookShelf(data.data.data.id)
      }
      message.success(data.data.message)
    }
  })

  const handleChange = (value: string) => {
    setSelectBookShelfValue(value)
  }

  const handlerFinish = (bookShelf) => {
    const obj = {
      api: '/bookshelf',
      operate: 'add',
      bookShelfInfo: {
        bookShelfName: bookShelf.bookShelfName,
        bookShelfId: -1
      }
    }
    if (bookShelf.bookShelfId == 'new') {
      operateBookShelfMutate(obj)
    } else {
      handlerUpdateBookShelf(Number(bookShelf.bookShelfId))
    }
  }

  const handlerUpdateBookShelf = (bookShelfId: number) => {
    setBooks(
      books.filter((item) => {
        if (item.checked) {
          const obj = {
            api: `/book/${item.id}`,
            operate: 'update',
            bookShelfInfo: {
              ...item,
              bookShelfId: bookShelfId
            }
          }
          operateBookShelfMutate(obj)
          return false
        }
        return true
      }) ?? []
    )
  }

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

  useEffect(() => {
    if (bookToBookShelfFlag) {
      setAddBookShelfOpenFlag(true)
    }
  }, [bookToBookShelfFlag])

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
    if (deleteBookFlag) {
      // 删除书本
      const remainBook = books.filter((item) => {
        if (item.checked) {
          mutate(item)
          return false
        }
        return true
      })
      setBooks(remainBook)
      updateDeleteFlag(false)
      updateCancelFlag(true)
    }
  }, [deleteBookFlag])

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
  }, [data?.data.data])

  return (
    <Suspense fallback={<Skeleton />}>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="flex flex-wrap min-[375px]:justify-center md:justify-start"
      >
        {books.map((item: Ink, index: number) => {
          return (
            <InkCard
              onClickCheckbox={() => {
                // 显示地下那一行菜单
                if (!item.checked) {
                  updateCancelFlag(false)
                }
                const currentBooks: Ink[] = Array.from(books)
                currentBooks[index].checked = !item.checked
                setBooks(currentBooks)

                // 判断用户是否是部分选择
                const flag = currentBooks.some((item) => !item.checked)
                !flag
                  ? updateAllSelectFlag(AllSelectBookFlag.NOT_ALL_SELECT_FLAG)
                  : updateAllSelectFlag(AllSelectBookFlag.PARTIAL_SELECT_FLAG)
              }}
              ink={item}
              customClassName="mr-4 mb-3 mt-3"
              key={item.id}
              cancelFlag={cancelFlag}
            />
          )
        })}
      </motion.div>

      <Modal
        title="添加到书架"
        open={addBookShelfOpenFlag}
        onOk={() => {
          form.submit()
          setAddBookShelfOpenFlag(false)
        }}
        onCancel={() => {
          setAddBookShelfOpenFlag(false)
        }}
        afterClose={() => {
          updateBookToBookShelfFlag(false)
        }}
        okText="保存"
        cancelText="取消"
        className="flex justify-center text-center"
      >
        <Form
          className="flex flex-col justify-center p-5 px-8"
          form={form}
          onFinish={(bookShelf) => handlerFinish(bookShelf)}
          initialValues={{ bookShelfId: selectOptions[0].value }}
        >
          <Form.Item
            className="min-[375px]:w-[200px] md:w-[250px]"
            label="选择书架"
            name="bookShelfId"
          >
            <Select
              onChange={handleChange}
              style={{ width: 180 }}
              options={selectOptions}
            />
          </Form.Item>
          {selectBookShelfValue === 'new' ? (
            <Form.Item
              className="min-[375px]:w-[200px] md:w-[250px]"
              label="书架名"
              name="bookShelfName"
              rules={[{ required: true, message: '请填写完整' }]}
            >
              <Input placeholder="请输入书架名" />
            </Form.Item>
          ) : (
            ''
          )}
        </Form>
      </Modal>
    </Suspense>
  )
}

export default BookShelf
