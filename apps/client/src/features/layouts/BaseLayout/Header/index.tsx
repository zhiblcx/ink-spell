import { selectBookByBookShelfIdQuery, selectMyBookShelfQuery } from '@/features/bookshelf'
import { selectOneselfInfoQuery, updateUserPasswordMutation } from '@/features/user'
import { request } from '@/shared/API'
import ThemeToggle from '@/shared/components/ThemeToggle'
import { Menu } from '@/shared/enums'
import { useActionBookStore, useMenuStore } from '@/shared/store'
import { Book } from '@/shared/types/book'
import { AuthUtils } from '@/shared/utils'
import { newConfirmPasswordRule } from '@/shared/utils/confirmPasswordRule'
import { Md5Utils } from '@/shared/utils/Md5Utils'
import { UrlUtils } from '@/shared/utils/UrlUtils'
import { LockOutlined } from '@ant-design/icons'
import { useQuery } from '@tanstack/react-query'
import { ReactNode, useNavigate, useRouter } from '@tanstack/react-router'
import type { MenuProps, UploadFile, UploadProps } from 'antd'
import { message } from 'antd'
import { AlignLeft, AlignRight } from 'lucide-react'

export default function Header() {
  const router = useRouter()
  const navigate = useNavigate()
  const showSearchReg = /^\/$|^\/bookshelf\/.*$/
  const { menu, setMenu } = useMenuStore()
  const { uploadFileFlag, updateUploadFileFlag, updateSearchBookName } = useActionBookStore()
  const [options, setOptions] = useState([])
  const [optionTotal, setOptionTotal] = useState([])
  const [openFlag, setOpenFlag] = useState(false)
  const [form] = Form.useForm()

  const reg = /\d+/
  const urlSplit = router.latestLocation.href.split('/')
  const url = `/${urlSplit[1]}/${urlSplit.length === 3 ? UrlUtils.decodeUrlById(urlSplit[2]) : undefined}`
  const match = url.match(reg)

  const { data: myBookShelf } = selectMyBookShelfQuery()
  let bookShelfId = match !== null ? match[0] : myBookShelf?.data.data[0].id

  // TODO: remove undefined
  const { data: queryBook, isSuccess } = selectBookByBookShelfIdQuery(bookShelfId as string)

  useEffect(() => {
    if (isSuccess) {
      setOptionTotal(
        queryBook.data.data.map((item: Book) => ({
          label: item.name,
          value: item.name
        }))
      )
    }
  }, [isSuccess])

  const query = useQuery(selectOneselfInfoQuery)
  const { mutate } = updateUserPasswordMutation()

  interface FileWithMD5 extends File {
    md5?: string
  }
  interface UploadFileMD5 extends UploadFile {
    md5?: string
  }

  const getExtraData: UploadProps['data'] = (file: UploadFileMD5) => {
    return {
      md5: file.md5,
      bookShelfId
    }
  }

  const props: UploadProps = {
    accept: 'text/plain',
    action: '/api/book/upload/file',
    data: getExtraData,
    headers: {
      authorization: `Bearer ${AuthUtils.getToken()}`
    },
    showUploadList: false,
    method: 'post',
    maxCount: 5,
    name: 'file',
    beforeUpload: async (file: FileWithMD5) => {
      const isTxt = file.type === 'text/plain'
      if (!isTxt) {
        message.error(`仅支持上传 txt 文件`)
      }

      file.md5 = await Md5Utils.getFileMD5(file)
      const result = await request.get(`/book/md5?md5=${file.md5}&file_name=${file.name}`)

      if (result.data.data.md5) {
        if (result.data.data.path === '') {
          message.error('请勿重复上传')
        } else {
          message.success('上传成功')
          if (!uploadFileFlag) {
            updateUploadFileFlag(true)
          }
        }
        return false
      }
      return isTxt || Upload.LIST_IGNORE
    },
    onChange: (info) => {
      if (info.file.status === 'done') {
        message.success('上传成功')
        if (!uploadFileFlag) {
          updateUploadFileFlag(true)
        }
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`)
      }
    }
  }

  const items: MenuProps['items'] = [
    {
      key: 1,
      label: <div onClick={() => navigate({ to: '/profile' })}>个人资料</div>
    },
    {
      key: 2,
      label: <div onClick={() => navigate({ to: '/collectbookshelf' })}>我的收藏</div>
    },
    {
      key: 3,
      label: <div onClick={() => setOpenFlag(true)}>重置密码</div>
    },
    {
      key: 4,
      label: (
        <div
          onClick={() => {
            AuthUtils.clearToken()
            navigate({ to: '/signin', replace: true })
          }}
        >
          退出登录
        </div>
      )
    }
  ]

  function Icon(props: ReactNode) {
    return (
      <div onClick={props.onClick}>
        {menu === Menu.EXTEND ? (
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
    const regex = new RegExp('.*' + keyword.split('').join('.*') + '.*', 'i')
    return regex.test(item.label)
  }

  return (
    <div className="flex items-center justify-between py-4">
      <div className="flex items-center">
        <Icon
          onClick={() => {
            setMenu(menu === Menu.EXTEND ? Menu.SHRINK : Menu.EXTEND)
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
              placeholder="请输入要搜索的书名"
              onSearch={onSearch}
              enterButton
            />
          </AutoComplete>
        ) : null}
      </div>
      <div className="flex items-center justify-center min-[375px]:ml-2 min-[375px]:space-x-2 md:mr-10 md:space-x-4">
        <ThemeToggle />
        <Dropdown
          menu={{ items }}
          placement="bottomLeft"
        >
          <Avatar
            src={import.meta.env.VITE_SERVER_URL + query.data?.data.data.avatar}
            size={34}
          />
        </Dropdown>
        <Upload
          {...props}
          multiple
        >
          <Button type="primary">导入图书</Button>
        </Upload>
      </div>

      <Modal
        maskClosable
        onCancel={() => {
          setOpenFlag(false)
        }}
        onOk={() => {
          console.log('asdhjklfasdho')
          form.submit()
          setOpenFlag(false)
        }}
        title="重置密码"
        open={openFlag}
        okText="保存"
        cancelText="取消"
      >
        <Form
          className="flex flex-col justify-center p-5 px-8"
          layout="vertical"
          form={form}
          onFinish={mutate}
        >
          <Form.Item
            className="min-[375px]:w-[200px] md:w-[250px]"
            label="旧密码"
            name="password"
            rules={[{ required: true, message: '密码未填写' }]}
          >
            <Input.Password placeholder="请输入你的密码" />
          </Form.Item>

          <Form.Item
            className="min-[375px]:w-[200px] md:w-[250px]"
            label="新密码"
            name="newPassword"
            hasFeedback
            rules={[{ required: true, message: '密码未填写' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="请输入你的确认密码"
            />
          </Form.Item>

          <Form.Item
            className="min-[375px]:w-[200px] md:w-[250px]"
            label="确认密码"
            name="confirmPassword"
            dependencies={['password']}
            hasFeedback
            rules={[{ required: true, message: '密码未填写' }, newConfirmPasswordRule]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="请再输入一次密码"
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
