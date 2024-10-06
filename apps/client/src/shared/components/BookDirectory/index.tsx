import { useActionBookStore } from '@/shared/store'
import { useSetUpStore } from '@/shared/store/SetupStore'
import { UrlUtils } from '@/shared/utils/UrlUtils'
import { useRouter } from '@tanstack/react-router'
import clsx from 'clsx'
import { motion } from 'framer-motion'
import { BookMarked, BookText } from 'lucide-react'
import useSmoothScroll from 'react-smooth-scroll-hook'

interface SidebarActiveType {
  bookName: string
  currentChapter: number
  allChapter: Array<string>
  showDirectoryFlag?: boolean
}

export default function BookDirectory({
  bookName,
  currentChapter,
  allChapter = [],
  showDirectoryFlag = true
}: SidebarActiveType) {
  const { updateShowDirectoryFlag, showDirectoryFlag: showLeftDirectoryFlag } = useActionBookStore()
  const router = useRouter()
  const ref = useRef(null)
  const { setup, setSetUp } = useSetUpStore()
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
        scrollTo(`#y-item-${UrlUtils.decodeUrlById(chapter.chapter.toString())}`, -300)
      }, 100)
    }
  }, [router.latestLocation.search, showLeftDirectoryFlag])

  useEffect(() => {
    setSetUp({ ...setup, openDirectory: open })
  }, [open])

  const directoryContent = (
    <div>
      {showDirectoryFlag ? (
        <div
          className="my-3 h-auto min-w-[220px] max-w-[220px] text-center text-xl"
          // onClick={() => {
          //   updateShowDirectoryFlag(!showDirectoryFlag)
          // }}
        >
          <div>{bookName}</div>
          <div className="mt-2 flex justify-center space-x-10">
            <BookText
              size={30}
              color="#1296db"
            />
            <BookMarked size={30} />
          </div>
        </div>
      ) : null}
      <motion.div
        layout
        ref={ref}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{ overflowY: 'scroll', overflowX: 'hidden', maxHeight: '100%' }}
        className="scroll min-w-[220px] max-w-[220px]"
      >
        <ul className="ml-2 flex flex-col space-y-1">
          {allChapter.map((item, index) => (
            <li
              className={clsx(
                currentChapter == index ? 'bg-[#474c50] text-white dark:bg-[#4b4b4b]' : null,
                'truncate rounded-md px-4 py-1 hover:bg-[#4b4b4b] hover:text-white dark:hover:bg-[#474c50]'
              )}
              key={index}
              id={`y-item-${index + 1}`}
            >
              <a
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  router.navigate({
                    to: router.latestLocation.pathname,
                    search: { chapter: UrlUtils.encodeUrlById((index + 1).toString()) },
                    replace: true
                  })
                }}
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
        <div className="h-[10px]" />
      </motion.div>
    </div>
  )

  return showDirectoryFlag ? (
    <>{directoryContent}</>
  ) : (
    <Drawer
      loading={allChapter.length === 0}
      className="dark:text-[#929493]"
      title={<div className="text-center text-xl">{bookName}</div>}
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
