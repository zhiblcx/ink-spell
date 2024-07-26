import { FormRule } from 'antd'

export const confirmPasswordRule: FormRule = ({ getFieldValue }) => ({
  validator(_, value) {
    if (!value || getFieldValue('password') === value) {
      return Promise.resolve()
    }
    return Promise.reject(new Error('两次密码不一致'))
  }
})
