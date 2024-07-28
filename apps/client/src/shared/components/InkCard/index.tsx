import { type Ink } from '@/shared/types'
import { type UploadFile, type UploadProps, Input } from 'antd'
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
  const [bookCover, setBookCover] = useState<UploadFile[]>([])

  useEffect(() => {
    const [role1, role2] = book.protagonist === undefined ? ['', ''] : book.protagonist.slice()
    form.setFieldsValue({ ...book, role1, role2 })
  }, [book])

  function getImageUrl(name: string) {
    return new URL(`../../../assets/images/${name}`, import.meta.url).href
  }

  function handlerEditBook() {
    setOpenFlag(true)
  }

  const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setBookCover(newFileList)
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
          onClick={onClickCheckbox}
          className={clsx('absolute right-3 top-2', cancelFlag ? 'checkbox' : 'visible z-50')}
          checked={ink.checked}
        />

        <Pencil
          className={clsx('absolute left-3 top-3 cursor-pointer')}
          size="16"
          onClick={handlerEditBook}
        />

        <div className={clsx(ink.name ? 'photo-visible' : '', 'photo h-[100%] w-[100%] overflow-hidden')}>
          <img
            src={getImageUrl(ink.ink_img)}
            className="h-[100%] w-[100%] object-cover"
          />
        </div>
        <p className="ink-name roboto absolute bottom-4 w-[90%] truncate text-center text-xl text-white">
          {ink.name ? `${ink.name}` : ''}
        </p>
        <p className="roboto mt-[130px] text-sm">{ink.author ? ink.author : '无作者'}</p>
        <p className="roboto text-sm">
          {ink.protagonist
            ? `
      ${ink.protagonist[0]}|${ink.protagonist[1]}`
            : '无主角'}
        </p>
        <p className="w-[80%] border-2 border-b-zinc-300"></p>
        <p className="roboto mt-2 line-clamp-3 w-[80%] overflow-hidden text-sm">
          {ink.description === undefined ? '' : ink.description}
        </p>
      </div>

      <Modal
        title="编辑图书"
        open={openFlag}
        onOk={() => {
          setOpenFlag(false)
        }}
        onCancel={() => {
          setOpenFlag(false)
        }}
        afterClose={() => {
          setBook({ ...ink })
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
          >
            <Form.Item
              className="min-[375px]:w-[200px] md:w-[250px]"
              label="封面"
              name="cover"
            >
              <ImgCrop rotationSlider>
                <Upload
                  action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                  listType="picture-card"
                  fileList={bookCover}
                  onChange={onChange}
                >
                  {bookCover.length < 1 && '+ Upload'}
                </Upload>
              </ImgCrop>
            </Form.Item>
            <Form.Item
              className="min-[375px]:w-[200px] md:w-[250px]"
              label="书名"
              name="name"
            >
              <Input />
            </Form.Item>
            <Form.Item
              className="min-[375px]:w-[200px] md:w-[250px]"
              label="作者"
              name="author"
            >
              <Input />
            </Form.Item>
            <Form.Item
              className="min-[375px]:w-[200px] md:w-[250px]"
              label="主角1"
              name="role1"
            >
              <Input />
            </Form.Item>
            <Form.Item
              className="min-[375px]:w-[200px] md:w-[250px]"
              label="主角2"
              name="role2"
            >
              <Input />
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
