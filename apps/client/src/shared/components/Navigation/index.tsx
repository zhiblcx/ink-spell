import { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities'
import clsx from 'clsx'
import { LucideProps } from 'lucide-react'

interface NavigationProps {
  value: string
  label?: string
  Icon?: React.ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
  >
  Move?: React.ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
  >
  move?: SyntheticListenerMap | undefined
}

function Navigation(props: NavigationProps) {
  const { Icon, value, label, Move = false, move } = props
  const [moveFlag, setMoveFlag] = useState(false)

  return (
    <Link
      disabled={moveFlag}
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
            <div className="relative left-9 w-[62%] overflow-hidden truncate">
              <Tooltip title={value}>
                <span> {value}</span>
              </Tooltip>
            </div>
            {Move && (
              <Move
                onMouseUp={() => {
                  setMoveFlag(false)
                }}
                onMouseDown={() => {
                  setMoveFlag(true)
                }}
                onTouchStart={() => {
                  setMoveFlag(true)
                }}
                onTouchEnd={() => {
                  setMoveFlag(false)
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
