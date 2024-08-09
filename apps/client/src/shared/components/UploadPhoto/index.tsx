import { AuthUtils } from '@/shared/utils'
import { FormInstance, UploadProps, type UploadFile } from 'antd'
import ImgCrop from 'antd-img-crop'

interface UploadPhotoProps {
  fileName: UploadFile[]
  form: FormInstance<any>
  name: string
  api?: string
  setFileName: React.Dispatch<React.SetStateAction<UploadFile[]>>
}

export default function UploadPhoto({
  fileName,
  setFileName,
  form,
  name,
  api = '/api/book/upload/cover'
}: UploadPhotoProps) {
  const props: UploadProps = {
    accept: 'image/png, image/jpeg, image/jpg',
    action: api,
    headers: {
      authorization: `Bearer ${AuthUtils.getToken()}`
    },
    listType: 'picture-card',
    method: 'post',
    name: 'file',
    fileList: fileName,
    maxCount: 1,
    beforeUpload: async (file) => {
      const image = file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg'
      return image || Upload.LIST_IGNORE
    },

    onChange: (info) => {
      setFileName(info.fileList)
      if (info.file.response?.data?.filePath !== undefined) {
        form.setFieldValue(name, info.file.response.data.filePath)
      }
    }
  }

  return (
    <ImgCrop rotationSlider>
      <Upload {...props}>{fileName.length < 1 && '+ Upload'}</Upload>
    </ImgCrop>
  )
}
