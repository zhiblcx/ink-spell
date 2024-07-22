import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Link, useNavigate } from '@tanstack/react-router'
import { motion } from 'framer-motion'

import loginDarkImg from '@/assets/images/login-dark.png'
import loginLightImg from '@/assets/images/login-light.png'
import logoLight from '@/assets/images/logo-light.png'
import { Theme } from '@/shared/enums'
import { useThemeStore } from '@/shared/store'
import './index.scss'

type SigninType = {
  username: string
  password: string
  remember: boolean
}

export default function Signin() {
  const { theme } = useThemeStore()
  const navigate = useNavigate()
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
            className="signin_translation relative flex flex-col items-center justify-center rounded-2xl px-14 py-5 shadow-lg backdrop-blur"
            layout="vertical"
            onFinish={() => {
              navigate({ to: '/', replace: true })
            }}
          >
            <img
              src={logoLight}
              className="mb-2 w-[200px]"
            ></img>
            <div className="mb-2">欢迎来到 ink-spell 🎉</div>

            <div className="mb-2 text-xl">登录</div>

            <Form.Item<SigninType>
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
                    <Link to="/signup">立即注册</Link>
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
