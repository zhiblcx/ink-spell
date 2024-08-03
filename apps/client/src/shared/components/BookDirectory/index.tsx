import { useActionBookStore } from '@/shared/store'
import { Link, useRouter } from '@tanstack/react-router'
import clsx from 'clsx'
import { motion } from 'framer-motion'
import useSmoothScroll from 'react-smooth-scroll-hook'

interface SidebarActiveType {
  currentChapter: number
  allChapter: Array<string>
  showDirectoryFlag?: boolean
}

export default function BookDirectory({
  currentChapter,
  allChapter = [],
  showDirectoryFlag = true
}: SidebarActiveType) {
  const { updateShowDirectoryFlag, showDirectoryFlag: showLeftDirectoryFlag } = useActionBookStore()
  const router = useRouter()
  const ref = useRef(null)
  const [open, setOpen] = useState(false)

  const { scrollTo } = useSmoothScroll({
    ref,
    speed: 200,
    direction: 'y'
  })

  const onClose = () => {
    updateShowDirectoryFlag(false)
    setOpen(false)
  }

  useEffect(() => {
    if (showLeftDirectoryFlag) {
      setOpen(true)
    }
    if (ref !== null) {
      const chapter = router.latestLocation.search as { chapter: number }
      setTimeout(() => {
        scrollTo(`#y-item-${chapter.chapter}`, -300)
      }, 100)
    }
  }, [router.latestLocation.search, showLeftDirectoryFlag])

  const directoryContent = (
    <motion.div
      layout
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ overflowY: 'scroll', overflowX: 'hidden', maxHeight: '100%' }}
      className="scroll min-w-[220px] max-w-[220px]"
    >
      {showDirectoryFlag ? (
        <div
          className="my-3 text-center text-xl"
          onClick={() => {
            updateShowDirectoryFlag(!showDirectoryFlag)
          }}
        >
          目录
        </div>
      ) : (
        ''
      )}
      <ul className="ml-2 flex flex-col space-y-1">
        {allChapter.map((item, index) => (
          <li
            className={clsx(
              currentChapter == index ? 'bg-[#474c50] text-white dark:bg-[#4b4b4b]' : '',
              'truncate rounded-md px-4 py-1 hover:bg-[#4b4b4b] hover:text-white dark:hover:bg-[#474c50]'
            )}
            key={index}
            id={`y-item-${index + 1}`}
          >
            <Link search={{ chapter: index + 1 }}> {item} </Link>
          </li>
        ))}
      </ul>
      <div className="h-[10px]" />
    </motion.div>
  )

  return showDirectoryFlag ? (
    <>{directoryContent}</>
  ) : (
    <Drawer
      loading={allChapter.length === 0}
      className="dark:text-[#929493]"
      title={<div className="text-center text-xl">目录</div>}
      onClose={onClose}
      open={open}
      closeIcon={false}
      placement="left"
      width={230}
      styles={{ body: { padding: '10px', overflow: 'hidden' } }}
    >
      {directoryContent}
    </Drawer>
  )
}
