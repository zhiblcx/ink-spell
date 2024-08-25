import { operateBookShelfMutation, selectMyBookShelfQuery, updateBookShelfDetailMutation } from '@/features/bookshelf'
import { selectOneselfInfoQuery } from '@/features/user'
import { deleteBookByBookIdAPI, request } from '@/shared/API'
import InkCard from '@/shared/components/InkCard'
import { AllSelectBookFlag } from '@/shared/enums'
import { useActionBookStore } from '@/shared/store'
import { Ink } from '@/shared/types'
import { Book } from '@/shared/types/book'
import { BookShelfType } from '@/shared/types/bookshelf'
import { UrlUtils } from '@/shared/utils/UrlUtils'
import { EllipsisOutlined, StarFilled, StarOutlined } from '@ant-design/icons'
import { useMutation, useQueryClient } from '@tanstack/react-query'
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
  const { data: query } = selectOneselfInfoQuery()
  let acquireBookShelfFlag = false

  const collectBookMd5 = query?.data.data.booksInfo.reduce((acc: Array<string>, item: Book) => {
    return acc.concat(item.md5)
  }, [])

  const { data, isSuccess } = selectMyBookShelfQuery()

  const currentBookShelf: BookShelfType = data?.data.data.filter((item: BookShelfType) => item.id == bookShelfId)[0]

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

  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: (item: Ink) => deleteBookByBookIdAPI(item.id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['bookshelf_book'] })
      message.success(data.data.data.message)
    }
  })

  const { mutate: operateBookShelfMutate } = operateBookShelfMutation(
    handlerUpdateBookShelf,
    () => queryClient.invalidateQueries({ queryKey: ['bookshelf'] }),
    () => queryClient.invalidateQueries({ queryKey: ['bookshelf_book'] })
  )

  const { mutate: updateBookShelfMutate } = updateBookShelfDetailMutation(() =>
    queryClient.invalidateQueries({ queryKey: ['bookshelf'] })
  )

  const { mutate: collectBookMutate } = useMutation({
    mutationFn: (bookId: number) => request.post(`/book/${bookId}`),
    onSuccess: (data) => {
      message.success(data.data.message)
      queryClient.invalidateQueries({ queryKey: ['user'] })
    },
    onError: (result: AxiosError) => {
      const data = (result.response?.data as { message?: string })?.message ?? '服务器错误'
      message.error(data)
    }
  })

  const { mutate: cancelCollectBookMutate } = useMutation({
    mutationFn: (bookId: number) => request.delete(`/book/${bookId}`),
    onSuccess: (data) => {
      message.success(data.data.message)
      queryClient.invalidateQueries({ queryKey: ['user'] })
    },
    onError: (result: AxiosError) => {
      const data = (result.response?.data as { message?: string })?.message ?? '服务器错误'
      message.error(data)
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
        setSelectBookShelfValue(selectOptions[0].value)
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
      ) : isOtherBookShelfFlag ? (
        <div>
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
                      className="pb-5"
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
                            onClick={() => {
                              window.open(
                                `/book/${UrlUtils.encodeUrlById(item.id.toString())}?chapter=${UrlUtils.encodeUrlById('1')}`,
                                '_blank'
                              )
                            }}
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
                          <span> {item.name ? `${item.name}` : '暂无书名'}</span>
                        </p>
                        <p className="roboto">{item.author ? item.author : '无作者'}</p>
                        <p className="roboto">
                          {item.protagonist
                            ? `
      ${item.protagonist.split('|')[0]}|${item.protagonist.split('|')[1]}`
                            : '无主角'}
                        </p>
                        <p className="roboto line-clamp-3 w-[90%] break-all">
                          {item.description === null || item.description === '' ? '暂无描述' : item.description}
                        </p>
                      </Card>
                    </li>
                  )
                })}
            </ul>
          </motion.div>
        </div>
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
