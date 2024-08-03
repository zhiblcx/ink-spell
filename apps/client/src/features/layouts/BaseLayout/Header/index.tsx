import { gerProfileAPI, request } from '@/shared/API'
import ThemeToggle from '@/shared/components/ThemeToggle'
import { Menu } from '@/shared/enums'
import { useMenuStore } from '@/shared/store'
import { AuthUtils } from '@/shared/utils'
import { Md5Utils } from '@/shared/utils/Md5Utils'
import { useQuery } from '@tanstack/react-query'
import { ReactNode, useNavigate, useRouter } from '@tanstack/react-router'
import type { MenuProps, UploadFile, UploadProps } from 'antd'
import { message } from 'antd'
import { AlignLeft, AlignRight } from 'lucide-react'

function Header() {
  const { Search } = Input
  const { menu, setMenu } = useMenuStore()
  const navigate = useNavigate()
  const router = useRouter()
  const showSearchReg = /^\/$|^\/bookshelf\/.*$/

  const query = useQuery({
    queryKey: ['user'],
    queryFn: () => gerProfileAPI()
  })

  interface FileWithMD5 extends File {
    md5?: string
  }
  interface UploadFileMD5 extends UploadFile {
    md5?: string
  }

  const getExtraData: UploadProps['data'] = (file: UploadFileMD5) => {
    return {
      md5: file.md5
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
      const result = await request.get(`/book/md5?md5=${file.md5}`)

      if (result.data.data.md5) {
        if (result.data.data.path === '') {
          message.error('请勿重复上传')
        } else {
          message.success('上传成功')
        }
        return false
      }
      return isTxt || Upload.LIST_IGNORE
    },
    onChange: (info) => {
      if (info.file.status === 'done') {
        message.success('上传成功')
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`)
      }
    }
  }

  const items: MenuProps['items'] = [
    {
      key: 1,
      label: (
        <div
          onClick={() => {
            navigate({ to: '/profile' })
          }}
        >
          个人资料
        </div>
      )
    },
    {
      key: 2,
      label: (
        <div
          onClick={() => {
            console.log('重置密码')
          }}
        >
          重置密码
        </div>
      )
    },
    {
      key: 3,
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
  return (
    <div className="flex items-center justify-between py-4">
      <div className="flex items-center">
        <Icon
          onClick={() => {
            setMenu(menu === Menu.EXTEND ? Menu.SHRINK : Menu.EXTEND)
          }}
        />
        {showSearchReg.test(router.latestLocation.pathname) ? (
          <Search
            className="mx-2 flex items-center justify-center min-[375px]:mx-0 min-[375px]:w-[145px] md:w-[200px]"
            placeholder="请输入要搜索的书"
          />
        ) : (
          ''
        )}
      </div>
      <div className="flex items-center justify-center min-[375px]:ml-2 min-[375px]:space-x-2 md:mr-10 md:space-x-4">
        <ThemeToggle />
        <Dropdown
          menu={{ items }}
          placement="bottomLeft"
        >
          <Avatar
            src={process.env.VITE_SERVER_URL + query.data?.data.data.avatar}
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
    </div>
  )
}

export default Header
