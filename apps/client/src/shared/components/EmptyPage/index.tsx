import { useThemeStore } from '@/shared/store'

interface EmptyPageType {
  name: string
}

function EmptyPage(props: EmptyPageType) {
  const { name } = props
  const { theme } = useThemeStore()
  return (
    <div className="flex justify-start overflow-hidden">
      <div className="my-2 ml-2 text-xl">{name}</div>
    </div>
  )
}

export default EmptyPage
