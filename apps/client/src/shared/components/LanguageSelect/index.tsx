import { LANGUAGE } from '@/shared/constants'
import { LanguageEnums } from '@/shared/enums'
import { useLanguageStore } from '@/shared/store'

export default function LanguageSelect() {
  const { language, setLanguage } = useLanguageStore()
  const defaultLanguage = LANGUAGE.find((item) => item.value === language)?.label as LanguageEnums
  const handleChange = (value: LanguageEnums) => {
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
