import { deleteBookMarkMutation, insertBookMarkMutation } from '@/features/book'
import { Theme } from '@/shared/enums'
import { useActionBookStore, useThemeStore } from '@/shared/store'
import { useSetUpStore } from '@/shared/store/SetupStore'
import { UrlUtils } from '@/shared/utils/UrlUtils'
import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from '@tanstack/react-router'
import {
  AArrowDown,
  AArrowUp,
  AlignJustify,
  BookmarkMinus,
  BookmarkPlus,
  ChevronLeft,
  ChevronRight,
  Equal,
  List,
  LucideProps,
  Settings
} from 'lucide-react'
import ThemeToggle from '../ThemeToggle'

interface IconProps {
  Icon: React.ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>>
}

function Icon_28({ Icon }: IconProps) {
  return <Icon size={28} />
}

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
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const { setup, setSetUp } = useSetUpStore()
  const { theme } = useThemeStore()
  const [clickSetUp, setClickSetUp] = useState(false)
  const [sliderDirectory, setSliderDirectory] = useState(encodeChapter)
  const [schedule, setSchedule] = useState('0.0%')
  const [bookmark, setBookMark] = useState(false)
  const { showSetUpFlag, showDirectoryFlag, updateShowSetUpFlag, updateShowDirectoryFlag } = useActionBookStore()
  const queryClient = useQueryClient()
  const queryClientFunction = () => queryClient.invalidateQueries({ queryKey: ['bookMark'] })
  const { mutate: collectBookMarkMutation } = insertBookMarkMutation(queryClientFunction)
  const { mutate: cancelCollectBookMarkMutation } = deleteBookMarkMutation(queryClientFunction)
  const setupTitle = {
    lightness: '亮度',
    fontSize: '字号',
    lineHeight: '行距',
    setupTheme: '主题',
    directory: '目录',
    darkMode: '暗夜模式',
    lightMode: '日间模式',
    collectBookmark: '添加书签',
    cancelCollectBookmark: '删除书签',
    setup: '设置'
  }

  useEffect(() => {
    setSchedule(((encodeChapter / allChapterTotal) * 100).toFixed(1) + '%')
    setBookMark(bookMark.findIndex((item) => item == encodeChapter) != -1)
  }, [encodeChapter])

  useEffect(() => {
    showSetUpFlag ? setOpen(true) : setOpen(false)
  }, [showSetUpFlag])

  useEffect(() => {
    if (sliderDirectory != null) {
      router.navigate({
        to: router.latestLocation.pathname,
        search: { chapter: UrlUtils.encodeUrlById(sliderDirectory.toString()) },
        replace: true
      })
    }
  }, [sliderDirectory])

  const operateBookMark = () => {
    if (bookmark) {
      // 取消书签
      cancelCollectBookMarkMutation({ bookId, chapter: encodeChapter })
      setBookMark(false)
    } else {
      // 添加书签
      collectBookMarkMutation({ bookId, chapter: encodeChapter })
      setBookMark(true)
    }
  }

  return (
    <Drawer
      placement="bottom"
      closable={false}
      onClose={() => setOpen(false)}
      open={open}
      height={clickSetUp ? 260 : 200}
    >
      <div className="flex h-[100%] flex-col justify-between">
        <div className="grow">
          {clickSetUp ? (
            // 设置
            <div className="flex w-[100%] text-base">
              <ul className="grow space-y-2">
                <li className="flex grow items-center">
                  <p className="mr-4 flex items-center">{setupTitle.lightness}:</p>
                  <Slider
                    max={1}
                    min={0.4}
                    step={0.1}
                    defaultValue={setup.brightness}
                    className="w-[70%]"
                    onChange={(value) => setSetUp({ ...setup, brightness: value })}
                  />
                </li>
                <li className="flex grow items-center">
                  <p className="mr-4">{setupTitle.fontSize}：</p>
                  <div className="flex grow items-center justify-around">
                    <AArrowDown
                      size={34}
                      onClick={() => {
                        if (setup.fontSize > 16) {
                          setSetUp({ ...setup, fontSize: setup.fontSize - 2 })
                        }
                      }}
                    />
                    <p>{setup.fontSize}</p>
                    <AArrowUp
                      size={34}
                      onClick={() => {
                        if (setup.fontSize < 32) {
                          setSetUp({ ...setup, fontSize: setup.fontSize + 2 })
                        }
                      }}
                    />
                  </div>
                </li>
                <li className="flex grow items-center">
                  <p className="mr-4">{setupTitle.lineHeight}：</p>
                  <div className="flex grow items-center justify-around">
                    <Equal
                      size={34}
                      onClick={() => {
                        if (setup.lineHeight > 1.5) {
                          setSetUp({ ...setup, lineHeight: Number(((setup.lineHeight * 10 - 3) / 10).toFixed(1)) })
                        }
                      }}
                    />
                    <p>{setup.lineHeight}</p>
                    <AlignJustify
                      size={34}
                      onClick={() => {
                        if (setup.lineHeight < 6) {
                          setSetUp({ ...setup, lineHeight: Number(((setup.lineHeight * 10 + 3) / 10).toFixed(1)) })
                        }
                      }}
                    />
                  </div>
                </li>
                <li>
                  <p className="mr-4">{setupTitle.setupTheme}：正在开发中，请尽情期待~</p>
                </li>
              </ul>
            </div>
          ) : (
            // 阅读进度
            <div className="flex h-[100%] flex-col items-center justify-center">
              <div>
                <span>{currentChapter}</span>
                <span className="ml-5">{schedule}</span>
              </div>
              <div className="flex w-[100%] items-center justify-center">
                <ChevronLeft
                  size={28}
                  onClick={() => (sliderDirectory === 1 ? '' : setSliderDirectory(sliderDirectory - 1))}
                />
                <Slider
                  min={1}
                  max={allChapterTotal}
                  defaultValue={encodeChapter}
                  className="w-[80%]"
                  value={sliderDirectory}
                  onChange={(value) => {
                    setSliderDirectory(value)
                  }}
                />
                <ChevronRight
                  size={28}
                  onClick={() => (sliderDirectory === allChapterTotal ? '' : setSliderDirectory(sliderDirectory + 1))}
                />
              </div>
            </div>
          )}
        </div>
        <ul className="flex justify-around text-xs">
          <li
            className="flex cursor-pointer flex-col items-center space-y-1"
            onClick={() => {
              updateShowDirectoryFlag(!showDirectoryFlag)
              updateShowSetUpFlag(false)
            }}
          >
            <Icon_28 Icon={List} />
            <p>{setupTitle.directory}</p>
          </li>

          <li className="flex cursor-pointer flex-col items-center space-y-1">
            <ThemeToggle size={28} />
            <p>{theme === Theme.DARK ? setupTitle.darkMode : setupTitle.lightMode}</p>
          </li>

          <li
            className="flex cursor-pointer flex-col items-center space-y-1"
            onClick={operateBookMark}
          >
            <Icon_28 Icon={!bookmark ? BookmarkPlus : BookmarkMinus} />
            <p>{!bookmark ? setupTitle.collectBookmark : setupTitle.cancelCollectBookmark}</p>
          </li>

          <li
            className="flex cursor-pointer flex-col items-center space-y-1"
            onClick={() => setClickSetUp(!clickSetUp)}
          >
            <Icon_28 Icon={Settings} />
            <p>{setupTitle.setup}</p>
          </li>
        </ul>
      </div>
    </Drawer>
  )
}
