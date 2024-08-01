import BookDirectory from '@/shared/components/BookDirectory'
import { useActionBookStore } from '@/shared/store'
import { AnimatePresence } from 'framer-motion'

interface SidebarActiveType {
  currentChapter: number
  allChapter: Array<string>
}

function Sidebar({ currentChapter, allChapter = [] }: SidebarActiveType) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [open, setOpen] = useState(false)
  const { showDirectoryFlag } = useActionBookStore()

  const onClose = () => {
    setOpen(false)
  }

  useEffect(() => {
    if (showDirectoryFlag) {
      setOpen(true)
    }
  }, [showDirectoryFlag])

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <AnimatePresence initial={false}>
      {windowWidth > 375 ? (
        <>
          {showDirectoryFlag ? (
            <BookDirectory
              currentChapter={currentChapter}
              allChapter={allChapter}
            />
          ) : (
            ''
          )}
        </>
      ) : showDirectoryFlag ? (
        <Drawer
          className="scroll dark:text-[#929493]"
          title={<div className="text-center text-xl">目录</div>}
          onClose={onClose}
          open={open}
          placement="left"
          width="248px"
          closeIcon={false}
          styles={{ body: { padding: '15px' } }}
        >
          <BookDirectory
            currentChapter={currentChapter}
            allChapter={allChapter}
            showDirectoryFlag={false}
          />
        </Drawer>
      ) : (
        ''
      )}
    </AnimatePresence>
  )
}

export default Sidebar
