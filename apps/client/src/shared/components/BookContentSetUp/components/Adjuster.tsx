import { LucideProps, Minus, Plus } from 'lucide-react'
interface AdjusterProps {
  label: string
  value: number
  size?: number
  onIncrement?: () => void
  onDecrement?: () => void
  IconDown?: React.ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>>
  IconUp?: React.ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>>
}

// 通用的调整器组件
export default function Adjuster({ label, value, size, IconDown, IconUp, onIncrement, onDecrement }: AdjusterProps) {
  const defaultSize = size || 34
  const DefaultIconDown = IconDown || Minus
  const DefaultIconUp = IconUp || Plus
  return (
    <>
      <p className="mr-4">{label}：</p>
      <div className="flex grow items-center justify-around">
        <DefaultIconDown
          size={defaultSize}
          onClick={onDecrement}
        />
        <p>{value}</p>
        <DefaultIconUp
          size={defaultSize}
          onClick={onIncrement}
        />
      </div>
    </>
  )
}
