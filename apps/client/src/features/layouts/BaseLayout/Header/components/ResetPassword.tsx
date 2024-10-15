import { updatePasswordDao } from '@/features/user'
import { newConfirmPasswordRule } from '@/shared/utils/confirmPasswordRule'
import { LockOutlined } from '@ant-design/icons'
import { UseMutateFunction } from '@tanstack/react-query'
import { FormInstance } from 'antd'
import { AxiosError, AxiosResponse } from 'axios'

interface ResetPasswordType {
  form: FormInstance<any>
  openFlag: boolean
  setOpenFlag: React.Dispatch<React.SetStateAction<boolean>>
  mutate: UseMutateFunction<AxiosResponse<any, any>, AxiosError<unknown, any>, updatePasswordDao, unknown>
}

export function ResetPassword({ form, openFlag, setOpenFlag, mutate }: ResetPasswordType) {
  return (
    <Modal
      maskClosable
      onCancel={() => {
        setOpenFlag(false)
      }}
      onOk={() => {
        form.submit()
        setOpenFlag(false)
      }}
      title="重置密码"
      open={openFlag}
      okText="保存"
      cancelText="取消"
    >
      <Form
        className="flex flex-col justify-center p-5 px-8"
        layout="vertical"
        form={form}
        onFinish={mutate}
      >
        <Form.Item
          className="min-[375px]:w-[200px] md:w-[250px]"
          label="旧密码"
          name="password"
          rules={[{ required: true, message: '密码未填写' }]}
        >
          <Input.Password placeholder="请输入你的密码" />
        </Form.Item>

        <Form.Item
          className="min-[375px]:w-[200px] md:w-[250px]"
          label="新密码"
          name="newPassword"
          hasFeedback
          rules={[{ required: true, message: '密码未填写' }]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="请输入你的确认密码"
          />
        </Form.Item>

        <Form.Item
          className="min-[375px]:w-[200px] md:w-[250px]"
          label="确认密码"
          name="confirmPassword"
          dependencies={['password']}
          hasFeedback
          rules={[{ required: true, message: '密码未填写' }, newConfirmPasswordRule]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="请再输入一次密码"
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}
