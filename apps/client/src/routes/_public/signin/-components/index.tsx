import {
  githubMarkImg,
  githubMarkWhiteImg,
  loginDarkImg,
  loginLightImg,
  logoLightImg
} from '@/assets/images'
import { signinMutation } from '@/features/auth'
import { APP_NAME } from '@/shared/constants/app'
import { useThemeStore } from '@/shared/store'
import { AuthUtils } from '@/shared/utils'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { motion } from 'framer-motion'
import ForgetPasswordModel from './ForgetPasswordModel'
import './index.scss'

type SigninType = {
  account: string
  password: string
  remember: boolean
}

export default function Signin() {
  const { t } = useTranslation(['AUTH', 'VALIDATION', 'COMMON', 'PROMPT'])
  const { theme } = useThemeStore()
  const [form] = Form.useForm()
  const { mutate } = signinMutation()
  const [modalOpen, setModalOpen] = useState(false)
  const [state, setState] = useState(true)

  const showModal = () => {
    setState(true)
    setModalOpen(true)
  }

  useEffect(() => {
    const rememberAccountData = JSON.parse(AuthUtils.getRememberAccountData() ?? 'null')
    if (rememberAccountData) {
      form.setFieldsValue({ ...rememberAccountData, remember: true })
    }
  }, [form])
  return (
    <div className="relative flex h-screen w-screen items-center justify-center overflow-hidden">
      <img
        className="absolute h-full w-full object-cover object-center"
        src={theme === ThemeEnum.DARK ? loginDarkImg : loginLightImg}
      />

      <ConfigProvider
        theme={{
          components: {
            Form: {
              itemMarginBottom: 5,
              verticalLabelPadding: '0 0 2px'
            }
          }
        }}
      >
        <motion.div
          layout
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          <Form
            form={form}
            className="signin_translation relative flex flex-col items-center justify-center rounded-2xl px-14 py-5 shadow-lg backdrop-blur"
            layout="vertical"
            onFinish={mutate}
          >
            <img
              src={logoLightImg}
              className="mb-2 w-[200px]"
            ></img>
            <div className="mb-2">
              {t('COMMON:welcome_to')} {APP_NAME} 🎉
            </div>
            <div className="mb-2 text-xl">{t('AUTH:login')}</div>
            <Form.Item<SigninType>
              className="min-[375px]:w-[200px] md:w-[250px]"
              label={t('AUTH:account')}
              name="account"
              rules={[{ required: true, message: t('VALIDATION:account_not_filled') }]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder={t('VALIDATION:enter_account')}
              />
            </Form.Item>
            <Form.Item<SigninType>
              className="min-[375px]:w-[200px] md:w-[250px]"
              label={t('AUTH:password')}
              name="password"
              rules={[{ required: true, message: t('VALIDATION:password_not_filled') }]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder={t('VALIDATION:enter_password')}
              />
            </Form.Item>
            <Form.Item>
              <Flex
                justify="space-between"
                align="center"
                className="mt-2 min-[375px]:w-[220px] md:w-[250px]"
              >
                <Form.Item<SigninType>
                  name="remember"
                  valuePropName="checked"
                >
                  <Checkbox>{t('AUTH:remember_password')}</Checkbox>
                </Form.Item>
                <Form.Item>
                  <span>
                    {t('AUTH:no_account')}，
                    <Link
                      to="/signup"
                      className="hover:text-blue-200"
                    >
                      {t('AUTH:register_now')}
                    </Link>
                  </span>
                </Form.Item>
              </Flex>
            </Form.Item>
            <Form.Item>
              <Button
                htmlType="submit"
                className="min-[375px]:w-[200px] md:w-[250px]"
              >
                {t('AUTH:login')}
              </Button>
            </Form.Item>
            <Form.Item>
              <span
                className="cursor-pointer hover:text-blue-200"
                onClick={showModal}
              >
                {t('AUTH:forgot_password')}
              </span>
            </Form.Item>
            <Divider>其他方式登录</Divider>
            <ul className="flex space-x-4">
              <li
                className="w-[35px] cursor-pointer rounded-lg bg-white p-1 dark:bg-black"
                onClick={() => {
                  window.open(
                    `https://github.com/login/oauth/authorize?client_id=${import.meta.env.VITE_CLIENT_ID}&redirect_uri=http://127.0.0.1:6600/oauth`,
                    '_blank',
                    'height=600, width=700'
                  )
                }}
              >
                <img src={theme === ThemeEnum.DARK ? githubMarkWhiteImg : githubMarkImg} />
              </li>
            </ul>
          </Form>
        </motion.div>
      </ConfigProvider>

      <ForgetPasswordModel
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        state={state}
        setState={setState}
      />
    </div>
  )
}
