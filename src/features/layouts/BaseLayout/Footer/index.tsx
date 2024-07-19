import clsx from 'clsx'
import { Modal } from 'antd'
import { CircleX } from 'lucide-react'
import { useActionBook, useMenuStore } from '@/shared/store'
import { Menu } from '@/shared/enums'

function Footer() {
  const [modal, contextHolder] = Modal.useModal()
  const { menu } = useMenuStore()
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
      <ul
        className={clsx(
          'flex space-x-3 absolute bottom-4',
          menu === Menu.EXTEND ? 'min-[375px]:flex' : 'min-[375px]:hidden',
          cancelFlag ? 'md:hidden' : 'md:flex'
        )}
      >
        <li
          className="cursor-pointer md:block min-[375px]:hidden"
          onClick={() => {
            updateCancelFlag(!cancelFlag)
          }}
        >
          取消
        </li>

        <li
          className="cursor-pointer md:hidden min-[375px]:auto"
          onClick={() => {
            updateCancelFlag(!cancelFlag)
          }}
        >
          展示
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
        <li className="text-red-500 cursor-pointer">删除该书架</li>
      </ul>

      {contextHolder}
    </>
  )
}

export default Footer
