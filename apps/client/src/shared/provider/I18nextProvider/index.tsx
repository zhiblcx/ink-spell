import i18next from '@/shared/i18n/config'
import { PropsWithChildren } from 'react'
import { I18nextProvider } from 'react-i18next'

export default function I18NextProvider(props: PropsWithChildren) {
  const { children } = props
  return <I18nextProvider i18n={i18next}>{children}</I18nextProvider>
}
