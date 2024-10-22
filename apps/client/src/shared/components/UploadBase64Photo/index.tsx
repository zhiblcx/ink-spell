import { useSetUpStore } from '@/shared/store/SetupStore'
import { UploadOutlined } from '@ant-design/icons'
import { message, UploadProps } from 'antd'
import ImgCrop from 'antd-img-crop'
import { useTranslation } from 'react-i18next'

export default function UploadBase64Photo() {
  const { t } = useTranslation(['COMMON', 'PROMPT', 'VALIDATION'])
  const { setup, setSetUp } = useSetUpStore()
  const props: UploadProps = {
    maxCount: 1,
    fileList: [],
    beforeUpload: async (file) => {
      const image = file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg'
      if (!image) {
        message.error(t('PROMPT:file_type_supported', { fileType: 'png、jpg、jpeg' }))
      } else {
        const reader = new FileReader()

        reader.onloadend = () => {
          const base64String = reader.result
          message.success(t('PROMPT:upload_successful'))
          setSetUp({
            ...setup,
            readerBackground: { background: base64String as string, typeFont: setup.readerBackground?.typeFont }
          })
        }

        reader.readAsDataURL(file)
      }

      return false
    }
  }

  return (
    <ImgCrop rotationSlider>
      <Upload {...props}>
        <Button icon={<UploadOutlined />}>{t('COMMON:upload')}</Button>
      </Upload>
    </ImgCrop>
  )
}
