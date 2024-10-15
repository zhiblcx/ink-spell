import { selectOneselfInfoQuery, updateUserInfoMutation } from '@/features/user'
import UploadPhoto from '@/shared/components/UploadPhoto'
import { QueryKeys } from '@/shared/enums'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { type UploadFile, Input } from 'antd'
import styles from './styles.module.scss'

export default function Profile() {
  const [openFlag, setOpenFlag] = useState(false)
  const [form] = Form.useForm()
  const [avatar, setAvatar] = useState<UploadFile[]>([])

  const queryClient = useQueryClient()
  const query = useQuery(selectOneselfInfoQuery)

  const { mutate } = updateUserInfoMutation(() => queryClient.invalidateQueries({ queryKey: [QueryKeys.USER_KEY] }))

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

  return (
    <div className="flex h-[580px] items-center justify-center">
      <div className={styles.card}>
        <div className={styles.imgBx}>
          <img src={import.meta.env.VITE_SERVER_URL + query.data?.data.data.avatar} />
        </div>
        <div className={styles.content}>
          <div className={styles.details}>
            <h2>
              {query.data?.data.data.username}
              <br />
              <span>{query.data?.data.data.email ?? '暂无邮箱'}</span>
            </h2>
            <div className={styles.data}>
              <h3>
                {query.data?.data.data.books}
                <br />
                <span>books</span>
              </h3>
              <h3>
                {query.data?.data.data.followers}
                <br />
                <span>Followers</span>
              </h3>
              <h3>
                {query.data?.data.data.following}
                <br />
                <span>Following</span>
              </h3>
            </div>
            <div>
              <Button
                className="p-5"
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
              <UploadPhoto
                form={form}
                name="avatar"
                fileName={avatar}
                setFileName={setAvatar}
              />
            </Form.Item>
            <Form.Item
              className="min-[375px]:w-[200px] md:w-[250px]"
              label="用户名"
              name="username"
              rules={[{ required: true, message: '用户名未填写' }]}
            >
              <Input placeholder="请输入用户名" />
            </Form.Item>
            <Form.Item
              className="min-[375px]:w-[200px] md:w-[250px]"
              label="邮箱"
              name="email"
              rules={[{ type: 'email', message: '请输入正确的邮箱' }]}
            >
              <Input placeholder="请输入邮箱" />
            </Form.Item>
          </Form>
        </ConfigProvider>
      </Modal>
    </div>
  )
}
