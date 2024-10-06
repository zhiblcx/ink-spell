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

import './index.scss'

type SigninType = {
  account: string
  password: string
  remember: boolean
}

export default function Signin() {
  const { theme } = useThemeStore()
  const [form] = Form.useForm()
  const [forgetPasswordForm] = Form.useForm()
  const { mutate } = signinMutation()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [sendVerificationCode, setSendVerificationCode] = useState('发送')
  const sendEmail = useRef(null)
  const { mutate: forgetPasswordMutation } = forgetPasswordByEmailMutation(() => setIsModalOpen(false))
  const { mutate: sendResetPasswordEmailMutate } = sendResetPasswordEmailMutation((email) => {
    let countdown = 60
    setSendVerificationCode('60秒后重试') // 初始状态
    const timer = setInterval(() => {
      countdown--
      if (countdown >= 0) {
        setSendVerificationCode(countdown + '秒后重试')
      } else {
        clearInterval(timer)
        setSendVerificationCode('发送')
      }
    }, 1000)
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
            <Form.Item>
              <span
                className="cursor-pointer hover:text-blue-200"
                onClick={showModal}
              >
                忘记密码
              </span>
            </Form.Item>
          </Form>
        </motion.div>
      </ConfigProvider>

      <Modal
        title="忘记密码"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={state ? '下一步' : '确定'}
        cancelText="取消"
      >
        {state ? (
          <div className="flex items-center justify-center">
            <div className="min-[375px]:w-[200px] md:w-[250px]">
              <span className="pl-2">账号</span>
              <Input
                placeholder="请输入你的账号"
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
                  label="邮箱"
                  name="email"
                  rules={[{ required: true, message: '邮箱未填写' }]}
                >
                  <Input
                    disabled
                    prefix={<MailOutlined />}
                    suffix={
                      <Button
                        ref={sendEmail}
                        disabled={sendVerificationCode != '发送'}
                        onClick={() => sendResetPasswordEmailMutate(form.getFieldValue('email'))}
                      >
                        {sendVerificationCode}
                      </Button>
                    }
                  />
                </Form.Item>
              </Tooltip>

              <Form.Item
                label="验证码"
                name="code"
                className="min-[375px]:w-[200px] md:w-[250px]"
                rules={[{ required: true, message: '验证码未填写' }]}
              >
                <Input
                  prefix={<VerifiedOutlined />}
                  placeholder="请输入验证码"
                />
              </Form.Item>

              <Form.Item
                className="min-[375px]:w-[200px] md:w-[250px]"
                label="新密码"
                name="password"
                hasFeedback
                rules={[{ required: true, message: '密码未填写' }]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="请输入你的新密码"
                />
              </Form.Item>

              <Form.Item
                className="min-[375px]:w-[200px] md:w-[250px]"
                label="确认密码"
                name="confirmPassword"
                dependencies={['password']}
                hasFeedback
                rules={[{ required: true, message: '密码未填写' }, confirmPasswordRule]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="请再输入一次密码"
                />
              </Form.Item>
            </Form>
          </ConfigProvider>
        )}
      </Modal>
    </div>
  )
}
