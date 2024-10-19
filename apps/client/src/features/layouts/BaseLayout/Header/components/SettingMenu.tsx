import ThemeToggle from '@/shared/components/ThemeToggle'
import { LANGUAGE } from '@/shared/constants'
import { LanguageEnums } from '@/shared/enums'
import { useLanguageStore } from '@/shared/store'
import type { DropDownProps, MenuProps } from 'antd'
import { Settings } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export function SettingMenu() {
  const [open, setOpen] = useState(false)
  const { language, setLanguage } = useLanguageStore()
  const { t, i18n } = useTranslation('COMMON')

  useEffect(() => {
    i18n.changeLanguage(language)
  }, [])

  const handleChange = (value: LanguageEnums) => {
    setLanguage(value)
    const changeLanguage = language === LanguageEnums.English ? LanguageEnums.Chinese : LanguageEnums.English
    i18n.changeLanguage(changeLanguage)
  }

  const items: MenuProps['items'] = [
    {
      key: 1,
      label: (
        <div className="flex items-center justify-center">
          <span className="mr-4">外观：</span>
          <ThemeToggle />
        </div>
      )
    },
    {
      key: 2,
      label: (
        <div className="flex items-center justify-center">
          <span className="mr-2">{t('language')}：</span>
          <Select
            defaultValue={
              LANGUAGE[0].value === language
                ? (LANGUAGE[0].label as LanguageEnums)
                : (LANGUAGE[1].label as LanguageEnums)
            }
            style={{ width: 100 }}
            onChange={handleChange}
            options={LANGUAGE}
          />
        </div>
      )
    }
  ]

  const handleOpenChange: DropDownProps['onOpenChange'] = (nextOpen, info) => {
    if (info.source === 'trigger' || nextOpen) {
      setOpen(nextOpen)
    }
  }

  return (
    <Dropdown
      menu={{ items }}
      placement="bottomLeft"
      open={open}
      onOpenChange={handleOpenChange}
    >
      <Settings />
    </Dropdown>
  )
}
