import { request } from '@/shared/API'
import { type Ink } from '@/shared/types'
import { Book } from '@/shared/types/book'
import { AuthUtils, BookUtils } from '@/shared/utils'
import { useMutation } from '@tanstack/react-query'
import { type UploadFile, type UploadProps, Input, message } from 'antd'
import ImgCrop from 'antd-img-crop'
import clsx from 'clsx'
import { Pencil } from 'lucide-react'
import './index.scss'
interface InkCardProps {
  ink: Ink
  customClassName?: string
  cancelFlag: boolean
  onClickCheckbox: () => void
}

export default function InkCard({ ink, customClassName, cancelFlag, onClickCheckbox }: InkCardProps) {
  const { TextArea } = Input
  const [form] = Form.useForm()
  const [openFlag, setOpenFlag] = useState(false)
  const [book, setBook] = useState(ink)
  const [bookCover, setBookCover] = useState<UploadFile[]>([
    {
      uid: book.id.toString(),
      name: book.name ?? '',
      status: 'done',
      url: import.meta.env.VITE_SERVER_URL + book.cover
    }
  ])

  const { mutate } = useMutation({
    mutationFn: (book: Book) => request.put(`/book/${book.id}`, book),
    onSuccess: (result) => {
      setBook({ ...result.data.data })
      message.success('修改成功')
    }
  })

  const props: UploadProps = {
    accept: 'image/png, image/jpeg, image/jpg',
    action: '/api/book/upload/cover',
    headers: {
      authorization: `Bearer ${AuthUtils.getToken()}`
    },
    listType: 'picture-card',
    method: 'post',
    name: 'file',
    fileList: bookCover,
    maxCount: 1,
    beforeUpload: async (file) => {
      const image = file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg'
      return image || Upload.LIST_IGNORE
    },

    onChange: (info) => {
      setBookCover(info.fileList)
      if (info.file.response?.data?.filePath !== undefined) {
        form.setFieldValue('cover', info.file.response.data.filePath)
      }
    }
  }

  useEffect(() => {
    const [role1, role2] = book.protagonist?.split('|') || ['', '']
    form.setFieldsValue({ ...book, role1, role2 })
  }, [book])

  function handlerEditBook() {
    setOpenFlag(true)
  }

  return (
    <>
      <div
        className={clsx(
          customClassName,
          'card relative flex h-[250px] flex-col items-center overflow-hidden rounded-2xl bg-gray-200 shadow-lg dark:bg-gray-800 min-[375px]:w-[130px] md:w-[180px]'
        )}
      >
        <Checkbox
          className={clsx('absolute right-3 top-2', cancelFlag ? 'checkbox' : 'visible z-50')}
          checked={book.checked}
          onClick={onClickCheckbox}
        />

        <Pencil
          className={clsx('absolute left-3 top-3 cursor-pointer')}
          size="16"
          onClick={handlerEditBook}
        />

        <div
          className={clsx(book.name ? 'photo-visible' : '', 'photo h-[100%] w-[100%] overflow-hidden')}
          onClick={() => {
            const localBooks = JSON.parse(BookUtils.getBooks() ?? '[]')
            let chapter = -1
            if (localBooks.length !== 0) {
              const book = localBooks.find((item: Array<string>) => {
                return parseInt(item[0]) === book.id
              })
              if (book !== undefined) {
                chapter = book[1]
              }
            }
            window.open(`/book/${book.id}?chapter=${chapter != -1 ? chapter : 1}`, '_blank')
          }}
        >
          <img
            src={import.meta.env.VITE_SERVER_URL + book.cover}
            className="h-[100%] w-[100%] object-cover"
          />
          )
        </div>
        <p className="ink-name roboto absolute bottom-4 w-[90%] truncate text-center text-xl text-white">
          {book.name ? `${book.name}` : ''}
        </p>
        <p className="roboto mt-[130px] text-sm">{book.author ? book.author : '无作者'}</p>
        <p className="roboto text-sm">
          {book.protagonist
            ? `
      ${book.protagonist.split('|')[0]}|${book.protagonist.split('|')[1]}`
            : '无主角'}
        </p>
        <p className="w-[80%] border-2 border-b-zinc-300"></p>
        <p className="roboto mt-2 line-clamp-3 w-[80%] overflow-hidden text-sm">
          {book.description === undefined ? '' : book.description}
        </p>
      </div>

      <Modal
        title="编辑图书"
        open={openFlag}
        onOk={() => {
          form.submit()
          setOpenFlag(false)
        }}
        onCancel={() => {
          setOpenFlag(false)
        }}
        okText="保存"
        cancelText="取消"
        className="flex justify-center text-center"
      >
        <ConfigProvider
          theme={{
            components: {
              Form: {
                itemMarginBottom: 5,
                verticalLabelPadding: '0 0 0'
              }
            }
          }}
        >
          <Form
            className="flex flex-col justify-center p-5 px-8"
            layout="vertical"
            form={form}
            onFinish={(inputBook) => {
              const currentBook = { ...book, ...inputBook }
              if (inputBook.role1 != '' || inputBook.role2 != '') {
                currentBook.protagonist = inputBook.role1 + '|' + inputBook.role2
              } else {
                currentBook.protagonist = ''
              }
              mutate(currentBook)
            }}
          >
            <Form.Item
              className="min-[375px]:w-[200px] md:w-[250px]"
              label="封面"
              name="cover"
            >
              <ImgCrop rotationSlider>
                <Upload {...props}>{bookCover.length < 1 && '+ Upload'}</Upload>
              </ImgCrop>
            </Form.Item>
            <Form.Item
              className="min-[375px]:w-[200px] md:w-[250px]"
              label="书名"
              name="name"
            >
              <Input placeholder="请输入书名" />
            </Form.Item>
            <Form.Item
              className="min-[375px]:w-[200px] md:w-[250px]"
              label="作者"
              name="author"
            >
              <Input placeholder="请输入作者姓名" />
            </Form.Item>
            <Form.Item
              className="min-[375px]:w-[200px] md:w-[250px]"
              label="主角1"
              name="role1"
            >
              <Input placeholder="请输入主角1的名字" />
            </Form.Item>
            <Form.Item
              className="min-[375px]:w-[200px] md:w-[250px]"
              label="主角2"
              name="role2"
            >
              <Input placeholder="请输入主角2的名字" />
            </Form.Item>
            <Form.Item
              className="min-[375px]:w-[200px] md:w-[250px]"
              label="简介 "
              name="description"
            >
              <TextArea
                placeholder="请输入书的简介"
                autoSize={{ minRows: 2, maxRows: 4 }}
              />
            </Form.Item>
          </Form>
        </ConfigProvider>
      </Modal>
    </>
  )
}
