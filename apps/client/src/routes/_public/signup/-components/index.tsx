import { loginDarkImg, loginLightImg, logoLightImg } from '@/assets/images'
import { signupMutation, SignupValue } from '@/features/auth'
import { APP_NAME } from '@/shared/constants/app'
import { Theme } from '@/shared/enums'
import { useThemeStore } from '@/shared/store'
import { confirmPasswordRule } from '@/shared/utils/confirmPasswordRule'
import { EditOutlined, LockOutlined, UserOutlined, VerifiedOutlined } from '@ant-design/icons'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import './index.scss'

export default function Signup() {
  const { t } = useTranslation(['AUTH', 'COMMON', 'VALIDATION', 'PROMPT'])
  const { theme } = useThemeStore()
  const { mutate } = signupMutation()
  const [form] = Form.useForm<SignupValue>()
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
            className="signin translation relative flex flex-col items-center justify-center rounded-2xl px-14 py-5 shadow-lg backdrop-blur"
            layout="vertical"
            form={form}
            onFinish={mutate}
          >
            <img
              src={logoLightImg}
              className="mb-2 w-[200px]"
            ></img>
            <div className="mb-2">
              {t('COMMON:welcome_to_join')} {APP_NAME} {t('COMMON:platform')} 👋
            </div>

            <div className="mb-2 text-xl">{t('AUTH:register')}</div>

            <Form.Item<SignupValue>
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

            <Form.Item<SignupValue>
              className="min-[375px]:w-[200px] md:w-[250px]"
              label={t('AUTH:password')}
              name="password"
              hasFeedback
              rules={[{ required: true, message: t('VALIDATION:password_not_filled') }]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder={t('VALIDATION:enter_password')}
              />
            </Form.Item>

            <Form.Item<SignupValue>
              className="min-[375px]:w-[200px] md:w-[250px]"
              label={t('AUTH:confirm_password')}
              name="confirmPassword"
              dependencies={['password']}
              hasFeedback
              rules={[
                { required: true, message: t('VALIDATION:password_not_filled') },
                confirmPasswordRule
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder={t('AUTH:reenter_password')}
              />
            </Form.Item>

            <Form.Item<SignupValue>
              className="min-[375px]:w-[200px] md:w-[250px]"
              label={t('AUTH:username')}
              name="username"
              rules={[{ required: true, message: t('VALIDATION:username_not_filled') }]}
            >
              <Input
                prefix={<EditOutlined />}
                placeholder={t('VALIDATION:enter_username')}
              />
            </Form.Item>

            <Form.Item<SignupValue>
              className="min-[375px]:w-[200px] md:w-[250px]"
              label={t('AUTH:email')}
              name="email"
            >
              <EmailInput form={form} />
            </Form.Item>

            <Form.Item<SignupValue>
              className="min-[375px]:w-[200px] md:w-[250px]"
              label={t('AUTH:code')}
              name="code"
            >
              <Input
                prefix={<VerifiedOutlined />}
                placeholder={t('VALIDATION:enter_verification_code')}
              />
            </Form.Item>

            <Form.Item>
              <span>
                {t('AUTH:already_have_account')}
                <Link
                  to="/signin"
                  className="hover:text-blue-200"
                >
                  {t('login_now')}
                </Link>
              </span>
            </Form.Item>

            <Form.Item>
              <Button
                htmlType="submit"
                className="min-[375px]:w-[200px] md:w-[250px]"
              >
                {t('AUTH:register')}
              </Button>
            </Form.Item>
          </Form>
        </motion.div>
      </ConfigProvider>
    </div>
  )
}
