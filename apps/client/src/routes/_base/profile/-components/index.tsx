import request from '@/shared/API/request'
import { User } from '@/shared/types/user'
import { AuthUtils } from '@/shared/utils'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { type UploadFile, Input, message, UploadProps } from 'antd'
import ImgCrop from 'antd-img-crop'
import styles from './styles.module.scss'

export default function Profile() {
  const [openFlag, setOpenFlag] = useState(false)
  const [form] = Form.useForm()
  const [avatar, setAvatar] = useState<UploadFile[]>([])

  const queryClient = useQueryClient()
  const query = useQuery({ queryKey: ['user'], queryFn: () => request.get('/user/profile') })
  const { mutate } = useMutation({
    mutationFn: (user: User) => request.put('/user', user),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] })
      message.success('修改成功')
    }
  })

  useEffect(() => {
    setAvatar([
      {
        uid: '1',
        name: 'xxx.png',
        status: 'done',
        url: import.meta.env.VITE_SERVER_URL + query.data?.data.data.avatar
      }
    ])
  }, [query.data?.data.data.avatar])

  const props: UploadProps = {
    accept: 'image/png, image/jpeg, image/jpg',
    action: '/api/book/upload/cover',
    headers: {
      authorization: `Bearer ${AuthUtils.getToken()}`
    },
    listType: 'picture-card',
    method: 'post',
    name: 'file',
    fileList: avatar,
    maxCount: 1,
    beforeUpload: async (file) => {
      const image = file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg'
      return image || Upload.LIST_IGNORE
    },

    onChange: (info) => {
      setAvatar(info.fileList)
      if (info.file.response?.data?.filePath !== undefined) {
        form.setFieldValue('avatar', info.file.response.data.filePath)
      }
    }
  }

  return (
    <div className="relative flex h-full items-center justify-center overflow-hidden">
      <div className="select-none text-white dark:text-[#1f1f1f]">
        暂时没有书籍，请先导入书籍哦~暂时没有书籍，请先导入书籍哦~暂时没有书籍，请先导入书籍哦~
        暂时没有书籍，请先导入书籍哦~ 暂时没有书籍，请先导入书籍哦~
      </div>
      <div className="absolute">
        <div className={styles.card}>
          <div className={styles.imgBx}>
            <img src={process.env.VITE_SERVER_URL + query.data?.data.data.avatar} />
          </div>
          <div className={styles.content}>
            <div className={styles.details}>
              <h2>
                {query.data?.data.data.username}
                <br />
                <span>{query.data?.data.data.email}</span>
              </h2>
              <div className={styles.data}>
                <h3>
                  342
                  <br />
                  <span>books</span>
                </h3>
                <h3>
                  321
                  <br />
                  <span>Followers</span>
                </h3>
                <h3>
                  123
                  <br />
                  <span>Following</span>
                </h3>
              </div>
              <div className={styles.actionBtn}>
                <Button
                  type="primary"
                  className={styles.btn}
                >
                  Follow
                </Button>
                <Button
                  className={styles.btn}
                  onClick={() => {
                    setOpenFlag(true)
                  }}
                >
                  Message
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        title="编辑个人信息"
        open={openFlag}
        onOk={() => {
          form.submit()
          setOpenFlag(false)
        }}
        onCancel={() => {
          setOpenFlag(false)
        }}
        afterClose={() => {}}
        okText="保存"
        cancelText="取消"
        className="flex justify-center"
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
            initialValues={query.data?.data.data}
            onFinish={mutate}
          >
            <Form.Item
              className="min-[375px]:w-[200px] md:w-[250px]"
              label="头像"
              name="avatar"
            >
              <ImgCrop rotationSlider>
                <Upload {...props}>{avatar.length < 1 && '+ Upload'}</Upload>
              </ImgCrop>
            </Form.Item>
            <Form.Item
              className="min-[375px]:w-[200px] md:w-[250px]"
              label="用户名"
              name="username"
              rules={[{ required: true, message: '用户名未填写' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              className="min-[375px]:w-[200px] md:w-[250px]"
              label="邮箱"
              name="email"
            >
              <Input />
            </Form.Item>
          </Form>
        </ConfigProvider>
      </Modal>
    </div>
  )
}
