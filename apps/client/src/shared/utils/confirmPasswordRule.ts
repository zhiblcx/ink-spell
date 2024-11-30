import { FormRule } from 'antd'

const { t } = useTranslation(['VALIDATION'])

export const confirmPasswordRule: FormRule = ({ getFieldValue }) => ({
  validator(_, value) {
    if (!value || getFieldValue('password') === value) {
      return Promise.resolve()
    }
    return Promise.reject(new Error(t("VALIDATION:password_mismatch")))
  }
})

export const newConfirmPasswordRule: FormRule = ({ getFieldValue }) => ({
  validator(_, value) {
    if (!value || getFieldValue('newPassword') === value) {
      return Promise.resolve()
    }
    return Promise.reject(new Error(t("VALIDATION:password_mismatch")))
  }
})
