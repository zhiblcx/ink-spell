import { SetUp } from '@/shared/types'
import { BookMarked, BookText } from 'lucide-react'

interface DirectoryButtonsType {
  catalog: boolean
  setup: SetUp
  setCatalog: React.Dispatch<React.SetStateAction<boolean>>
  setSetUp: (setup: SetUp) => void
}

export const DirectoryButtons = ({
  catalog,
  setup,
  setCatalog,
  setSetUp
}: DirectoryButtonsType) => {
  const handleCatalogClick = () => {
    setSetUp({ ...setup, directoryMode: DirectoryModeEnum.CATALOG })
    setCatalog(true)
  }

  const handleBookMarkClick = () => {
    setSetUp({ ...setup, directoryMode: DirectoryModeEnum.BOOK_MARK })
    setCatalog(false)
  }

  return (
    <div className="mt-2 flex justify-center space-x-10">
      <BookText
        size={30}
        color={catalog ? '#1296db' : undefined}
        onClick={handleCatalogClick}
      />
      <BookMarked
        size={30}
        onClick={handleBookMarkClick}
        color={!catalog ? '#1296db' : undefined}
      />
    </div>
  )
}
