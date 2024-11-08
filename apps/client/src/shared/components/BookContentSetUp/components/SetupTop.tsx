import { useSetUpStore } from '@/shared/store/SetupStore'
import { SetUp } from '@/shared/types'
import { UrlUtils } from '@/shared/utils/UrlUtils'
import { DownOutlined } from '@ant-design/icons'
import { AArrowDown, AArrowUp, AlignJustify, ChevronLeft, ChevronRight, Equal } from 'lucide-react'
import UploadBase64Photo from '../../UploadBase64Photo'
import { ClickSetupEnum } from '../enums/ClickSetupEnum'
import Adjuster from './Adjuster'

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
  const { t } = useTranslation(['COMMON'])
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

  const adjustSetting = (
    propName: keyof SetUp,
    min: number,
    max: number,
    step: number,
    action: 'increase' | 'decrement',
    dot = false
  ) => {
    let newValue = setup[propName] as number | undefined
    switch (action) {
      case 'increase': {
        newValue = newValue === undefined ? min + step : Math.min(newValue + step, max)
        break
      }
      case 'decrement': {
        newValue = newValue === undefined ? min : Math.max(newValue - step, min)
        break
      }
    }
    setSetUp({ ...setup, [propName]: dot ? Math.ceil(newValue * 10) / 10 : newValue })
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
              <p className="mr-4 flex items-center">{t('COMMON:brightness')}:</p>
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
              <Adjuster
                label={t('COMMON:font_size')}
                value={setup.fontSize}
                IconDown={AArrowDown}
                IconUp={AArrowUp}
                onDecrement={() => adjustSetting('fontSize', 16, 32, 2, 'decrement')}
                onIncrement={() => adjustSetting('fontSize', 16, 32, 2, 'increase')}
              />
            </li>
            <li className="flex grow items-center">
              <Adjuster
                label={t('COMMON:line_height')}
                value={setup.lineHeight || 1.5}
                IconDown={Equal}
                IconUp={AlignJustify}
                onDecrement={() => adjustSetting('lineHeight', 1.5, 6, 0.3, 'decrement', true)}
                onIncrement={() => adjustSetting('lineHeight', 1.5, 6, 0.3, 'increase', true)}
              />
            </li>
            <li className="flex grow items-center">
              <p className="mr-4">{t('COMMON:theme')}：</p>
              <div className="flex grow items-center justify-around">
                <Button onClick={() => setClickSetUp(ClickSetupEnum.BACKGROUND)}>
                  {t('COMMON:customize')}
                </Button>
                <Button onClick={() => setSetUp({ ...setup, readerBackground: undefined })}>
                  {t('COMMON:recover')}
                </Button>
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
              onClick={() =>
                sliderDirectory === allChapterTotal ? '' : setSliderDirectory(sliderDirectory + 1)
              }
            />
          </div>
        </div>
      ) : (
        // 背景设置
        <div className="flex w-[100%] text-base">
          <ul className="grow space-y-4">
            <li className="flex grow items-center">
              <p>{t('COMMON:background')}：</p>
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
                  {t('COMMON:recover')}
                </Button>
              </div>
            </li>
            <li className="flex grow items-center">
              <p>{t('COMMON:font_type')}：</p>
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
                  {t('COMMON:recover')}
                </Button>
              </div>
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}
