import { deleteBookByBookIdAPI, request } from '@/shared/API'
import InkCard from '@/shared/components/InkCard'
import { AllSelectBookFlag } from '@/shared/enums'
import { useActionBookStore } from '@/shared/store'
import { Ink } from '@/shared/types'
import { BookShelfType } from '@/shared/types/bookshelf'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { message, RadioChangeEvent, UploadFile } from 'antd'
import { AxiosError } from 'axios'
import { motion } from 'framer-motion'
import EmptyPage from '../EmptyPage'
import UploadPhoto from '../UploadPhoto'

interface BookShelfPropsType {
  bookShelfId: number
  books: Ink[]
  setBooks: React.Dispatch<React.SetStateAction<Ink[]>>
}

interface operateBookShelfType {
  operate: string
  bookShelfInfo: object
  api: string
}

interface formProps {
  bookShelfId: string
  bookShelfName: string
}

function BookShelf({ bookShelfId, books, setBooks }: BookShelfPropsType) {
  const {
    allSelectBookFlag,
    cancelFlag,
    deleteBookFlag,
    bookToBookShelfFlag,
    searchBookName,
    modifyBookShelfFlag,
    isOtherBookShelfFlag,
    updateAllSelectFlag,
    updateCancelFlag,
    updateDeleteFlag,
    updateBookToBookShelfFlag,
    updateSearchBookName,
    updateModifyBookShelfFlag
  } = useActionBookStore()
  const [form] = Form.useForm()
  const [value, setValue] = useState(true)
  const [addBookShelfOpenFlag, setAddBookShelfOpenFlag] = useState(false)
  const [cover, setCover] = useState<UploadFile[]>([])
  const [selectOptions] = useState([{ value: 'new', label: '新建书架' }])
  const [selectBookShelfValue, setSelectBookShelfValue] = useState(selectOptions[0].value)
  const [options, setOptions] = useState([] as Ink[])
  const { TextArea } = Input
  let acquireBookShelfFlag = false

  const { data, isSuccess } = useQuery({
    queryKey: ['bookshelf'],
    queryFn: () => request.get('/bookshelf')
  })

  const currentBookShelf: BookShelfType = data?.data.data.filter((item: BookShelfType) => item.id == bookShelfId)[0]
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
      if (data.data.data === undefined) {
        return message.error(data.data.message)
      }
      if (data.data.data.md5 === undefined) {
        handlerUpdateBookShelf(data.data.data.id)
        queryClient.invalidateQueries({ queryKey: ['bookshelf'] })
        message.success(data.data.message)
      } else {
        queryClient.invalidateQueries({ queryKey: ['bookshelf_book'] })
        message.success(data.data.message)
      }
    },
    onError: (result: AxiosError) => {
      const responseData = result.response?.data as { message?: string | string[] }
      if (responseData.message) {
        if (Array.isArray(responseData.message)) {
          responseData.message.forEach((item) => {
            message.error(item)
          })
        } else {
          message.error(responseData.message as string)
        }
      }
    }
  })

  const { mutate: updateBookShelfMutate } = useMutation({
    mutationFn: (bookShelfData: BookShelfType) => request.put(`/bookshelf/${bookShelfData.id}`, bookShelfData),
    onSuccess: (data) => {
      message.success(data.data.message)
      queryClient.invalidateQueries({ queryKey: ['bookshelf'] })
    },
    onError: (result: AxiosError) => {
      const responseData = result.response?.data as { message?: string | string[] }
      if (responseData.message) {
        if (Array.isArray(responseData.message)) {
          responseData.message.forEach((item) => {
            message.error(item)
          })
        } else {
          message.error(responseData.message as string)
        }
      }
    }
  })

  const handleChange = (value: string) => {
    setSelectBookShelfValue(value)
  }

  // 0：修改，1：新增
  const handlerFinish = (bookShelf: formProps, operate: number) => {
    if (operate === 1) {
      const obj = {
        api: '/bookshelf',
        operate: 'add',
        bookShelfInfo: {
          ...bookShelf,
          bookShelfId: -1
        }
      }
      if (bookShelf.bookShelfId === selectOptions[0].value) {
        operateBookShelfMutate(obj)
      } else {
        handlerUpdateBookShelf(Number(bookShelf.bookShelfId))
      }
    } else {
      const bookShelfData: unknown = {
        ...bookShelf,
        id: currentBookShelf.id,
        position: currentBookShelf.position
      }

      updateBookShelfMutate(bookShelfData as BookShelfType)
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
        form.setFieldsValue({
          bookShelfId: selectOptions[0].value,
          status: false,
          bookShelfName: '',
          bookShelfDescription: ''
        })
        setCover([])
      }
      setAddBookShelfOpenFlag(true)
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
    return () => updateSearchBookName('')
  }, [data?.data.data])

  useEffect(() => {
    setOptions(books)
  }, [books])

  useEffect(() => {
    if (searchBookName !== '') {
      const regex = new RegExp('.*' + searchBookName.split('').join('.*') + '.*', 'i')
      const filterOptions = books.filter((item) => {
        return regex.test(item.name ?? '')
      })
      setOptions(filterOptions)
    } else {
      setOptions(books)
    }
  }, [searchBookName])

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value)
  }

  return (
    <>
      {books.length === 0 ? (
        !isOtherBookShelfFlag ? (
          <EmptyPage name="暂时没有书籍，请先导入书籍哦~" />
        ) : (
          <EmptyPage name="该用户还没有上传书籍哦！快邀请TA分享吧！" />
        )
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
                      customClassName="mr-4 mb-3 mt-3"
                      cancelFlag={cancelFlag}
                    />
                  </li>
                )
              })}
          </ul>
        </motion.div>
      )}

      <Modal
        title={bookToBookShelfFlag ? '添加到书架' : '编辑书架信息'}
        open={addBookShelfOpenFlag}
        onOk={() => {
          form.submit()
          setAddBookShelfOpenFlag(false)
          updateBookToBookShelfFlag(false)
          updateModifyBookShelfFlag(false)
        }}
        onCancel={() => {
          setAddBookShelfOpenFlag(false)
        }}
        afterClose={() => {
          updateBookToBookShelfFlag(false)
          updateModifyBookShelfFlag(false)
        }}
        okText="保存"
        cancelText="取消"
        className="flex justify-center text-center"
      >
        <Form
          className="flex flex-col justify-center p-5 px-8"
          form={form}
          onFinish={(bookShelf) => handlerFinish(bookShelf, bookToBookShelfFlag ? 1 : 0)}
        >
          {bookToBookShelfFlag ? (
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
          ) : null}

          {selectBookShelfValue === selectOptions[0].value ? (
            <>
              <Form.Item
                className="min-[375px]:w-[200px] md:w-[250px]"
                label="书架名"
                name="bookShelfName"
                rules={[{ required: true, message: '请填写完整' }]}
              >
                <Input placeholder="请输入书架名" />
              </Form.Item>

              <Form.Item
                className="min-[375px]:w-[200px] md:w-[250px]"
                label="书架状态"
                name="status"
              >
                <Radio.Group
                  value={value}
                  onChange={onChange}
                >
                  <Radio value={false}>私有</Radio>
                  <Radio value={true}>公开</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                className="min-[375px]:w-[200px] md:w-[250px]"
                label="书架封面"
                name="bookShelfCover"
              >
                <UploadPhoto
                  form={form}
                  name="bookShelfCover"
                  fileName={cover}
                  setFileName={setCover}
                />
              </Form.Item>
              <Form.Item
                className="min-[375px]:w-[200px] md:w-[250px]"
                label="书架描述 "
                name="bookShelfDescription"
              >
                <TextArea
                  placeholder="请输入书架的描述"
                  autoSize={{ minRows: 2, maxRows: 4 }}
                />
              </Form.Item>
            </>
          ) : null}
        </Form>
      </Modal>
    </>
  )
}

export default BookShelf
