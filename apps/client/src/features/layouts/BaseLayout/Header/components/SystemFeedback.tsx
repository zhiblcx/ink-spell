import { Feedback } from '@/assets/SVG/Feedback'
import { postFeedbackMutation } from '@/features/system/mutation'
import { APP_NAME } from '@/shared/constants/app'
import { message } from 'antd'
import { Dispatch, SetStateAction } from 'react'

interface SystemFeedbackProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

export function SystemFeedback({ open, setOpen }: SystemFeedbackProps) {
  const [value, setValue] = useState<string>('')
  const { t } = useTranslation(['COMMON', 'PROMPT', 'VALIDATION'])
  const { mutate: postFeedbackMutate } = postFeedbackMutation()

  function handleOk() {
    if (value.trim() === '') {
      message.warning(t('VALIDATION:fill_in_completely'))
    } else {
      setOpen(false)
      postFeedbackMutate({ text: value })
      setValue('')
    }
  }

  function handleCancel() {
    setOpen(false)
  }
  return (
    <Modal
      title={t('COMMON:system_feedback')}
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
      className="text-center"
    >
      <>
        <div>{t('PROMPT:do_you_have_suggestions_for', { APP_NAME: APP_NAME })}</div>
        <div>
          <div className="flex justify-center">
            <Feedback />
          </div>
          <div className="flex">
            <span className="min-w-fit">{t('COMMON:system_feedback')}：</span>
            <Input
              value={value}
              onChange={(value) => setValue(value.target.value)}
            />
          </div>
        </div>
      </>
    </Modal>
  )
}
