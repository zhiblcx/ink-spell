import ThemeToggle from '@/shared/components/ThemeToggle'

function Header() {
  return (
    <div className="dark:bg-gray-800 flex justify-between items-center py-4 px-5 ">
      Header
      <ThemeToggle />
    </div>
  )
}

export default Header
