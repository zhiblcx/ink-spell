import { getAnnouncementQuery } from '@/features/system/query'
import { SystemType } from '@/shared/types/SystemType'
import { TransformTimeUtils } from '@ink-spell/utils'
import { TableProps } from 'antd'
import { PaginationProps } from 'antd/lib'
import { Dispatch, SetStateAction } from 'react'

interface AnnouncementModalProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

export interface tableParamsType {
  pagination: {
    page: number
    limit: number
  }
}

export function AnnouncementModal({ open, setOpen }: AnnouncementModalProps) {
  const { t } = useTranslation(['COMMON'])

  const [tableParams] = useState<tableParamsType>({
    pagination: {
      page: PaginationParamsEnum.PAGE,
      limit: PaginationParamsEnum.LIMIT
    }
  })

  const columns: TableProps<SystemType>['columns'] = [
    {
      title: t('COMMON:upload_timer'),
      dataIndex: 'create_timer',
      key: 'create_timer'
    },
    {
      title: t('COMMON:announcement'),
      dataIndex: 'text',
      key: 'text'
    }
  ]

  const { data: announcementData, isLoading } = getAnnouncementQuery(
    tableParams.pagination.page,
    tableParams.pagination.limit
  )

  const data = announcementData?.data?.items?.map((announcement: SystemType) => ({
    create_timer: TransformTimeUtils.formatDateYMDHMS(new Date(announcement.createTimer)),
    text: announcement.text
  }))

  const onChange: PaginationProps['onChange'] = (page) => (tableParams.pagination.page = page)

  const handleOk = () => {
    setOpen(false)
  }

  const handleCancel = () => {
    setOpen(false)
  }
  return (
    <Modal
      title={t('COMMON:announcement')}
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
    >
      <Table<SystemType>
        columns={columns}
        dataSource={data}
        loading={isLoading}
        pagination={{
          onChange: onChange,
          defaultCurrent: tableParams.pagination.page,
          position: ['none', 'bottomCenter'],
          hideOnSinglePage: true,
          showQuickJumper: true,
          total: announcementData?.data?.totalPages * tableParams.pagination.limit,
          defaultPageSize: tableParams.pagination.limit
        }}
      />
    </Modal>
  )
}
