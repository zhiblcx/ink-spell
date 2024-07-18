import clsx from 'clsx'
import { Checkbox } from 'antd'

import { type Ink } from '@/shared/types'
import { useActionBook } from '@/shared/store'
import './index.scss'

interface InkCardProps {
  ink: Ink
  customClassName?: string
  onClick: () => void
}

export default function InkCard({ ink, customClassName, onClick }: InkCardProps) {
  function getImageUrl(name: string) {
    return new URL(`../../../assets/images/${name}`, import.meta.url).href
  }

  const { cancelFlag } = useActionBook()

  return (
    <div
      className={clsx(
        customClassName,
        'dark:bg-gray-800 bg-gray-200 card md:w-[180px] min-[375px]:w-[130px] h-[250px] shadow-lg rounded-2xl relative overflow-hidden flex flex-col items-center relative'
      )}
    >
      <Checkbox
        onClick={onClick}
        className={clsx('absolute right-3 top-2', cancelFlag ? 'checkbox' : 'z-50 visible')}
        checked={ink.checked}
      />
      <div className="photo w-[100%] h-[100%] overflow-hidden">
        <img
          src={getImageUrl(ink.ink_img)}
          className="object-cover w-[100%] h-[100%]"
        />
      </div>
      <p className="absolute text-xl bottom-3 w-[90%] text-center truncate ink-name roboto text-white">
        {ink.ink_name ? `${ink.ink_name}` : ''}
      </p>
      <p className="roboto mt-[130px] text-sm">
        {ink.protagonist
          ? `
      ${ink.protagonist[0]}|${ink.protagonist[1]}`
          : '未知'}
      </p>
      <p className="w-[80%] border-2 border-b-zinc-300"></p>
      <p className="roboto w-[80%] mt-2 text-sm overflow-hidden line-clamp-4">
        {ink.detail === undefined ? '' : ink.detail}
      </p>
    </div>
  )
}
