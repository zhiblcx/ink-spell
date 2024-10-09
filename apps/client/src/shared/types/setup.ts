import { DirectoryMode } from '../enums'

export type SetUp = {
  fontSize: number
  brightness: number
  openDirectory: boolean
  lineHeight: number
  directoryMode: DirectoryMode
  readerBackground: { background: string | undefined; typeFont: string | undefined } | undefined
}
