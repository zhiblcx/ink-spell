import { LANGUAGE } from '@/shared/constants'
import { LanguageEnum } from '@/shared/enums'

export function LanguageSelect() {
  const { language, setLanguage } = useLanguageStore()
  const defaultLanguage = LANGUAGE.find((item) => item.value === language)?.label as LanguageEnum
  const handleChange = (value: LanguageEnum) => {
    setLanguage(value)
  }

  return (
    <Select
      defaultValue={defaultLanguage}
      style={{ width: 100 }}
      onChange={handleChange}
      options={LANGUAGE}
    />
  )
}
