import { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities'
import { Link } from '@tanstack/react-router'
import clsx from 'clsx'
import { LucideProps } from 'lucide-react'

interface NavigationProps {
  value: string
  label?: string
  Icon?: React.ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>>
  Move?: React.ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>>
  move?: SyntheticListenerMap | undefined
}

function Navigation(props: NavigationProps) {
  const { Icon, value, label, Move = false, move } = props

  return (
    <Link
      disabled={true}
      to={label}
    >
      {({ isActive }) => {
        return (
          <div
            className={clsx(
              isActive ? 'bg-[#4b4b4b] text-white dark:bg-[#474c50]' : '',
              'relative flex cursor-pointer items-center rounded-xl px-2 py-2 hover:bg-[#4b4b4b] hover:text-white dark:hover:bg-[#474c50]'
            )}
          >
            {Icon && <Icon className="absolute mx-[3px]" />}
            <div className="relative left-9">{value}</div>
            {Move && (
              <Move
                onMouseUp={() => {
                  console.log('鼠标松开')
                }}
                onMouseDown={() => {
                  console.log('鼠标按下')
                }}
                onTouchStart={() => {
                  console.log('触摸开始')
                }}
                onTouchEnd={() => {
                  console.log('触摸结束')
                }}
                className="absolute left-[160px] cursor-move"
                {...move}
              />
            )}
          </div>
        )
      }}
    </Link>
  )
}

export default Navigation
