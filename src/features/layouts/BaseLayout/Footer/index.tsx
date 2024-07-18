function Footer() {
  return (
    <ul className="flex space-x-3 absolute bottom-4">
      <li className="cursor-pointer">取消</li>
      <li className="cursor-pointer">添加到书架</li>
      <li className="cursor-pointer">全选</li>
      <li className="text-red-500 cursor-pointer">删除</li>
    </ul>
  )
}

export default Footer
