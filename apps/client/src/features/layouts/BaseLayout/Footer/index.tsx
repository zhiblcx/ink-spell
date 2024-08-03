import { AllSelectBookFlag, Menu } from '@/shared/enums'
import { useActionBookStore, useMenuStore } from '@/shared/store'
import clsx from 'clsx'
import { CircleX } from 'lucide-react'

function Footer() {
  const [modal, contextHolder] = Modal.useModal()
  const { menu } = useMenuStore()
  const {
    cancelFlag,
    allSelectBookFlag,
    showShelfFlag,
    updateCancelFlag,
    updateAllSelectFlag,
    updateDeleteFlag,
    updateDeleteShelfFlag
  } = useActionBookStore()

  const handlerDeleteBook = () => {
    modal.confirm({
      title: '删除书籍',
      icon: <CircleX className="mr-2 text-red-500" />,
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
      icon: <CircleX className="mr-2 text-red-500" />,
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
          'absolute bottom-4 flex space-x-3',
          menu === Menu.EXTEND ? 'min-[375px]:flex' : 'min-[375px]:hidden',
          cancelFlag ? 'md:hidden' : 'md:flex'
        )}
      >
        <li
          className="cursor-pointer min-[375px]:hidden md:block"
          onClick={() => {
            updateCancelFlag(!cancelFlag)
          }}
        >
          取消
        </li>

        <li
          className="min-[375px]:auto cursor-pointer md:hidden"
          onClick={() => {
            updateCancelFlag(!cancelFlag)
          }}
        >
          {cancelFlag ? '展示' : '隐藏'}
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
              allSelectBookFlag == AllSelectBookFlag.NOT_ALL_SELECT_FLAG
                ? AllSelectBookFlag.ALL_SELECT_FLAG
                : AllSelectBookFlag.NOT_ALL_SELECT_FLAG
            )
          }}
        >
          {allSelectBookFlag == AllSelectBookFlag.NOT_ALL_SELECT_FLAG ? '全不选' : '全选'}
        </li>

        <li
          className="cursor-pointer text-red-500"
          onClick={handlerDeleteBook}
        >
          删除
        </li>
        {showShelfFlag ? (
          <li
            className="cursor-pointer text-red-500"
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
