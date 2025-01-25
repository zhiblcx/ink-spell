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
        algorithm: themeStore === ThemeEnum.DARK ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          colorPrimary: themeStore === ThemeEnum.DARK ? '#4b4b4b' : '#4c5155'
        }
      }}
      locale={language === LanguageEnum.Chinese ? Chinese : English}
    >
      <HappyProvider>{children}</HappyProvider>
    </ConfigProvider>
  )
}
