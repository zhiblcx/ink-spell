import { AuthUtils } from '@/shared/utils'
import { PhotoUtils } from '@/shared/utils/PhotoUtils'
import { FormInstance, UploadProps, type UploadFile } from 'antd'
import ImgCrop from 'antd-img-crop'
import { RcFile } from 'antd/es/upload'
interface UploadPhotoProps {
  fileName: UploadFile[]
  setFileName: React.Dispatch<React.SetStateAction<UploadFile[]>>
  form: FormInstance<any>
  name: string
  api?: string
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
      return new Promise(async (resolve, reject) => {
        const image = file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg'
        if (!image) {
          reject()
        }
        if (file.type === 'image/png') {
          resolve((await PhotoUtils.compressPNG(file)) as RcFile)
        } else {
          resolve()
        }
      })
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
