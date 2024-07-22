import clsx from 'clsx'
import { Link } from '@tanstack/react-router'
import { LucideProps } from 'lucide-react'

interface NavigationProps {
  value: string
  label?: string
  Icon?: React.ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>>
}

function Navigation(props: NavigationProps) {
  const { Icon, value, label } = props

  return (
    <Link to={label}>
      {({ isActive }) => {
        return (
          <div
            className={clsx(
              isActive ? 'bg-[#4b4b4b] text-white dark:bg-[#474c50] ' : '',
              'dark:hover:bg-[#474c50] relative flex items-center cursor-pointer hover:bg-[#4b4b4b] hover:text-white rounded-xl px-2 py-2'
            )}
          >
            {Icon && <Icon className="absolute mx-[3px]" />}
            <div className="relative left-9">{value}</div>
          </div>
        )
      }}
    </Link>
  )
}

export default Navigation
