import * as dotenv from 'dotenv'

export function loadEnv(mode: string) {
  const ret: { [key: string]: string } = {}
  // 在使用之前我们先指定加载哪个环境变量
  dotenv.config({
    path: `.env.${mode}`
  })
  dotenv.config({
    path: `.env` // .env
  })

  Object.keys(process.env).forEach((envName) => {
    const realName = process.env[envName]?.replace(/\\n/g, '\n')
    ret[envName] = realName as string
    // 向 process.env 上扩展我们定义的 VITE 环境变量
    process.env[envName] = realName
  })
  return ret
}
