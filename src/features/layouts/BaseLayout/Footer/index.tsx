import clsx from 'clsx'
import { Modal } from 'antd'
import { CircleX } from 'lucide-react'
import { useActionBook } from '@/shared/store'

function Footer() {
  const [modal, contextHolder] = Modal.useModal()
  const { cancelFlag, allSelectFlag, updateCancelFlag, updateAllSelectFlag, updateDeleteFlag } = useActionBook()

  const confirm = () => {
    modal.confirm({
      title: '删除书籍',
      icon: <CircleX className="text-red-500 mr-2" />,
      content: '确定要删除选中的书籍吗?',
      okText: '确定',
      cancelText: '取消',
      maskClosable: true,
      onOk: () => {
        updateDeleteFlag(true)
      }
    })
  }

  return (
    <>
      <ul className={clsx(cancelFlag ? 'hidden' : '', 'flex space-x-3 absolute bottom-4')}>
        <li
          className="cursor-pointer"
          onClick={() => {
            updateCancelFlag(!cancelFlag)
          }}
        >
          取消
        </li>

        <li
          className="cursor-pointer"
          onClick={() => {
            console.log('添加书架')
          }}
        >
          添加到书架
        </li>

        <li
          className="cursor-pointer"
          onClick={() => {
            updateAllSelectFlag(allSelectFlag == 1 ? 0 : 1)
          }}
        >
          {allSelectFlag == 1 ? '全不选' : '全选'}
        </li>

        <li
          className="text-red-500 cursor-pointer"
          onClick={confirm}
        >
          删除
        </li>
      </ul>
      {contextHolder}
    </>
  )
}

export default Footer
