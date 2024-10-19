// 加载所有的语言包文件
const modules = import.meta.glob('./locales/**/*.json', {
  eager: true
}) as Record<string, { default: never }>

// import.meta.glob:允许使用通配符的模式来导入文件，返回一个对象可以使其按需导入。
// eager 选项：设置为 true 时，模块会在构建时立即导入（应用加载时就预加载），而不是在运行时按需导入。
interface NObject {
  [key: string]: any
}

// Object.entries() 返回一个属性键值对的数组
export const localeTransitions = Object.entries(modules).reduce((prev, current) => {
  const [path, module] = current

  const lang = path.match(/\/locales\/([\w-]+)\//)
  const filename = path.match(/\/([\w-_]+)\.json$/)
  if (filename && lang) {
    prev[lang[1]] = prev[lang[1]] || {}
    prev[lang[1]][filename[1].toUpperCase()] = module.default
  } else {
    console.error(`无法解析文件名称 path:${path}`)
  }
  return prev
}, {} as NObject)
