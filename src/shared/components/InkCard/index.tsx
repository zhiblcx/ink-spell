import './index.scss'
import { type Ink } from '@/shared/types'
import clsx from 'clsx'

interface InkCardProps {
  ink: Ink
  customClassName?: string
}

export default function InkCard({ ink, customClassName }: InkCardProps) {
  function getImageUrl(name: string) {
    return new URL(`../../../assets/images/${name}`, import.meta.url).href
  }

  return (
    <div
      className={clsx(
        customClassName,
        'card w-[180px] h-[250px] shadow-xl bg-slate-300 rounded-2xl relative overflow-hidden flex flex-col items-center'
      )}
    >
      <div className="photo w-[100%] h-[100%] overflow-hidden">
        <img
          src={getImageUrl(ink.ink_img)}
          alt=""
          className="object-cover w-[100%] h-[100%]"
        />
      </div>
      <p className="absolute text-xl bottom-3 w-[90%] text-center truncate ink-name roboto text-white">
        {ink.ink_name}
      </p>
      <p className="roboto mt-[130px] text-sm">秦究|游惑</p>
      <p className="w-[80%] border-2 border-b-zinc-300"></p>
      <p className="roboto w-[80%] mt-2 text-sm overflow-hidden line-clamp-4">
        全球大型高危险性统一考试,简称全球高考。真身刷题,及格活命。考制一月一改革,偶尔随机。
      </p>
    </div>
  )
}
