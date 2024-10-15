import { ClickSetupEnum } from '@/shared/components/BookContentSetUp/Enums/ClickSetupEnum'
import { useActionBookStore } from '@/shared/store'

import { SetupBottom } from './components/SetupBottom'
import { SetupTop } from './components/SetupTop'

interface BookContentSetUpType {
  bookId: number
  bookMark: Array<number>
  // 当前章节下标
  encodeChapter: number
  currentChapter: string
  allChapterTotal: number
}

export default function BookContentSetUp({
  bookId,
  bookMark,
  encodeChapter,
  currentChapter,
  allChapterTotal
}: BookContentSetUpType) {
  const [open, setOpen] = useState(false)
  const [clickSetUp, setClickSetUp] = useState(ClickSetupEnum.DEFAULT)
  const [sliderDirectory, setSliderDirectory] = useState(encodeChapter)
  const [schedule, setSchedule] = useState('0.0%')
  const [bookmark, setBookMark] = useState(false)
  const { showSetUpFlag } = useActionBookStore()

  useEffect(() => {
    setSchedule(((encodeChapter / allChapterTotal) * 100).toFixed(1) + '%')
    setBookMark(bookMark.findIndex((item) => item == encodeChapter) != -1)
    setSliderDirectory(encodeChapter)
  }, [encodeChapter])

  useEffect(() => {
    showSetUpFlag ? setOpen(true) : setOpen(false)
  }, [showSetUpFlag])

  return (
    <Drawer
      placement="bottom"
      closable={false}
      onClose={() => setOpen(false)}
      open={open}
      height={clickSetUp === ClickSetupEnum.SETUP ? 270 : 200}
    >
      <div className="flex h-[100%] flex-col justify-between">
        <SetupTop
          currentChapter={currentChapter}
          schedule={schedule}
          sliderDirectory={sliderDirectory}
          setSliderDirectory={setSliderDirectory}
          allChapterTotal={allChapterTotal}
          clickSetUp={clickSetUp}
          setClickSetUp={setClickSetUp}
        />

        <SetupBottom
          bookId={bookId}
          encodeChapter={encodeChapter}
          clickSetUp={clickSetUp}
          setClickSetUp={setClickSetUp}
          bookmark={bookmark}
          setBookMark={setBookMark}
        />
      </div>
    </Drawer>
  )
}
