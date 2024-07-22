module.exports = {
  arrowParens: 'always', //(x) => {} 箭头函数参数只有一个时是否要有小括号。avoid：省略括号
  bracketSameLine: false,
  bracketSpacing: true, // 在对象，数组括号与文字之间加空格 "{ foo: bar }"
  embeddedLanguageFormatting: 'auto',
  endOfLine: 'lf', // 结尾是 \n \r \n\r auto
  htmlWhitespaceSensitivity: 'css', // 去除html元素中的多余空格
  jsxSingleQuote: false, // 在jsx中使用单引号代替双引号
  printWidth: 120, // 超过最大行的配置
  proseWrap: 'preserve', // 默认值。因为使用了一些折行敏感型的渲染器（如GitHub comment）而按照markdown文本样式进行折行
  quoteProps: 'as-needed',
  semi: false, // 句尾不添加分号
  singleAttributePerLine: true,
  singleQuote: true, // 使用单引号代替双引号
  tabWidth: 2, // 缩进字节数
  trailingComma: 'none', // 在对象或数组最后一个元素后面是否加逗号（在ES5中加尾逗号）
  useTabs: false, // 缩进不使用 tab 使用空格
  jsxBracketSameLine: false, // 在jsx中把'>' 是否单独放一行
  stylelintIntegration: false,
  usePrettierrc: true, // 是否使用根目录下的 .prettierrc 文件，默认为 true
  rules: { 'no-multiple-empty-lines': ['error', { max: 1 }] }, // 禁止出现多个空格
  plugins: ['prettier-plugin-organize-imports', 'prettier-plugin-tailwindcss']
}
