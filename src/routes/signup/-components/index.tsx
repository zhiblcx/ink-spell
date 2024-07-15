import { Button, Form, Input, ConfigProvider } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Link } from '@tanstack/react-router'
import logoLight from '@/assets/images/logo_light.png'
import { motion } from 'framer-motion'

import loginLightImg from '@/assets/images/login-light.png'
import loginDarkImg from '@/assets/images/login-dark.png'
import { useThemeStore } from '@/shared/store'
import { Theme } from '@/shared/enums'
import './index.scss'

type SignupType = {
  username: string
  password: string
  confirmPassword: string
  email: string
}

export default function Signup() {
  const { theme } = useThemeStore()
  return (
    <div className="relative overflow-hidden w-screen h-screen items-center flex justify-center">
      <img
        className="absolute object-center object-cover w-full h-full"
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
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          <Form
            className="signin_translation backdrop-blur relative  flex flex-col justify-center items-center px-14 py-5 rounded-2xl shadow-lg"
            layout="vertical"
          >
            <img
              src={logoLight}
              className="w-[200px] mb-2"
            ></img>
            <div className="mb-2">欢迎加入 ink-spell 平台👋</div>

            <div className="text-xl mb-2">注册</div>

            <Form.Item<SignupType>
              className="min-[375px]:w-[200px] md:w-[250px]"
              label="用户名"
              name="username"
              rules={[{ required: true, message: '用户名未填写' }]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="请输入你的用户名"
              />
            </Form.Item>

            <Form.Item<SignupType>
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

            <Form.Item<SignupType>
              className="min-[375px]:w-[200px] md:w-[250px]"
              label="密码"
              name="confirmPassword"
              rules={[{ required: true, message: '密码未填写' }]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="请输入你的密码"
              />
            </Form.Item>

            <Form.Item<SignupType>
              className="min-[375px]:w-[200px] md:w-[250px]"
              label="邮箱"
              name="email"
              rules={[{ message: '邮箱填写错误' }]}
            >
              <Input
                type="email"
                prefix={<LockOutlined />}
                placeholder="请输入你的邮箱"
              />
            </Form.Item>

            <Form.Item>
              <span>
                已有账号，
                <Link to="/signin">立即登录</Link>
              </span>
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
