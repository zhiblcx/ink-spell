import loginDarkImg from '@/assets/images/login-dark.png'
import loginLightImg from '@/assets/images/login-light.png'
import logoLight from '@/assets/images/logo-light.png'
import { signinMutation } from '@/features/auth'
import { Theme } from '@/shared/enums'
import { useThemeStore } from '@/shared/store'
import { AuthUtils } from '@/shared/utils'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Link } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import './index.scss'

type SigninType = {
  account: string
  password: string
  remember: boolean
}

export default function Signin() {
  const { theme } = useThemeStore()
  const [form] = Form.useForm()
  const { mutate } = signinMutation()

  useEffect(() => {
    const rememberAccountData = JSON.parse(AuthUtils.getRememberAccountData() ?? '')
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
            <div className="mb-2">欢迎来到 ink-spell 🎉</div>

            <div className="mb-2 text-xl">登录</div>

            <Form.Item<SigninType>
              className="min-[375px]:w-[200px] md:w-[250px]"
              label="账号"
              name="account"
              rules={[{ required: true, message: '账号未填写' }]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="请输入你的账号"
              />
            </Form.Item>

            <Form.Item<SigninType>
              className="min-[375px]:w-[200px] md:w-[250px]"
              label="密码"
              name="password"
              rules={[{ required: true, message: '密码未填写' }]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="请输入你的密码"
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
                  <Checkbox>记住密码</Checkbox>
                </Form.Item>
                <Form.Item>
                  <span>
                    没有账号，
                    <Link
                      to="/signup"
                      className="hover:text-blue-200"
                    >
                      立即注册
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
                登录
              </Button>
            </Form.Item>
          </Form>
        </motion.div>
      </ConfigProvider>
    </div>
  )
}
