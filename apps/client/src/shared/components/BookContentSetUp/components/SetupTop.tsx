import { ClickSetupEnum } from '@/shared/components/BookContentSetUp/Enums/ClickSetupEnum'
import { RECOVER } from '@/shared/constants'
import { useSetUpStore } from '@/shared/store/SetupStore'
import { UrlUtils } from '@/shared/utils/UrlUtils'
import { DownOutlined } from '@ant-design/icons'
import { useRouter } from '@tanstack/react-router'
import { AArrowDown, AArrowUp, AlignJustify, ChevronLeft, ChevronRight, Equal } from 'lucide-react'
import UploadBase64Photo from '../../UploadBase64Photo'
import { SetupTitleEnum } from '../Enums/SetupTitleEnum'

interface SetupTopProps {
  currentChapter: string
  allChapterTotal: number

  schedule: string
  sliderDirectory: number
  setSliderDirectory: React.Dispatch<React.SetStateAction<number>>
  clickSetUp: ClickSetupEnum
  setClickSetUp: React.Dispatch<React.SetStateAction<ClickSetupEnum>>
}

export function SetupTop({
  currentChapter,
  allChapterTotal,
  schedule,
  sliderDirectory,
  setSliderDirectory,
  clickSetUp,
  setClickSetUp
}: SetupTopProps) {
  const { setup, setSetUp } = useSetUpStore()
  const router = useRouter()

  let DEFAULT_COLOR = setup.readerBackground?.background as any
  if (setup.readerBackground?.background?.includes('linear-gradient')) {
    // 渐变色
    DEFAULT_COLOR = []
    const regex = /(rgb\(\d+,\d+,\d+\) \d+%)|(rgba\(\d+,\d+,\d+\,\d+(\.\d+)?\) \d+%)/g
    const match = setup.readerBackground?.background.match(regex) || []
    DEFAULT_COLOR = match.map((match: string) => {
      const [color, percent] = match.split(' ')
      return {
        color,
        percent: parseInt(percent)
      }
    })
  }

  useEffect(() => {
    if (sliderDirectory != null) {
      router.navigate({
        to: router.latestLocation.pathname,
        search: { chapter: UrlUtils.encodeUrlById(sliderDirectory.toString()) },
        replace: true
      })
    }
  }, [sliderDirectory])

  return (
    <div className="grow">
      {clickSetUp === ClickSetupEnum.SETUP ? (
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
      ) : clickSetUp === ClickSetupEnum.DEFAULT ? (
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
                  {RECOVER}
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
                  {RECOVER}
                </Button>
              </div>
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}
