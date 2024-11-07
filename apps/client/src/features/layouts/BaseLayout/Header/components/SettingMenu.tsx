import type { DropDownProps, MenuProps } from 'antd'
import { Settings } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export function SettingMenu() {
  const [open, setOpen] = useState(false)
  const { t } = useTranslation('COMMON')

  const items: MenuProps['items'] = [
    {
      key: 1,
      label: (
        <div className="flex w-full items-center justify-between">
          <span>{t('appearance')}：</span>
          <span className="w-[100px]">
            <ThemeToggle />
          </span>
        </div>
      )
    },
    {
      key: 2,
      label: (
        <div className="flex items-center justify-center">
          <span>{t('language')}：</span>
          <LanguageSelect />
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
