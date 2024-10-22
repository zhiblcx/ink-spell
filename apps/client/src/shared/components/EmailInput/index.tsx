import { SignupValue } from '@/features/auth'
import { sendRegisterEmailMutation } from '@/features/user'
import startCountdown from '@/shared/utils/startCountdown'
import { MailOutlined } from '@ant-design/icons'
import { FormInstance, message } from 'antd'
import { useTranslation } from 'react-i18next'

export default function EmailInput({ form, email }: { form: FormInstance<SignupValue>; email?: string }) {
  const { t } = useTranslation(['COMMON', 'PROMPT', 'VALIDATION'])
  const [sendVerificationCode, setSendVerificationCode] = useState(t('COMMON:send'))
  const { mutate: emailMutate } = sendRegisterEmailMutation()

  return (
    <Input
      type="email"
      defaultValue={email}
      prefix={<MailOutlined />}
      onChange={(e) => form.setFieldValue('email', e.target.value)}
      suffix={
        <Button
          disabled={sendVerificationCode != t('COMMON:send')}
          onClick={() => {
            let countdown = 60
            const email = form.getFieldValue('email')
            if (email != undefined && email != '') {
              const regex = /[1-9][0-9]{4,}@qq.com/
              if (regex.test(email)) {
                setSendVerificationCode(t('PROMPT:retry_in_seconds', { seconds: countdown })) // 初始状态
                emailMutate(email)
                startCountdown(countdown, setSendVerificationCode)
              } else {
                message.error(t('VALIDATION:enter_valid_email'))
              }
            } else {
              message.error(t('PROMPT:no_email_entered'))
            }
          }}
        >
          {sendVerificationCode}
        </Button>
      }
      placeholder={t('VALIDATION:enter_email')}
    />
  )
}
