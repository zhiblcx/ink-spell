import clsx from 'clsx'
import { useActionBook } from '@/shared/store'

function Footer() {
  const { cancelFlag, allSelectFlag, updateCancelFlag, updateAllSelectFlag } = useActionBook()
  return (
    <ul className={clsx(cancelFlag ? 'hidden' : '', 'flex space-x-3 absolute bottom-4')}>
      <li
        className="cursor-pointer"
        onClick={() => {
          updateCancelFlag(!cancelFlag)
        }}
      >
        取消
      </li>
      <li className="cursor-pointer">添加到书架</li>
      <li
        className="cursor-pointer"
        onClick={() => {
          updateAllSelectFlag(allSelectFlag == 1 ? 0 : 1)
        }}
      >
        {allSelectFlag == 1 ? '全不选' : '全选'}
      </li>
      <li className="text-red-500 cursor-pointer">删除</li>
    </ul>
  )
}

export default Footer
