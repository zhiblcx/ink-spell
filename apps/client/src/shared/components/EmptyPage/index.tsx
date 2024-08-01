import GoastSvg from '@/assets/SVG/GoastSvg'
import { Theme } from '@/shared/enums'
import { useThemeStore } from '@/shared/store'

interface EmptyPageType {
  name: string
}

function EmptyPage(props: EmptyPageType) {
  const { name } = props
  const { theme } = useThemeStore()
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
      <div className="absolute left-4 top-4 text-xl">{name}</div>
      <div className="absolute">
        <GoastSvg color={theme === Theme.DARK ? '#1f1f1f' : '#fff'} />
      </div>
      <div className="select-none text-white dark:text-[#1f1f1f]">
        暂时没有书籍，请先导入书籍哦~暂时没有书籍，请先导入书籍哦~暂时没有书籍，请先导入书籍哦~
        暂时没有书籍，请先导入书籍哦~ 暂时没有书籍，请先导入书籍哦~
      </div>
    </div>
  )
}

export default EmptyPage
