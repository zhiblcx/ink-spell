import { selectOneselfInfoQuery, updateUserInfoMutation } from '@/features/user'
import EmailInput from '@/shared/components/EmailInput'
import UploadPhoto from '@/shared/components/UploadPhoto'
import { QueryKeys } from '@/shared/enums'
import { VerifiedOutlined } from '@ant-design/icons'
import { type UploadFile, Input } from 'antd'
import { useTranslation } from 'react-i18next'
import styles from './styles.module.scss'

export default function Profile() {
  const { t } = useTranslation(['AUTH', 'COMMON', 'PROMPT', 'VALIDATION'])
  const [openFlag, setOpenFlag] = useState(false)
  const [form] = Form.useForm()
  const [avatar, setAvatar] = useState<UploadFile[]>([])

  const queryClient = useQueryClient()
  const query = selectOneselfInfoQuery()

  const { mutate } = updateUserInfoMutation(
    () => queryClient.invalidateQueries({ queryKey: [QueryKeys.USER_KEY] }),
    setOpenFlag
  )

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
              <span>{query.data?.data.data.email ?? t('PROMPT:no_email_currently_available')}</span>
            </h2>
            <div className={styles.data}>
              <h3>
                {query.data?.data.data.books}
                <br />
                <span>{t('COMMON:upload_book')}</span>
              </h3>
              <h3>
                {query.data?.data.data.followers}
                <br />
                <span>{t('COMMON:followers')}</span>
              </h3>
              <h3>
                {query.data?.data.data.following}
                <br />
                <span>{t('COMMON:following')}</span>
              </h3>
            </div>
            <div>
              <Button
                className="p-5"
                onClick={() => {
                  setOpenFlag(true)
                }}
              >
                {t('COMMON:manage')}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Modal
        title={t('COMMON:edit_personal_information')}
        open={openFlag}
        onOk={() => form.submit()}
        onCancel={() => {
          setOpenFlag(false)
        }}
        okText={t('COMMON:save')}
        cancelText={t('COMMON:cancel')}
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
              label={t('AUTH:avatar')}
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
              label={t('AUTH:username')}
              name="username"
              rules={[{ required: true, message: t('VALIDATION:username_not_filled') }]}
            >
              <Input placeholder={t('VALIDATION:enter_username')} />
            </Form.Item>
            <Form.Item
              className="min-[375px]:w-[200px] md:w-[250px]"
              label={t('AUTH:email')}
              name="email"
              rules={[{ type: 'email', message: t('VALIDATION:enter_valid_email') }]}
            >
              <EmailInput
                form={form}
                email={query.data?.data.data.email}
              />
            </Form.Item>
            <Form.Item
              className="min-[375px]:w-[200px] md:w-[250px]"
              label={t('AUTH:code')}
              name="code"
            >
              <Input
                prefix={<VerifiedOutlined />}
                placeholder={t('VALIDATION:enter_verification_code')}
              />
            </Form.Item>
          </Form>
        </ConfigProvider>
      </Modal>
    </div>
  )
}
