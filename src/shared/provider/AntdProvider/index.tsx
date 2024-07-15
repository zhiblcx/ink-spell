import { PropsWithChildren } from 'react'
import { ConfigProvider, theme } from 'antd'
import { useThemeStore } from '@/shared/store/ThemeStore'
import { Theme } from '@/shared/enums'

export default function AntdProvider(props: PropsWithChildren) {
  const { children } = props
  const { theme: themeStore } = useThemeStore()
  return (
    <ConfigProvider
      theme={{
        algorithm: themeStore === Theme.DARK ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          colorPrimary: themeStore === Theme.DARK ? '#4b4b4b' : '#4c5155'
        }
      }}
    >
      {children}
    </ConfigProvider>
  )
}
