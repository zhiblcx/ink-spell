// 瀑布式布局
export function cardLocation(
  parent: React.MutableRefObject<null>,
  grantParent: React.MutableRefObject<null>,
  subtract = 300
) {
  if (parent.current && grantParent.current && (parent.current as HTMLElement).children.length > 0) {
    const child = (parent.current as HTMLElement).children
    const num = Math.floor((window.innerWidth - subtract) / (child[0] as HTMLElement).offsetWidth)
    const currentGrantParent = grantParent.current as HTMLElement
    currentGrantParent.style.width = num * (child[0] as HTMLElement).offsetWidth + 'px'
    const boxHeightArr: number[] = []
    for (let i = 0; i < child.length; i++) {
      const currentChild = child[i] as HTMLElement
      if (i < num) {
        // 第一行
        currentChild.style.position = 'absolute'
        currentChild.style.top = 0 + 'px'
        currentChild.style.left = i * (child[0] as HTMLElement).offsetWidth + 'px'
        boxHeightArr.push((child[i] as HTMLElement).offsetHeight)
      } else {
        // 其他行
        // 找到最短的那一行
        const minHeight = Math.min(...boxHeightArr)
        const minIndex = boxHeightArr.indexOf(minHeight)

        // 摆放卡片
        currentChild.style.position = 'absolute'
        currentChild.style.top = minHeight + 'px'
        currentChild.style.left = (child[minIndex] as HTMLElement).offsetLeft + 'px'
        boxHeightArr[minIndex] = minHeight + currentChild.offsetHeight
      }
    }
    return true
  }
  return false
}
