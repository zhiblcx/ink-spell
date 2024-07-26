import { EditOutlined, LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons'
import { Link } from '@tanstack/react-router'
import { motion } from 'framer-motion'

import loginDarkImg from '@/assets/images/login-dark.png'
import loginLightImg from '@/assets/images/login-light.png'
import logoLight from '@/assets/images/logo-light.png'
import { Theme } from '@/shared/enums'
import { useThemeStore } from '@/shared/store'
import { confirmPasswordRule } from '@/shared/utils/confirmPasswordRule'
import './index.scss'

type SignupType = {
  account: string
  password: string
  confirmPassword: string
  username?: string
  email: string
}

export default function Signup() {
  const { theme } = useThemeStore()
  return (
    <div className="relative flex h-screen w-screen items-center justify-center overflow-hidden">
      <img
        className="absolute h-full w-full object-cover object-center"
        src={theme === Theme.DARK ? loginDarkImg : loginLightImg}
        alt=""
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
          >
            <img
              src={logoLight}
              className="mb-2 w-[200px]"
            ></img>
            <div className="mb-2">欢迎加入 ink-spell 平台👋</div>

            <div className="mb-2 text-xl">注册</div>

            <Form.Item<SignupType>
              className="min-[375px]:w-[200px] md:w-[250px]"
              label="账号"
              name="username"
              rules={[{ required: true, message: '账号未填写' }]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="请输入你的账号"
              />
            </Form.Item>

            <Form.Item<SignupType>
              className="min-[375px]:w-[200px] md:w-[250px]"
              label="密码"
              name="password"
              hasFeedback
              rules={[{ required: true, message: '密码未填写' }]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="请输入你的密码"
              />
            </Form.Item>

            <Form.Item<SignupType>
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

            <Form.Item<SignupType>
              className="min-[375px]:w-[200px] md:w-[250px]"
              label="用户名"
              rules={[{ message: '用户名填写错误' }]}
            >
              <Input
                type="account"
                prefix={<EditOutlined />}
                placeholder="请输入你的用户名"
              />
            </Form.Item>

            <Form.Item<SignupType>
              className="min-[375px]:w-[200px] md:w-[250px]"
              label="邮箱"
              name="email"
            >
              <Input
                type="email"
                prefix={<MailOutlined />}
                placeholder="请输入你的邮箱"
              />
            </Form.Item>

            <Form.Item>
              <span>
                已有账号，
                <Link
                  to="/signin"
                  className="hover:text-blue-200"
                >
                  立即登录
                </Link>
              </span>
            </Form.Item>

            <Form.Item>
              <Button
                htmlType="submit"
                className="min-[375px]:w-[200px] md:w-[250px]"
              >
                注册
              </Button>
            </Form.Item>
          </Form>
        </motion.div>
      </ConfigProvider>
    </div>
  )
}
