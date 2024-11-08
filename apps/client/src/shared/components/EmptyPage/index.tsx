import GoastSvg from '@/assets/SVG/GoastSvg'
import { useThemeStore } from '@/shared/store'

interface EmptyPageType {
  name: string
  description?: string
}

export function EmptyPage(props: EmptyPageType) {
  const { name, description = '' } = props
  const { theme } = useThemeStore()
  return (
    <Result
      title={name}
      subTitle={description}
      icon={
        <div className="flex justify-center">
          <GoastSvg color={theme === ThemeEnum.DARK ? '#1f1f1f' : '#fff'} />
        </div>
      }
    />
  )
}
