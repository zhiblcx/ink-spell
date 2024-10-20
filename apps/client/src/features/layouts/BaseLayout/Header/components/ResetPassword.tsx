import { updatePasswordDao } from '@/features/user'
import { newConfirmPasswordRule } from '@/shared/utils/confirmPasswordRule'
import { LockOutlined } from '@ant-design/icons'
import { UseMutateFunction } from '@tanstack/react-query'
import { FormInstance } from 'antd'
import { AxiosError, AxiosResponse } from 'axios'
import { useTranslation } from 'react-i18next'

interface ResetPasswordType {
  form: FormInstance<any>
  openFlag: boolean
  setOpenFlag: React.Dispatch<React.SetStateAction<boolean>>
  mutate: UseMutateFunction<AxiosResponse<any, any>, AxiosError<unknown, any>, updatePasswordDao, unknown>
}

export function ResetPassword({ form, openFlag, setOpenFlag, mutate }: ResetPasswordType) {
  const { t } = useTranslation(['AUTH', 'COMMON', 'VALIDATION', 'PROMPT'])
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
      title={t('AUTH:reset_password')}
      open={openFlag}
      okText={t('COMMON:save')}
      cancelText={t('COMMON:cancel')}
    >
      <Form
        className="flex flex-col justify-center p-5 px-8"
        layout="vertical"
        form={form}
        onFinish={mutate}
      >
        <Form.Item
          className="min-[375px]:w-[200px] md:w-[250px]"
          label={t('AUTH:old_password')}
          name="password"
          rules={[{ required: true, message: t('VALIDATION:password_not_filled') }]}
        >
          <Input.Password placeholder={t('VALIDATION:enter_old_password')} />
        </Form.Item>

        <Form.Item
          className="min-[375px]:w-[200px] md:w-[250px]"
          label={t('AUTH:new_password')}
          name="newPassword"
          hasFeedback
          rules={[{ required: true, message: t('VALIDATION:password_not_filled') }]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder={t('VALIDATION:enter_password')}
          />
        </Form.Item>

        <Form.Item
          className="min-[375px]:w-[200px] md:w-[250px]"
          label={t('AUTH:confirm_password')}
          name="confirmPassword"
          dependencies={['password']}
          hasFeedback
          rules={[{ required: true, message: t('VALIDATION:password_not_filled') }, newConfirmPasswordRule]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder={t('VALIDATION:enter_password')}
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}
