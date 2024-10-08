import { BookUtils } from '@/shared/utils'
import { UploadOutlined } from '@ant-design/icons'
import { message, UploadProps } from 'antd'
import ImgCrop from 'antd-img-crop'

export default function UploadBase64Photo() {
  const props: UploadProps = {
    maxCount: 1,
    fileList: [],
    beforeUpload: async (file) => {
      const image = file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg'
      if (!image) {
        message.error('只支持png、jpg、jpeg格式的图片')
      } else {
        const reader = new FileReader()

        reader.onloadend = () => {
          const base64String = reader.result
          message.success('上传成功，请重新刷新一下吧~')
          BookUtils.setReaderBackground(base64String as string)
        }

        reader.readAsDataURL(file)
      }

      return false
    }
  }

  return (
    <ImgCrop rotationSlider>
      <Upload {...props}>
        <Button icon={<UploadOutlined />}>上传背景图片</Button>
      </Upload>
    </ImgCrop>
  )
}
