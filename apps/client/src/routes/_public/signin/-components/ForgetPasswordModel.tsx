import { forgetPasswordByEmailMutation, sendResetPasswordEmailMutation } from '@/features/user'
import { confirmPasswordRule, startCountdown } from '@/shared/utils'
import { LockOutlined, MailOutlined, UserOutlined, VerifiedOutlined } from '@ant-design/icons'
import { Dispatch, SetStateAction } from 'react'

interface ForgetPasswordModelProps {
  modalOpen: boolean
  setModalOpen: Dispatch<SetStateAction<boolean>>
  state: boolean
  setState: Dispatch<SetStateAction<boolean>>
}

export default function ForgetPasswordModel({
  modalOpen,
  setModalOpen,
  state,
  setState
}: ForgetPasswordModelProps) {
  const { t } = useTranslation(['AUTH', 'VALIDATION', 'COMMON', 'PROMPT'])
  const [sendVerificationCode, setSendVerificationCode] = useState(t('COMMON:send'))
  const [forgetPasswordForm] = Form.useForm()
  const [account, setAccount] = useState('')
  const sendEmail = useRef(null)

  const { mutate: sendResetPasswordEmailMutate } = sendResetPasswordEmailMutation((email) => {
    let countdown = 60
    setSendVerificationCode(t('PROMPT:retry_in_seconds', { seconds: countdown })) // 初始状态
    startCountdown(countdown, setSendVerificationCode)
    forgetPasswordForm.setFieldValue('email', email)
    setState(false)
  })

  const { mutate: forgetPasswordMutation } = forgetPasswordByEmailMutation(() =>
    setModalOpen(false)
  )

  const handleOk = () => {
    if (state) {
      sendResetPasswordEmailMutate(account)
    } else {
      forgetPasswordForm.submit()
    }
  }

  const handleCancel = () => {
    setModalOpen(false)
  }
  return (
    <Modal
      title={t('AUTH:forgot_password')}
      open={modalOpen}
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
              onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                setAccount(e.target.value)
              }
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
          </Form>
        </ConfigProvider>
      )}
    </Modal>
  )
}
