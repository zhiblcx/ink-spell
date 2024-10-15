import { request } from '@/shared/API'
import { IMPORT_BOOK } from '@/shared/constants'
import { useActionBookStore } from '@/shared/store'
import { AuthUtils, Md5Utils } from '@/shared/utils'
import { message, type UploadFile, type UploadProps } from 'antd'
import { FileUp } from 'lucide-react'

interface FileWithMD5 extends File {
  md5?: string
}
interface UploadFileMD5 extends UploadFile {
  md5?: string
}

interface ImportBookType {
  bookShelfId: string
}

export function ImportBook({ bookShelfId }: ImportBookType) {
  const { uploadFileFlag, updateUploadFileFlag } = useActionBookStore()
  const getExtraData: UploadProps['data'] = (file: UploadFileMD5) => {
    return {
      md5: file.md5,
      bookShelfId
    }
  }

  const props: UploadProps = {
    accept: 'text/plain',
    action: '/api/book/upload/file',
    data: getExtraData,
    headers: {
      authorization: `Bearer ${AuthUtils.getToken()}`
    },
    showUploadList: false,
    method: 'post',
    maxCount: 5,
    name: 'file',
    beforeUpload: async (file: FileWithMD5) => {
      const isTxt = file.type === 'text/plain'
      if (!isTxt) {
        message.error(`仅支持上传 txt 文件`)
      }

      file.md5 = await Md5Utils.getFileMD5(file)
      const result = await request.get(`/book/md5?md5=${file.md5}&file_name=${file.name}`)

      if (result.data.data.md5) {
        if (result.data.data.path === '') {
          message.error('请勿重复上传')
        } else {
          message.success('上传成功')
          if (!uploadFileFlag) {
            updateUploadFileFlag(true)
          }
        }
        return false
      }
      return isTxt || Upload.LIST_IGNORE
    },
    onChange: (info) => {
      if (info.file.status === 'done') {
        message.success('上传成功')
        if (!uploadFileFlag) {
          updateUploadFileFlag(true)
        }
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`)
      }
    }
  }

  return (
    <Upload
      {...props}
      multiple
    >
      {window.innerWidth > 400 ? (
        <Button type="primary">{IMPORT_BOOK}</Button>
      ) : (
        <Button
          type="primary"
          shape="circle"
        >
          <FileUp />
        </Button>
      )}
    </Upload>
  )
}