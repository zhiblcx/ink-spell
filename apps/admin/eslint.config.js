import globals from 'globals'
import pluginJs from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import standard from 'eslint-config-standard'

export default [
  // 指定文件匹配模式
  {
    files: ['**/*.{js,mjs,cjs,ts,vue}']
  },
  // 指定全局变量和环境
  {
    languageOptions: {
      globals: globals.browser,
      ecmaVersion: 12, // 使用最新的 ECMAScript 语法
      sourceType: 'module' // 代码是 ECMAScript 模块
    }
  },
  // 使用的扩展配置
  pluginJs.configs.recommended,
  pluginVue.configs['flat/essential'],
  standard,
  // 自定义规则
  {
    rules: {
      indent: ['error', 2], // 缩进使用 2 个空格
      'linebreak-style': ['error', 'unix'], // 使用 Unix 风格的换行符
      quotes: ['error', 'single'], // 使用单引号
      semi: ['error', 'never'] // 语句末尾不加分号
    }
  }
]
