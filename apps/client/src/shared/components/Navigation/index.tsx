import { Link } from '@tanstack/react-router'
import clsx from 'clsx'
import { LucideProps } from 'lucide-react'

interface NavigationProps {
  value: string
  label?: string
  Icon?: React.ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>>
  Move?: React.ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>>
}

function Navigation(props: NavigationProps) {
  const { Icon, value, label, Move = false } = props

  return (
    <Link to={label}>
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
            {Move && <Move className="absolute left-[160px]" />}
          </div>
        )
      }}
    </Link>
  )
}

export default Navigation
