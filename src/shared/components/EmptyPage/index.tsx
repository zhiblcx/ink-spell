import GoastSvg from '@/assets/SVG/GoastSvg'
import { useThemeStore } from '@/shared/store'
import { Theme } from '@/shared/enums'

interface EmptyPageType {
  name: string
}

function EmptyPage(props: EmptyPageType) {
  const { name } = props
  const { theme } = useThemeStore()
  return (
    <div className="relative overflow-hidden w-full h-full flex items-center justify-center">
      <div className="absolute text-xl top-4 left-4">{name}</div>
      <div className="absolute">
        <GoastSvg color={theme === Theme.DARK ? '#000' : '#fff'} />
      </div>
      <div className="text-white dark:text-black">
        暂时没有书籍，请先导入书籍哦~暂时没有书籍，请先导入书籍哦~暂时没有书籍，请先导入书籍哦~
        暂时没有书籍，请先导入书籍哦~ 暂时没有书籍，请先导入书籍哦~
      </div>
    </div>
  )
}

export default EmptyPage
