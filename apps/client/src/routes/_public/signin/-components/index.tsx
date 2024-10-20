import loginDarkImg from '@/assets/images/login-dark.png'
import loginLightImg from '@/assets/images/login-light.png'
import logoLight from '@/assets/images/logo-light.png'
import { signinMutation } from '@/features/auth'
import { forgetPasswordByEmailMutation, sendResetPasswordEmailMutation } from '@/features/user'
import { Theme } from '@/shared/enums'
import { useThemeStore } from '@/shared/store'
import { AuthUtils } from '@/shared/utils'
import { confirmPasswordRule } from '@/shared/utils/confirmPasswordRule'
import { LockOutlined, MailOutlined, UserOutlined, VerifiedOutlined } from '@ant-design/icons'
import { Link } from '@tanstack/react-router'
import { motion } from 'framer-motion'

import { APP_NAME } from '@/shared/constants/app'
import startCountdown from '@/shared/utils/startCountdown'
import { useTranslation } from 'react-i18next'
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
  const [forgetPasswordForm] = Form.useForm()
  const { mutate } = signinMutation()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [sendVerificationCode, setSendVerificationCode] = useState(t('COMMON:send'))
  const sendEmail = useRef(null)
  const { mutate: forgetPasswordMutation } = forgetPasswordByEmailMutation(() => setIsModalOpen(false))
  const { mutate: sendResetPasswordEmailMutate } = sendResetPasswordEmailMutation((email) => {
    let countdown = 60
    setSendVerificationCode(t('PROMPT:retry_in_seconds', { seconds: countdown })) // 初始状态
    startCountdown(countdown, setSendVerificationCode)
    forgetPasswordForm.setFieldValue('email', email)
    setState(false)
  })
  const [account, setAccount] = useState('')
  const [state, setState] = useState(true)

  const showModal = () => {
    setState(true)
    setIsModalOpen(true)
  }

  const handleOk = () => {
    if (state) {
      sendResetPasswordEmailMutate(account)
    } else {
      forgetPasswordForm.submit()
    }
  }

  const handleCancel = () => {
    setIsModalOpen(false)
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
        src={theme === Theme.DARK ? loginDarkImg : loginLightImg}
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
              src={logoLight}
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
          </Form>
        </motion.div>
      </ConfigProvider>

      <Modal
        title={t('AUTH:forgot_password')}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={state ? t('COMMON:next') : t('COMMON:confirm')}
        cancelText={t('COMMON:cancel')}
      >
        {state ? (
          <div className="flex items-center justify-center">
            <div className="min-[375px]:w-[200px] md:w-[250px]">
              <span className="pl-2">{t('AUTH:account')}</span>
              <Input
                placeholder={t('VALIDATION:enter_account')}
                prefix={<UserOutlined />}
                onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setAccount(e.target.value)}
              />
            </div>
          </div>
        ) : (
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
            <Form
              form={forgetPasswordForm}
              onFinish={forgetPasswordMutation}
              layout="vertical"
              className="flex flex-col items-center"
            >
              <Tooltip title={forgetPasswordForm.getFieldValue('email')}>
                <Form.Item
                  className="min-[375px]:w-[200px] md:w-[250px]"
                  label={t('AUTH:email')}
                  name="email"
                  rules={[{ required: true, message: t('VALIDATION:email_not_filled') }]}
                >
                  <Input
                    disabled
                    prefix={<MailOutlined />}
                    suffix={
                      <Button
                        ref={sendEmail}
                        disabled={sendVerificationCode != t('COMMON:send')}
                        onClick={() => sendResetPasswordEmailMutate(account)}
                      >
                        {sendVerificationCode}
                      </Button>
                    }
                  />
                </Form.Item>
              </Tooltip>

              <Form.Item
                label={t('AUTH:code')}
                name="code"
                className="min-[375px]:w-[200px] md:w-[250px]"
                rules={[{ required: true, message: t('VALIDATION:enter_verification_code') }]}
              >
                <Input
                  prefix={<VerifiedOutlined />}
                  placeholder={t('VALIDATION:verification_code_not_filled')}
                />
              </Form.Item>

              <Form.Item
                className="min-[375px]:w-[200px] md:w-[250px]"
                label={t('AUTH:new_password')}
                name="password"
                hasFeedback
                rules={[{ required: true, message: t('VALIDATION:password_not_filled') }]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder={t('VALIDATION:enter_new_password')}
                />
              </Form.Item>

              <Form.Item
                className="min-[375px]:w-[200px] md:w-[250px]"
                label={t('AUTH:confirm_password')}
                name="confirmPassword"
                dependencies={['password']}
                hasFeedback
                rules={[{ required: true, message: t('VALIDATION:password_not_filled') }, confirmPasswordRule]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder={t('AUTH:reenter_password')}
                />
              </Form.Item>
            </Form>
          </ConfigProvider>
        )}
      </Modal>
    </div>
  )
}
