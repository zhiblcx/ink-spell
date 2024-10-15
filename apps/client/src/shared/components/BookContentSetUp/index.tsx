import { deleteBookMarkMutation, insertBookMarkMutation } from '@/features/book'
import { QueryKeys, Theme } from '@/shared/enums'
import { ClickSetupEnum } from '@/shared/enums/ClickSetupEnum'
import { useActionBookStore, useThemeStore } from '@/shared/store'
import { useSetUpStore } from '@/shared/store/SetupStore'
import { UrlUtils } from '@/shared/utils/UrlUtils'
import { DownOutlined } from '@ant-design/icons'
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
import UploadBase64Photo from '../UploadBase64Photo'
import { SetupTitleEnum } from './SetupTitleEnum'

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
  const [clickSetUp, setClickSetUp] = useState(ClickSetupEnum.DEFAULT)
  const [sliderDirectory, setSliderDirectory] = useState(encodeChapter)
  const [schedule, setSchedule] = useState('0.0%')
  const [bookmark, setBookMark] = useState(false)
  const { showSetUpFlag, showDirectoryFlag, updateShowSetUpFlag, updateShowDirectoryFlag } = useActionBookStore()
  const queryClient = useQueryClient()
  const queryClientFunction = () => queryClient.invalidateQueries({ queryKey: [QueryKeys.BOOK_MARK_KEY] })
  const { mutate: collectBookMarkMutation } = insertBookMarkMutation(queryClientFunction)
  const { mutate: cancelCollectBookMarkMutation } = deleteBookMarkMutation(queryClientFunction)

  useEffect(() => {
    setSchedule(((encodeChapter / allChapterTotal) * 100).toFixed(1) + '%')
    setBookMark(bookMark.findIndex((item) => item == encodeChapter) != -1)
    setSliderDirectory(encodeChapter)
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

  let DEFAULT_COLOR = null
  DEFAULT_COLOR = setup.readerBackground?.background

  if (setup.readerBackground?.background?.includes('linear-gradient')) {
    // 渐变色
    DEFAULT_COLOR = []
    const regex = /(rgb\(\d+,\d+,\d+\) \d+%)|(rgba\(\d+,\d+,\d+\,\d+(\.\d+)?\) \d+%)/g
    const match = setup.readerBackground?.background.match(regex) || []
    for (let i = 0; i < match?.length; i++) {
      DEFAULT_COLOR.push({
        color: match && match[i].split(' ')[0],
        percent: parseInt(match && match[i].split(' ')[1])
      })
    }
  }

  return (
    <Drawer
      placement="bottom"
      closable={false}
      onClose={() => setOpen(false)}
      open={open}
      height={clickSetUp === ClickSetupEnum.DEFAULT ? 270 : 200}
    >
      <div className="flex h-[100%] flex-col justify-between">
        <div className="grow">
          {clickSetUp === ClickSetupEnum.DEFAULT ? (
            // 设置
            <div className="flex w-[100%] text-base">
              <ul className="grow space-y-2">
                <li className="flex grow items-center">
                  <p className="mr-4 flex items-center">{SetupTitleEnum.LIGHTNESS}:</p>
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
                  <p className="mr-4">{SetupTitleEnum.FONT_SIZE}：</p>
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
                  <p className="mr-4">{SetupTitleEnum.LINE_HEIGHT}：</p>
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
                <li className="flex grow items-center">
                  <p className="mr-4">{SetupTitleEnum.SETUP_THEME}：</p>
                  <div className="flex grow items-center justify-around">
                    <Button onClick={() => setClickSetUp(ClickSetupEnum.BACKGROUND)}>自定义</Button>
                    <Button onClick={() => setSetUp({ ...setup, readerBackground: undefined })}>恢复</Button>
                  </div>
                </li>
              </ul>
            </div>
          ) : clickSetUp === ClickSetupEnum.SETUP ? (
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
          ) : (
            // 背景设置
            <div className="flex w-[100%] text-base">
              <ul className="grow space-y-4">
                <li className="flex grow items-center">
                  <p className="mr-4">{SetupTitleEnum.BACKGROUND}：</p>
                  <div className="flex grow items-center justify-around">
                    <UploadBase64Photo />
                    <ColorPicker
                      defaultValue={DEFAULT_COLOR ?? null}
                      allowClear
                      placement="top"
                      showText={() => <DownOutlined />}
                      mode={['single', 'gradient']}
                      onChangeComplete={(color) =>
                        setSetUp({
                          ...setup,
                          readerBackground: {
                            background: color.toCssString(),
                            typeFont: setup.readerBackground?.typeFont
                          }
                        })
                      }
                    />
                    <Button
                      onClick={() =>
                        setSetUp({
                          ...setup,
                          readerBackground: {
                            background: undefined,
                            typeFont: setup.readerBackground?.typeFont
                          }
                        })
                      }
                    >
                      恢复
                    </Button>
                  </div>
                </li>
                <li className="flex grow items-center">
                  <p className="mr-4">{SetupTitleEnum.TYPE_FONT}：</p>
                  <div className="flex grow items-center justify-around">
                    <ColorPicker
                      defaultValue={setup.readerBackground?.typeFont ?? null}
                      allowClear
                      placement="top"
                      showText={() => <DownOutlined />}
                      mode={['single']}
                      onChangeComplete={(color) =>
                        setSetUp({
                          ...setup,
                          readerBackground: {
                            typeFont: color.toCssString(),
                            background: setup.readerBackground?.background
                          }
                        })
                      }
                    />
                    <Button
                      onClick={() =>
                        setSetUp({
                          ...setup,
                          readerBackground: {
                            typeFont: undefined,
                            background: setup.readerBackground?.background
                          }
                        })
                      }
                    >
                      恢复
                    </Button>
                  </div>
                </li>
              </ul>
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
            <p>{SetupTitleEnum.CATALOG}</p>
          </li>

          <li className="flex cursor-pointer flex-col items-center space-y-1">
            <ThemeToggle size={28} />
            <p>{theme === Theme.DARK ? SetupTitleEnum.DARK_MODE : SetupTitleEnum.LIGHT_MODE}</p>
          </li>

          <li
            className="flex cursor-pointer flex-col items-center space-y-1"
            onClick={operateBookMark}
          >
            <Icon_28 Icon={!bookmark ? BookmarkPlus : BookmarkMinus} />
            <p>{!bookmark ? SetupTitleEnum.COLLECT_BOOKMARK : SetupTitleEnum.CANCEL_COLLECT_BOOKMARK}</p>
          </li>

          <li
            className="flex cursor-pointer flex-col items-center space-y-1"
            onClick={() =>
              clickSetUp === ClickSetupEnum.DEFAULT
                ? setClickSetUp(ClickSetupEnum.SETUP)
                : setClickSetUp(ClickSetupEnum.DEFAULT)
            }
          >
            <Icon_28 Icon={Settings} />
            <p>{SetupTitleEnum.SETUP}</p>
          </li>
        </ul>
      </div>
    </Drawer>
  )
}
