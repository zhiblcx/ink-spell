import clsx from 'clsx'
import { Modal } from 'antd'
import { CircleX } from 'lucide-react'
import { useActionBook, useMenuStore } from '@/shared/store'
import { Menu, AllSelectFlag } from '@/shared/enums'

function Footer() {
  const [modal, contextHolder] = Modal.useModal()
  const { menu } = useMenuStore()
  const {
    cancelFlag,
    allSelectFlag,
    showShelfFlag,
    updateCancelFlag,
    updateAllSelectFlag,
    updateDeleteFlag,
    updateDeleteShelfFlag
  } = useActionBook()

  const handlerDeleteBook = () => {
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

  const handlerDeleteBookShelf = () => {
    modal.confirm({
      title: '删除该书架',
      icon: <CircleX className="text-red-500 mr-2" />,
      content: '确定要删除该书架吗？?',
      okText: '确定',
      cancelText: '取消',
      maskClosable: true,
      onOk: () => {
        updateDeleteShelfFlag(true)
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
            updateAllSelectFlag(
              allSelectFlag == AllSelectFlag.NOT_ALL_SELECT_FLAG
                ? AllSelectFlag.ALL_SELECT_FLAG
                : AllSelectFlag.NOT_ALL_SELECT_FLAG
            )
          }}
        >
          {allSelectFlag == AllSelectFlag.NOT_ALL_SELECT_FLAG ? '全不选' : '全选'}
        </li>

        <li
          className="text-red-500 cursor-pointer"
          onClick={handlerDeleteBook}
        >
          删除
        </li>
        {showShelfFlag ? (
          <li
            className="text-red-500 cursor-pointer"
            onClick={handlerDeleteBookShelf}
          >
            删除该书架
          </li>
        ) : (
          ''
        )}
      </ul>

      {contextHolder}
    </>
  )
}

export default Footer
