import clsx from 'clsx'

import { type Ink } from '@/shared/types'
import './index.scss'

interface InkCardProps {
  ink: Ink
  customClassName?: string
  cancelFlag: boolean
  onClick: () => void
}

export default function InkCard({ ink, customClassName, cancelFlag, onClick }: InkCardProps) {
  function getImageUrl(name: string) {
    return new URL(`../../../assets/images/${name}`, import.meta.url).href
  }

  return (
    <div
      className={clsx(
        customClassName,
        'card relative flex h-[250px] flex-col items-center overflow-hidden rounded-2xl bg-gray-200 shadow-lg dark:bg-gray-800 min-[375px]:w-[130px] md:w-[180px]'
      )}
    >
      <Checkbox
        onClick={onClick}
        className={clsx('absolute right-3 top-2', cancelFlag ? 'checkbox' : 'visible z-50')}
        checked={ink.checked}
      />
      <div className="photo h-[100%] w-[100%] overflow-hidden">
        <img
          src={getImageUrl(ink.ink_img)}
          className="h-[100%] w-[100%] object-cover"
        />
      </div>
      <p className="ink-name roboto absolute bottom-3 w-[90%] truncate text-center text-xl text-white">
        {ink.ink_name ? `${ink.ink_name}` : ''}
      </p>
      <p className="roboto mt-[130px] text-sm">
        {ink.protagonist
          ? `
      ${ink.protagonist[0]}|${ink.protagonist[1]}`
          : '未知'}
      </p>
      <p className="w-[80%] border-2 border-b-zinc-300"></p>
      <p className="roboto mt-2 line-clamp-4 w-[80%] overflow-hidden text-sm">
        {ink.detail === undefined ? '' : ink.detail}
      </p>
    </div>
  )
}
