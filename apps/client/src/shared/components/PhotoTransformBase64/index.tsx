import { PhotoUtils } from '@/shared/utils'
import { PictureOutlined } from '@ant-design/icons'
import { UploadProps } from 'antd'

export function PhotoTransformBase64() {
  const emoticonStore = useEmoticonStore()
  const props: UploadProps = {
    accept: 'image/png, image/jpeg, image/jpg',
    showUploadList: false,
    maxCount: 1,
    beforeUpload: async (file) => {
      return new Promise(async (_, reject) => {
        const image =
          file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg'
        if (!image) {
          reject()
        }
        const result: string = (await PhotoUtils.fileToBase64(file)) as string
        emoticonStore.setEmoticon(result)
      })
    }
  }

  return (
    <Upload {...props}>
      <PictureOutlined className="text-2xl" />
    </Upload>
  )
}
