import { LanguageEnums, Theme } from '@/shared/enums'
import { useLanguageStore } from '@/shared/store'
import { useThemeStore } from '@/shared/store/ThemeStore'
import { HappyProvider } from '@ant-design/happy-work-theme'
import { ConfigProvider, theme } from 'antd'
import English from 'antd/locale/en_US'
import Chinese from 'antd/locale/zh_CN'
import { PropsWithChildren } from 'react'

export default function AntdProvider(props: PropsWithChildren) {
  const { children } = props
  const { theme: themeStore } = useThemeStore()
  const { language } = useLanguageStore()
  return (
    <ConfigProvider
      theme={{
        algorithm: themeStore === Theme.DARK ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          colorPrimary: themeStore === Theme.DARK ? '#4b4b4b' : '#4c5155'
        }
      }}
      locale={language === LanguageEnums.Chinese ? Chinese : English}
    >
      <HappyProvider>{children}</HappyProvider>
    </ConfigProvider>
  )
}
