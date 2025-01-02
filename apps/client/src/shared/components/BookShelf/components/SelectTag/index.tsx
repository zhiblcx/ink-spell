import { getAllTagQuery } from '@/features/tag'
import { useLanguageStore } from '@/shared/store'
import { TagType as LabelType, TagType } from '@/shared/types'
import { DownOutlined } from '@ant-design/icons'
import { FormInstance, type SelectProps } from 'antd'

interface SelectTagProps {
  form: FormInstance<any>
  tags?: Array<TagType>
}

export default function SelectTag({ form, tags }: SelectTagProps) {
  const MAX_COUNT = 3
  const languageStore = useLanguageStore()
  const { data: allTagQuery } = getAllTagQuery()

  const currentTags = tags?.map((tag: TagType) => tag.id)
  const [value, setValue] = useState<number[]>(currentTags ?? [])

  useEffect(() => {
    setValue(currentTags ?? [])
    form.setFieldValue('tags', currentTags)
  }, [tags])
  const suffix = (
    <>
      <span>
        {value.length} / {MAX_COUNT}
      </span>
      <DownOutlined />
    </>
  )

  const options: SelectProps['options'] =
    allTagQuery?.data?.map((tag: LabelType) => ({
      label: languageStore.language === LanguageEnum.Chinese ? tag.nameChinese : tag.nameEnglish,
      value: tag.id
    })) ?? []

  const handlerBlur = () => form.setFieldValue('tags', value)

  return (
    <Select
      maxCount={MAX_COUNT}
      value={value}
      onChange={setValue}
      onBlur={handlerBlur}
      suffixIcon={suffix}
      mode="multiple"
      filterOption={(input, option) =>
        (option?.label as string).toLowerCase().includes(input.toLowerCase())
      }
      style={{ width: '100%' }}
      options={options}
    />
  )
}
